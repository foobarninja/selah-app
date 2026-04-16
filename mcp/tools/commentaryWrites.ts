import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "../lib/db.js";
import { withWriteLog } from "../lib/writeLog.js";

const SELAH_AI_SOURCE_ID = "selah-ai";

const upsertSchema = {
  bookId: z.string().describe("UPPERCASE 3-letter book code."),
  chapter: z.number().int().positive(),
  verse: z.number().int().positive().nullable().optional().describe("null/undefined = chapter-level. isIntroduction should be true in that case."),
  text: z.string().min(1),
  isIntroduction: z.boolean().default(false),
  model: z.string().optional(),
};

const ensureSchema = {};

export function registerCommentaryWrites(server: McpServer): void {
  server.registerTool(
    "ensure_ai_commentary_source",
    {
      description: `Idempotent create for the '${SELAH_AI_SOURCE_ID}' commentary_sources row. Called at setup and as a self-heal if the row is missing.`,
      inputSchema: ensureSchema,
      annotations: { readOnlyHint: false, idempotentHint: true },
    },
    async () => {
      const result = await withWriteLog(
        "ensure_ai_commentary_source",
        {},
        () => db.prepare(`SELECT * FROM commentary_sources WHERE id = ?`).get(SELAH_AI_SOURCE_ID) ?? null,
        () => {
          const existing = db.prepare(`SELECT id FROM commentary_sources WHERE id = ?`).get(SELAH_AI_SOURCE_ID);
          if (existing) return { created: false, id: SELAH_AI_SOURCE_ID };
          db.prepare(`
            INSERT INTO commentary_sources (id, name, english_name, tradition)
            VALUES (?, ?, ?, ?)
          `).run(SELAH_AI_SOURCE_ID, "Selah AI", "Selah AI", "ai-generated");
          return { created: true, id: SELAH_AI_SOURCE_ID };
        },
        () => db.prepare(`SELECT * FROM commentary_sources WHERE id = ?`).get(SELAH_AI_SOURCE_ID) ?? null
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.registerTool(
    "upsert_commentary_entry",
    {
      description: `Upsert a commentary entry attached to the '${SELAH_AI_SOURCE_ID}' source. Natural key: (sourceId, bookId, chapter, verse). Calls ensure_ai_commentary_source transparently on first use.`,
      inputSchema: upsertSchema,
      annotations: { readOnlyHint: false, idempotentHint: true },
    },
    async (args) => {
      const result = await withWriteLog(
        "upsert_commentary_entry",
        args,
        () => db.prepare(`
          SELECT * FROM commentary_entries
          WHERE source_id = ? AND book_id = ? AND chapter = ? AND (verse IS ? OR verse = ?)
        `).get(SELAH_AI_SOURCE_ID, args.bookId, args.chapter, args.verse ?? null, args.verse ?? null) ?? null,
        () => {
          ensureAiSource();
          const book = db.prepare(`SELECT 1 FROM books WHERE id = ?`).get(args.bookId);
          if (!book) throw new Error(`bookId '${args.bookId}' does not exist`);

          const existing = db.prepare(`
            SELECT id FROM commentary_entries
            WHERE source_id = ? AND book_id = ? AND chapter = ? AND (verse IS ? OR verse = ?)
          `).get(SELAH_AI_SOURCE_ID, args.bookId, args.chapter, args.verse ?? null, args.verse ?? null) as { id: number } | undefined;

          if (existing) {
            db.prepare(`
              UPDATE commentary_entries SET text=?, is_introduction=? WHERE id=?
            `).run(args.text, args.isIntroduction ? 1 : 0, existing.id);
            return { action: "updated", id: existing.id };
          } else {
            const info = db.prepare(`
              INSERT INTO commentary_entries (source_id, book_id, chapter, verse, text, is_introduction)
              VALUES (?, ?, ?, ?, ?, ?)
            `).run(SELAH_AI_SOURCE_ID, args.bookId, args.chapter, args.verse ?? null, args.text, args.isIntroduction ? 1 : 0);
            return { action: "created", id: Number(info.lastInsertRowid) };
          }
        },
        (res) => db.prepare(`SELECT * FROM commentary_entries WHERE id = ?`).get(res.id) ?? null
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
}

function ensureAiSource(): void {
  const existing = db.prepare(`SELECT id FROM commentary_sources WHERE id = ?`).get(SELAH_AI_SOURCE_ID);
  if (existing) return;
  db.prepare(`
    INSERT INTO commentary_sources (id, name, english_name, tradition)
    VALUES (?, ?, ?, ?)
  `).run(SELAH_AI_SOURCE_ID, "Selah AI", "Selah AI", "ai-generated");
}
