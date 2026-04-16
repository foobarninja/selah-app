import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "../lib/db.js";
import { withWriteLog } from "../lib/writeLog.js";
import { AI_TIER, buildSourceNotes, appendRevisionMarker } from "../lib/provenance.js";

const TagMappingSchema = z.object({
  tagId: z.string(),
  relevance: z.enum(["primary", "secondary", "illustrative"]).default("primary"),
});

const upsertSchema = {
  id: z.string().describe("Stable devotional id. If a devotional with this id exists, it is updated in place (history FKs preserved)."),
  title: z.string().min(1),
  bookId: z.string().describe("UPPERCASE 3-letter book code."),
  chapter: z.number().int().positive(),
  verseStart: z.number().int().positive(),
  verseEnd: z.number().int().positive(),
  contextBrief: z.string(),
  modernMoment: z.string(),
  conversationStarters: z.string(),
  goingDeeper: z.string().nullable().optional(),
  audience: z.string().default("family"),
  estimatedMinutes: z.number().int().min(1).default(5),
  season: z.string().nullable().optional(),
  dayOfYear: z.number().int().min(1).max(366).nullable().optional(),
  narrativeId: z.string().nullable().optional(),
  tagMappings: z.array(TagMappingSchema).default([]),
  model: z.string().optional().describe("Model label for sourceNotes provenance (e.g. 'claude-opus-4-6')."),
};

export function registerDevotionalWrites(server: McpServer): void {
  server.registerTool(
    "upsert_devotional",
    {
      description: "Create or update a devotional in place (same id). Atomically replaces tag_map rows. Stamps source_tier='ai_assisted' and appends a revision marker to sourceNotes on update. Preserves devotional_history FK references.",
      inputSchema: upsertSchema,
      annotations: { readOnlyHint: false, idempotentHint: true },
    },
    async (args) => {
      const result = await withWriteLog(
        "upsert_devotional",
        args,
        () => {
          const existing = db.prepare(`SELECT * FROM devotionals WHERE id = ?`).get(args.id) ?? null;
          const tagMap = existing ? db.prepare(`SELECT tag_id, relevance FROM devotional_tag_map WHERE devotional_id = ?`).all(args.id) : [];
          return existing ? { devotional: existing, tagMap } : null;
        },
        () => {
          const existing = db.prepare(`SELECT source_notes FROM devotionals WHERE id = ?`).get(args.id) as { source_notes: string | null } | undefined;
          const newNotes = appendRevisionMarker(
            existing?.source_notes ?? null,
            buildSourceNotes({ model: args.model, revisionOf: existing ? args.id : null })
          );

          const nowIso = new Date().toISOString();
          const tx = db.transaction(() => {
            if (existing) {
              db.prepare(`
                UPDATE devotionals SET
                  title=?, book_id=?, chapter=?, verse_start=?, verse_end=?,
                  context_brief=?, modern_moment=?, conversation_starters=?, going_deeper=?,
                  audience=?, estimated_minutes=?, season=?, day_of_year=?, narrative_id=?,
                  source_tier=?, source_notes=?
                WHERE id=?
              `).run(
                args.title, args.bookId, args.chapter, args.verseStart, args.verseEnd,
                args.contextBrief, args.modernMoment, args.conversationStarters, args.goingDeeper ?? null,
                args.audience, args.estimatedMinutes, args.season ?? null, args.dayOfYear ?? null, args.narrativeId ?? null,
                AI_TIER, newNotes,
                args.id
              );
            } else {
              db.prepare(`
                INSERT INTO devotionals
                  (id, title, book_id, chapter, verse_start, verse_end,
                   context_brief, modern_moment, conversation_starters, going_deeper,
                   audience, estimated_minutes, season, day_of_year, narrative_id,
                   source_tier, source_notes, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `).run(
                args.id, args.title, args.bookId, args.chapter, args.verseStart, args.verseEnd,
                args.contextBrief, args.modernMoment, args.conversationStarters, args.goingDeeper ?? null,
                args.audience, args.estimatedMinutes, args.season ?? null, args.dayOfYear ?? null, args.narrativeId ?? null,
                AI_TIER, newNotes, nowIso
              );
            }
            db.prepare(`DELETE FROM devotional_tag_map WHERE devotional_id = ?`).run(args.id);
            const insertTag = db.prepare(`INSERT INTO devotional_tag_map (devotional_id, tag_id, relevance) VALUES (?, ?, ?)`);
            for (const m of args.tagMappings) {
              try { insertTag.run(args.id, m.tagId, m.relevance); }
              catch (e) { throw new Error(`tag_map insert failed for tag '${m.tagId}': ${(e as Error).message}`); }
            }
            return { created: !existing, id: args.id };
          });
          return tx();
        },
        () => {
          const devotional = db.prepare(`SELECT * FROM devotionals WHERE id = ?`).get(args.id);
          const tagMap = db.prepare(`SELECT tag_id, relevance FROM devotional_tag_map WHERE devotional_id = ?`).all(args.id);
          return { devotional, tagMap };
        }
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
}
