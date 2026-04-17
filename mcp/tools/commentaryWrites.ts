import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "../lib/db.js";
import { withWriteLog } from "../lib/writeLog.js";

const SELAH_AI_SOURCE_ID = "selah-ai";

const upsertSchema = {
  bookId: z.string().describe("UPPERCASE 3-letter book code."),
  chapter: z.number().int().positive(),
  verse: z.number().int().positive().nullable().optional().describe("null/undefined = chapter-level. isIntroduction should be true in that case."),
  text: z.string().min(1).describe("The commentary text. The BSB verse text will be auto-prepended as a quote — do NOT include it yourself."),
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
      description: `Upsert a commentary entry attached to the '${SELAH_AI_SOURCE_ID}' source. Natural key: (sourceId, bookId, chapter, verse). Auto-prepends the BSB verse text as a quote before the commentary. Calls ensure_ai_commentary_source transparently on first use.`,
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

          const finalText = prependVerseText(args.bookId, args.chapter, args.verse ?? null, args.text);

          const existing = db.prepare(`
            SELECT id FROM commentary_entries
            WHERE source_id = ? AND book_id = ? AND chapter = ? AND (verse IS ? OR verse = ?)
          `).get(SELAH_AI_SOURCE_ID, args.bookId, args.chapter, args.verse ?? null, args.verse ?? null) as { id: number } | undefined;

          if (existing) {
            db.prepare(`
              UPDATE commentary_entries SET text=?, is_introduction=? WHERE id=?
            `).run(finalText, args.isIntroduction ? 1 : 0, existing.id);
            return { action: "updated", id: existing.id };
          } else {
            const info = db.prepare(`
              INSERT INTO commentary_entries (source_id, book_id, chapter, verse, text, is_introduction)
              VALUES (?, ?, ?, ?, ?, ?)
            `).run(SELAH_AI_SOURCE_ID, args.bookId, args.chapter, args.verse ?? null, finalText, args.isIntroduction ? 1 : 0);
            return { action: "created", id: Number(info.lastInsertRowid) };
          }
        },
        (res) => db.prepare(`SELECT * FROM commentary_entries WHERE id = ?`).get(res.id) ?? null
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
}

function prependVerseText(bookId: string, chapter: number, verse: number | null, commentary: string): string {
  if (verse === null) return commentary;
  const bookRow = db.prepare(`SELECT name FROM books WHERE id = ?`).get(bookId) as { name: string } | undefined;
  const verseRow = db.prepare(
    `SELECT text FROM verses WHERE translation_id = 'BSB' AND book_id = ? AND chapter = ? AND verse = ?`
  ).get(bookId, chapter, verse) as { text: string } | undefined;
  if (!verseRow) return commentary;
  const bookName = bookRow?.name ?? bookId;
  const ref = `${bookName} ${chapter}:${verse}`;
  const prefix = `${ref} — "${verseRow.text}" — `;
  if (commentary.startsWith(ref)) return commentary;
  return prefix + commentary;
}

function ensureAiSource(): void {
  const existing = db.prepare(`SELECT id FROM commentary_sources WHERE id = ?`).get(SELAH_AI_SOURCE_ID);
  if (existing) return;
  db.prepare(`
    INSERT INTO commentary_sources (id, name, english_name, tradition)
    VALUES (?, ?, ?, ?)
  `).run(SELAH_AI_SOURCE_ID, "Selah AI", "Selah AI", "ai-generated");
}
