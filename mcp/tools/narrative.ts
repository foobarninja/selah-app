import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "../lib/db.js";

const querySchema = {
  bookId: z.string().optional(),
  testament: z.enum(["OT", "NT"]).optional().describe("Filters via books.testament."),
  era: z.string().optional().describe("Narrative unit overlaps a passage_climate in a climate_context with this era."),
  characterInvolved: z.string().optional().describe("Character id whose appearances overlap the narrative unit's span."),
  themePresent: z.string().optional().describe("Theme id with passage_themes overlapping the narrative unit's span."),
  climateContextId: z.string().optional(),
  sourceTier: z.string().optional(),
  limit: z.number().int().min(1).max(200).default(50),
};

export function registerNarrativeTools(server: McpServer): void {
  server.registerTool(
    "query_narrative_units",
    {
      description: "Filter narrative units by book, era, testament, character involvement, theme presence, or climate context.",
      inputSchema: querySchema,
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async (args) => {
      const where: string[] = [];
      const params: unknown[] = [];
      if (args.bookId) { where.push("n.book_id = ?"); params.push(args.bookId); }
      if (args.sourceTier) { where.push("n.source_tier = ?"); params.push(args.sourceTier); }
      if (args.testament) { where.push("b.testament = ?"); params.push(args.testament); }
      if (args.climateContextId) {
        where.push(`EXISTS (
          SELECT 1 FROM passage_climate pc
          WHERE pc.book_id = n.book_id
            AND pc.chapter BETWEEN n.chapter_start AND COALESCE(n.chapter_end, n.chapter_start)
            AND pc.context_id = ?
        )`);
        params.push(args.climateContextId);
      }
      if (args.era) {
        where.push(`EXISTS (
          SELECT 1 FROM passage_climate pc
          JOIN climate_contexts cc ON cc.id = pc.context_id
          WHERE pc.book_id = n.book_id
            AND pc.chapter BETWEEN n.chapter_start AND COALESCE(n.chapter_end, n.chapter_start)
            AND cc.era = ?
        )`);
        params.push(args.era);
      }
      if (args.characterInvolved) {
        where.push(`EXISTS (
          SELECT 1 FROM character_appearances ca
          WHERE ca.character_id = ?
            AND ca.book_id = n.book_id
            AND ca.chapter BETWEEN n.chapter_start AND COALESCE(n.chapter_end, n.chapter_start)
        )`);
        params.push(args.characterInvolved);
      }
      if (args.themePresent) {
        where.push(`EXISTS (
          SELECT 1 FROM passage_themes pt
          WHERE pt.theme_id = ?
            AND pt.book_id = n.book_id
            AND pt.chapter BETWEEN n.chapter_start AND COALESCE(n.chapter_end, n.chapter_start)
        )`);
        params.push(args.themePresent);
      }

      const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
      const sql = `
        SELECT n.id, n.title, n.book_id, n.chapter_start, n.verse_start,
               n.chapter_end, n.verse_end, n.summary, n.significance,
               n.source_tier, b.testament, b.book_order
        FROM narrative_units n
        JOIN books b ON b.id = n.book_id
        ${whereClause}
        ORDER BY b.book_order, n.chapter_start, n.verse_start
        LIMIT ?
      `;
      params.push(args.limit);

      const rows = db.prepare(sql).all(...params) as Array<{
        id: string; title: string; book_id: string;
        chapter_start: number; verse_start: number;
        chapter_end: number | null; verse_end: number | null;
        summary: string | null; significance: string | null;
        source_tier: string; testament: string; book_order: number;
      }>;

      const results = rows.map((r) => {
        const characterCount = db.prepare(`
          SELECT COUNT(DISTINCT character_id) AS n FROM character_appearances
          WHERE book_id = ? AND chapter BETWEEN ? AND ?
        `).get(r.book_id, r.chapter_start, r.chapter_end ?? r.chapter_start) as { n: number };
        const themeCount = db.prepare(`
          SELECT COUNT(DISTINCT theme_id) AS n FROM passage_themes
          WHERE book_id = ? AND chapter BETWEEN ? AND ?
        `).get(r.book_id, r.chapter_start, r.chapter_end ?? r.chapter_start) as { n: number };
        const climate = db.prepare(`
          SELECT DISTINCT cc.id, cc.name, cc.era
          FROM passage_climate pc
          JOIN climate_contexts cc ON cc.id = pc.context_id
          WHERE pc.book_id = ? AND pc.chapter BETWEEN ? AND ?
          LIMIT 3
        `).all(r.book_id, r.chapter_start, r.chapter_end ?? r.chapter_start) as Array<{ id: string; name: string; era: string }>;

        return {
          id: r.id,
          title: r.title,
          bookId: r.book_id,
          testament: r.testament,
          span: {
            chapterStart: r.chapter_start,
            verseStart: r.verse_start,
            chapterEnd: r.chapter_end,
            verseEnd: r.verse_end,
          },
          summary: r.summary,
          significance: r.significance,
          sourceTier: r.source_tier,
          characterCount: characterCount.n,
          themeCount: themeCount.n,
          climateContexts: climate,
        };
      });

      return { content: [{ type: "text" as const, text: JSON.stringify({ narrativeUnits: results, count: results.length }, null, 2) }] };
    }
  );
}
