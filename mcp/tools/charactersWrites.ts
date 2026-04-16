import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "../lib/db.js";
import { withWriteLog } from "../lib/writeLog.js";
import { AI_TIER } from "../lib/provenance.js";

const upsertSchema = {
  characterId: z.string().describe("Existing character id (e.g. 'jesus', 'moses')."),
  bookId: z.string().describe("UPPERCASE 3-letter book code."),
  chapter: z.number().int().positive(),
  verseStart: z.number().int().positive(),
  verseEnd: z.number().int().positive().nullable().optional(),
  role: z.string().describe("Character's role in the scene (required). Free-text; typical values: 'protagonist', 'antagonist', 'petitioner', 'observer', 'speaker', 'healer', etc."),
  motivation: z.string().nullable().optional().describe("Narrative-rich description of why the character is acting in this passage. Existing rows are full sentences, not single-word tags."),
  emotionalState: z.string().nullable().optional(),
  stakes: z.string().nullable().optional(),
  narrativeNote: z.string().nullable().optional(),
  modernParallel: z.string().nullable().optional(),
};

export function registerCharacterWrites(server: McpServer): void {
  server.registerTool(
    "upsert_character_appearance",
    {
      description: "Create or update a character_appearance row. Natural key: (characterId, bookId, chapter, verseStart). Update-in-place preserves the row id; null-safe diff on optional fields — omitted fields keep their existing values. Stamps source_tier='ai_assisted'.",
      inputSchema: upsertSchema,
      annotations: { readOnlyHint: false, idempotentHint: true },
    },
    async (args) => {
      const result = await withWriteLog(
        "upsert_character_appearance",
        args,
        () => db.prepare(`
          SELECT * FROM character_appearances
          WHERE character_id = ? AND book_id = ? AND chapter = ? AND verse_start = ?
        `).get(args.characterId, args.bookId, args.chapter, args.verseStart) ?? null,
        () => {
          const character = db.prepare(`SELECT 1 FROM characters WHERE id = ?`).get(args.characterId);
          if (!character) throw new Error(`characterId '${args.characterId}' does not exist`);
          const book = db.prepare(`SELECT 1 FROM books WHERE id = ?`).get(args.bookId);
          if (!book) throw new Error(`bookId '${args.bookId}' does not exist`);

          const existing = db.prepare(`
            SELECT id, verse_end, role, emotional_state, motivation, stakes, narrative_note, modern_parallel, source_tier
            FROM character_appearances
            WHERE character_id = ? AND book_id = ? AND chapter = ? AND verse_start = ?
          `).get(args.characterId, args.bookId, args.chapter, args.verseStart) as Record<string, any> | undefined;

          if (existing) {
            const next = {
              verse_end: args.verseEnd !== undefined ? args.verseEnd : existing.verse_end,
              role: args.role !== undefined ? args.role : existing.role,
              emotional_state: args.emotionalState !== undefined ? args.emotionalState : existing.emotional_state,
              motivation: args.motivation !== undefined ? args.motivation : existing.motivation,
              stakes: args.stakes !== undefined ? args.stakes : existing.stakes,
              narrative_note: args.narrativeNote !== undefined ? args.narrativeNote : existing.narrative_note,
              modern_parallel: args.modernParallel !== undefined ? args.modernParallel : existing.modern_parallel,
            };
            db.prepare(`
              UPDATE character_appearances SET
                verse_end=?, role=?, emotional_state=?, motivation=?, stakes=?, narrative_note=?, modern_parallel=?, source_tier=?
              WHERE id=?
            `).run(
              next.verse_end, next.role, next.emotional_state, next.motivation,
              next.stakes, next.narrative_note, next.modern_parallel, AI_TIER,
              existing.id
            );
            return { action: "updated", id: existing.id };
          } else {
            const info = db.prepare(`
              INSERT INTO character_appearances
                (character_id, book_id, chapter, verse_start, verse_end, role,
                 emotional_state, motivation, stakes, narrative_note, modern_parallel, source_tier)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).run(
              args.characterId, args.bookId, args.chapter, args.verseStart,
              args.verseEnd ?? null, args.role,
              args.emotionalState ?? null, args.motivation ?? null, args.stakes ?? null,
              args.narrativeNote ?? null, args.modernParallel ?? null, AI_TIER
            );
            return { action: "created", id: Number(info.lastInsertRowid) };
          }
        },
        (res) => db.prepare(`SELECT * FROM character_appearances WHERE id = ?`).get(res.id) ?? null
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
}
