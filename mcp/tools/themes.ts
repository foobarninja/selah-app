import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "../lib/db.js";

const queryThemesSchema = {
  category: z.string().optional().describe('Filter by theme category (e.g. "virtue", "emotion", "doctrine").'),
  parentThemeId: z.string().optional(),
  sourceTier: z.string().optional(),
  minPassageCount: z.number().int().min(0).optional().describe("Require this many passage_themes rows."),
  missingField: z.enum(["definition", "modernFraming", "relatedThemes"]).optional().describe("Audit filter: return themes where this field is NULL or empty."),
  bookTraceMin: z
    .object({ bookId: z.string(), count: z.number().int().min(1) })
    .optional()
    .describe("Theme must have ≥count passage_themes rows in the given book."),
  includeTrace: z.boolean().default(false).describe("Include per-book passage_themes counts in output."),
  limit: z.number().int().min(1).max(200).default(50),
};

const getThemeSchema = {
  id: z.string(),
  includeTrace: z.boolean().default(true),
};

export function registerThemeTools(server: McpServer): void {
  server.registerTool(
    "query_themes",
    {
      description: "Filter-based theme list. Audit gaps (missingField, minPassageCount) and research browsing share this tool.",
      inputSchema: queryThemesSchema,
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async (args) => {
      const where: string[] = [];
      const params: unknown[] = [];
      if (args.category) { where.push("t.category = ?"); params.push(args.category); }
      if (args.parentThemeId) { where.push("t.parent_theme_id = ?"); params.push(args.parentThemeId); }
      if (args.sourceTier) { where.push("t.source_tier = ?"); params.push(args.sourceTier); }
      if (args.missingField) {
        const col = args.missingField === "modernFraming" ? "modern_framing"
          : args.missingField === "relatedThemes" ? "related_themes"
          : "definition";
        where.push(`(t.${col} IS NULL OR TRIM(t.${col}) = '')`);
      }
      if (args.bookTraceMin) {
        where.push(`(SELECT COUNT(*) FROM passage_themes pt
                     WHERE pt.theme_id = t.id AND pt.book_id = ?) >= ?`);
        params.push(args.bookTraceMin.bookId, args.bookTraceMin.count);
      }

      const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
      const havingClause = args.minPassageCount !== undefined ? `HAVING passageCount >= ?` : "";
      const sql = `
        SELECT t.id, t.name, t.category, t.parent_theme_id, t.source_tier,
               COALESCE(t.definition, '') AS definition,
               COALESCE(t.modern_framing, '') AS modern_framing,
               COALESCE(t.related_themes, '') AS related_themes,
               (SELECT COUNT(*) FROM passage_themes pt WHERE pt.theme_id = t.id) AS passageCount
        FROM themes t
        ${whereClause}
        GROUP BY t.id
        ${havingClause}
        ORDER BY passageCount DESC, t.name
        LIMIT ?
      `;
      if (args.minPassageCount !== undefined) params.push(args.minPassageCount);
      params.push(args.limit);

      const rows = db.prepare(sql).all(...params) as Array<{
        id: string; name: string; category: string | null; parent_theme_id: string | null;
        source_tier: string; definition: string; modern_framing: string; related_themes: string;
        passageCount: number;
      }>;

      const results = rows.map((r) => {
        const base: Record<string, unknown> = {
          id: r.id, name: r.name, category: r.category,
          parentThemeId: r.parent_theme_id, sourceTier: r.source_tier,
          passageCount: r.passageCount,
          definition: r.definition || null,
          modernFraming: r.modern_framing || null,
          relatedThemes: r.related_themes || null,
        };
        if (args.includeTrace) {
          const trace = db.prepare(`
            SELECT book_id, COUNT(*) AS count FROM passage_themes
            WHERE theme_id = ? GROUP BY book_id ORDER BY count DESC
          `).all(r.id) as Array<{ book_id: string; count: number }>;
          base.trace = trace.map((t) => ({ bookId: t.book_id, count: t.count }));
        }
        return base;
      });

      return toolResult({ themes: results, count: results.length });
    }
  );

  server.registerTool(
    "get_theme",
    {
      description: "Full theme profile: definition, passages grouped by book, connected characters via co-occurrence, sibling themes, per-book trace.",
      inputSchema: getThemeSchema,
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async ({ id, includeTrace }) => {
      const t = db.prepare(`SELECT * FROM themes WHERE id = ?`).get(id) as Record<string, unknown> | undefined;
      if (!t) return errorResult(`Theme not found: ${id}`);

      const passages = db.prepare(`
        SELECT pt.book_id, pt.chapter, pt.verse_start, pt.verse_end, pt.relevance, pt.context_note, pt.source_tier,
               b.name AS book_name, b.testament, b.book_order
        FROM passage_themes pt
        JOIN books b ON b.id = pt.book_id
        WHERE pt.theme_id = ?
        ORDER BY b.book_order, pt.chapter, pt.verse_start
      `).all(id) as Array<{
        book_id: string; chapter: number; verse_start: number; verse_end: number | null;
        relevance: string; context_note: string | null; source_tier: string;
        book_name: string; testament: string; book_order: number;
      }>;

      const passagesByBook: Record<string, unknown[]> = {};
      for (const p of passages) {
        const list = passagesByBook[p.book_id] ?? [];
        list.push({
          chapter: p.chapter,
          verseStart: p.verse_start,
          verseEnd: p.verse_end,
          relevance: p.relevance,
          contextNote: p.context_note,
          sourceTier: p.source_tier,
        });
        passagesByBook[p.book_id] = list;
      }

      const characters = db.prepare(`
        SELECT DISTINCT c.id, c.name, COUNT(DISTINCT pt.id) AS sharedPassages
        FROM passage_themes pt
        JOIN character_appearances ca ON ca.book_id = pt.book_id AND ca.chapter = pt.chapter
          AND ca.verse_start <= COALESCE(pt.verse_end, pt.verse_start)
          AND COALESCE(ca.verse_end, ca.verse_start) >= pt.verse_start
        JOIN characters c ON c.id = ca.character_id
        WHERE pt.theme_id = ?
        GROUP BY c.id
        ORDER BY sharedPassages DESC, c.name
        LIMIT 20
      `).all(id) as Array<{ id: string; name: string; sharedPassages: number }>;

      const siblings = t.parent_theme_id
        ? db.prepare(`SELECT id, name FROM themes WHERE parent_theme_id = ? AND id <> ? ORDER BY name`)
            .all(t.parent_theme_id, id) as Array<{ id: string; name: string }>
        : [];

      const result: Record<string, unknown> = {
        id: t.id,
        name: t.name,
        category: t.category,
        parentThemeId: t.parent_theme_id,
        definition: t.definition,
        modernFraming: t.modern_framing,
        relatedThemes: t.related_themes,
        sourceTier: t.source_tier,
        passagesByBook,
        connectedCharacters: characters,
        siblings,
      };
      if (includeTrace) {
        const trace = db.prepare(`
          SELECT b.id AS book_id, b.name AS book_name, b.testament, b.book_order, COUNT(*) AS count
          FROM passage_themes pt
          JOIN books b ON b.id = pt.book_id
          WHERE pt.theme_id = ?
          GROUP BY b.id
          ORDER BY b.book_order
        `).all(id) as Array<{ book_id: string; book_name: string; testament: string; book_order: number; count: number }>;
        result.trace = trace.map((t) => ({
          bookId: t.book_id, bookName: t.book_name, testament: t.testament, count: t.count,
        }));
      }
      return toolResult(result);
    }
  );

  // Write tools wired in later (task 10)
  registerThemeWrites(server);
}

// Write tool registrations live here but are defined in themesWrites.ts module.
// We import lazily to keep this file focused on reads for now.
import { registerThemeWrites } from "./themesWrites.js";

function toolResult(payload: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }] };
}
function errorResult(msg: string) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify({ error: msg }) }],
    isError: true,
  };
}
