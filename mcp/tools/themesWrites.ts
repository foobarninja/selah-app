import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "../lib/db.js";
import { withWriteLog } from "../lib/writeLog.js";
import { AI_TIER } from "../lib/provenance.js";

const upsertThemeSchema = {
  id: z.string(),
  name: z.string().optional(),
  category: z.string().nullable().optional(),
  parentThemeId: z.string().nullable().optional(),
  definition: z.string().nullable().optional(),
  modernFraming: z.string().nullable().optional(),
  relatedThemes: z.string().nullable().optional(),
  sourceTier: z.string().optional().describe("Defaults to 'ai_assisted'. Passing 'scholarship' is allowed for manual curation."),
};

const tagSchema = {
  themeId: z.string(),
  bookId: z.string(),
  chapter: z.number().int().positive(),
  verseStart: z.number().int().positive(),
  verseEnd: z.number().int().positive().nullable().optional(),
  relevance: z.enum(["primary", "secondary", "illustrative"]).default("primary"),
  contextNote: z.string().nullable().optional(),
};

const untagSchema = {
  themeId: z.string(),
  bookId: z.string(),
  chapter: z.number().int().positive(),
  verseStart: z.number().int().positive(),
};

export function registerThemeWrites(server: McpServer): void {
  server.registerTool(
    "upsert_theme",
    {
      description: "Create a new theme row or backfill fields on an existing one. For existing themes, ONLY fields explicitly provided are overwritten (null-safe diff — omitted fields are preserved). Stamps source_tier='ai_assisted' by default.",
      inputSchema: upsertThemeSchema,
      annotations: { readOnlyHint: false, idempotentHint: true },
    },
    async (args) => {
      const result = await withWriteLog(
        "upsert_theme",
        args,
        () => db.prepare(`SELECT * FROM themes WHERE id = ?`).get(args.id) ?? null,
        () => {
          if (args.parentThemeId) {
            const parent = db.prepare(`SELECT 1 FROM themes WHERE id = ?`).get(args.parentThemeId);
            if (!parent) throw new Error(`parentThemeId '${args.parentThemeId}' does not exist`);
          }
          const existing = db.prepare(`SELECT * FROM themes WHERE id = ?`).get(args.id) as Record<string, any> | undefined;
          const tier = args.sourceTier ?? (existing?.source_tier ?? AI_TIER);

          if (existing) {
            const next = {
              name: args.name !== undefined ? args.name : existing.name,
              category: args.category !== undefined ? args.category : existing.category,
              parent_theme_id: args.parentThemeId !== undefined ? args.parentThemeId : existing.parent_theme_id,
              definition: args.definition !== undefined ? args.definition : existing.definition,
              modern_framing: args.modernFraming !== undefined ? args.modernFraming : existing.modern_framing,
              related_themes: args.relatedThemes !== undefined ? args.relatedThemes : existing.related_themes,
              source_tier: args.sourceTier !== undefined ? args.sourceTier : existing.source_tier,
            };
            db.prepare(`
              UPDATE themes SET
                name=?, category=?, parent_theme_id=?, definition=?, modern_framing=?, related_themes=?, source_tier=?
              WHERE id=?
            `).run(
              next.name, next.category, next.parent_theme_id, next.definition,
              next.modern_framing, next.related_themes, next.source_tier,
              args.id
            );
            return { created: false, id: args.id };
          } else {
            if (!args.name) throw new Error(`new theme requires name`);
            db.prepare(`
              INSERT INTO themes (id, name, category, parent_theme_id, definition, modern_framing, related_themes, source_tier)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `).run(
              args.id, args.name, args.category ?? null, args.parentThemeId ?? null,
              args.definition ?? null, args.modernFraming ?? null, args.relatedThemes ?? null, tier
            );
            return { created: true, id: args.id };
          }
        },
        () => db.prepare(`SELECT * FROM themes WHERE id = ?`).get(args.id) ?? null
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.registerTool(
    "tag_passage_with_theme",
    {
      description: "Attach a theme to a passage via passage_themes. Upserts on (themeId, bookId, chapter, verseStart) — same coords replace relevance/contextNote. Stamps source_tier='ai_assisted'.",
      inputSchema: tagSchema,
      annotations: { readOnlyHint: false, idempotentHint: true },
    },
    async (args) => {
      const result = await withWriteLog(
        "tag_passage_with_theme",
        args,
        () => db.prepare(`
          SELECT * FROM passage_themes
          WHERE theme_id = ? AND book_id = ? AND chapter = ? AND verse_start = ?
        `).get(args.themeId, args.bookId, args.chapter, args.verseStart) ?? null,
        () => {
          const theme = db.prepare(`SELECT 1 FROM themes WHERE id = ?`).get(args.themeId);
          if (!theme) throw new Error(`themeId '${args.themeId}' does not exist`);
          const book = db.prepare(`SELECT 1 FROM books WHERE id = ?`).get(args.bookId);
          if (!book) throw new Error(`bookId '${args.bookId}' does not exist`);

          const existing = db.prepare(`
            SELECT id FROM passage_themes
            WHERE theme_id = ? AND book_id = ? AND chapter = ? AND verse_start = ?
          `).get(args.themeId, args.bookId, args.chapter, args.verseStart) as { id: number } | undefined;

          if (existing) {
            db.prepare(`
              UPDATE passage_themes SET verse_end=?, relevance=?, context_note=?, source_tier=?
              WHERE id=?
            `).run(args.verseEnd ?? null, args.relevance, args.contextNote ?? null, AI_TIER, existing.id);
            return { action: "updated", id: existing.id };
          } else {
            const info = db.prepare(`
              INSERT INTO passage_themes (theme_id, book_id, chapter, verse_start, verse_end, relevance, context_note, source_tier)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `).run(
              args.themeId, args.bookId, args.chapter, args.verseStart,
              args.verseEnd ?? null, args.relevance, args.contextNote ?? null, AI_TIER
            );
            return { action: "created", id: Number(info.lastInsertRowid) };
          }
        },
        (res) => db.prepare(`SELECT * FROM passage_themes WHERE id = ?`).get(res.id) ?? null
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.registerTool(
    "untag_passage",
    {
      description: "Remove a single passage_themes row by (themeId, bookId, chapter, verseStart). This is the only destructive tool in the MCP — use when a theme was mistakenly tagged.",
      inputSchema: untagSchema,
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true },
    },
    async (args) => {
      const result = await withWriteLog(
        "untag_passage",
        args,
        () => db.prepare(`
          SELECT * FROM passage_themes
          WHERE theme_id = ? AND book_id = ? AND chapter = ? AND verse_start = ?
        `).get(args.themeId, args.bookId, args.chapter, args.verseStart) ?? null,
        () => {
          const info = db.prepare(`
            DELETE FROM passage_themes
            WHERE theme_id = ? AND book_id = ? AND chapter = ? AND verse_start = ?
          `).run(args.themeId, args.bookId, args.chapter, args.verseStart);
          return { deleted: info.changes };
        },
        () => null
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
}
