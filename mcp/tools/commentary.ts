import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "../lib/db.js";

const querySchema = {
  sourceId: z.string().optional(),
  bookId: z.string().optional(),
  chapter: z.number().int().positive().optional(),
  verse: z.number().int().positive().optional(),
  missingFromSource: z.string().optional().describe("Audit: passages with ZERO entries from this sourceId. Returns distinct passages that lack coverage."),
  onlyThinlyCovered: z
    .object({ maxTotalEntries: z.number().int().min(0) })
    .optional()
    .describe("Audit: passages with <= maxTotalEntries across ALL sources combined."),
  groupBy: z.enum(["book", "source"]).optional(),
  limit: z.number().int().min(1).max(500).default(50),
};

export function registerCommentaryTools(server: McpServer): void {
  server.registerTool(
    "query_commentary",
    {
      description: "Dual-purpose research + audit query for commentary_entries. Use missingFromSource or onlyThinlyCovered for gap analysis; otherwise a filtered entry list.",
      inputSchema: querySchema,
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async (args) => {
      if (args.missingFromSource) return handleMissingFromSource(args);
      if (args.onlyThinlyCovered) return handleThinlyCovered(args);
      if (args.groupBy) return handleGroupBy(args);
      return handleList(args);
    }
  );

  registerCommentaryWrites(server);
}

import { registerCommentaryWrites } from "./commentaryWrites.js";

function handleList(args: Record<string, any>) {
  const where: string[] = [];
  const params: unknown[] = [];
  if (args.sourceId) { where.push("ce.source_id = ?"); params.push(args.sourceId); }
  if (args.bookId) { where.push("ce.book_id = ?"); params.push(args.bookId); }
  if (args.chapter) { where.push("ce.chapter = ?"); params.push(args.chapter); }
  if (args.verse) { where.push("(ce.verse = ? OR ce.verse IS NULL)"); params.push(args.verse); }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
  const rows = db.prepare(`
    SELECT ce.id, ce.source_id, ce.book_id, ce.chapter, ce.verse, ce.is_introduction,
           SUBSTR(ce.text, 1, 400) AS snippet, LENGTH(ce.text) AS fullLength,
           cs.name AS source_name, cs.tradition
    FROM commentary_entries ce
    JOIN commentary_sources cs ON cs.id = ce.source_id
    ${whereClause}
    ORDER BY ce.book_id, ce.chapter, ce.verse NULLS FIRST, cs.name
    LIMIT ?
  `).all(...params, args.limit) as Array<Record<string, any>>;

  return toolResult({
    entries: rows.map((r) => ({
      id: r.id,
      sourceId: r.source_id,
      sourceName: r.source_name,
      tradition: r.tradition,
      bookId: r.book_id,
      chapter: r.chapter,
      verse: r.verse,
      isIntroduction: !!r.is_introduction,
      snippet: r.snippet,
      fullLength: r.fullLength,
    })),
    count: rows.length,
  });
}

function handleMissingFromSource(args: Record<string, any>) {
  // Return distinct (bookId, chapter, verse) triples from verses that lack any entry
  // in `missingFromSource`. Filter by bookId/chapter if given.
  const params: unknown[] = [args.missingFromSource];
  const where: string[] = [`v.translation_id = 'BSB'`];
  if (args.bookId) { where.push("v.book_id = ?"); params.push(args.bookId); }
  if (args.chapter) { where.push("v.chapter = ?"); params.push(args.chapter); }
  where.push(`NOT EXISTS (
    SELECT 1 FROM commentary_entries ce
    WHERE ce.source_id = ? AND ce.book_id = v.book_id AND ce.chapter = v.chapter
      AND (ce.verse = v.verse OR ce.verse IS NULL)
  )`);
  params.push(args.missingFromSource);
  params.push(args.limit);

  const rows = db.prepare(`
    SELECT v.book_id, v.chapter, v.verse
    FROM verses v
    WHERE ${where.join(" AND ")}
    ORDER BY v.book_id, v.chapter, v.verse
    LIMIT ?
  `).all(...params) as Array<{ book_id: string; chapter: number; verse: number }>;

  return toolResult({
    mode: "missingFromSource",
    sourceId: args.missingFromSource,
    missingPassages: rows.map((r) => ({ bookId: r.book_id, chapter: r.chapter, verse: r.verse })),
    count: rows.length,
  });
}

function handleThinlyCovered(args: Record<string, any>) {
  const maxEntries = args.onlyThinlyCovered.maxTotalEntries;
  const params: unknown[] = [];
  const where: string[] = [`v.translation_id = 'BSB'`];
  if (args.bookId) { where.push("v.book_id = ?"); params.push(args.bookId); }
  if (args.chapter) { where.push("v.chapter = ?"); params.push(args.chapter); }
  params.push(maxEntries, args.limit);

  const rows = db.prepare(`
    SELECT v.book_id, v.chapter, v.verse,
           (SELECT COUNT(*) FROM commentary_entries ce
            WHERE ce.book_id = v.book_id AND ce.chapter = v.chapter
              AND (ce.verse = v.verse OR ce.verse IS NULL)) AS entryCount
    FROM verses v
    WHERE ${where.join(" AND ")}
    GROUP BY v.book_id, v.chapter, v.verse
    HAVING entryCount <= ?
    ORDER BY entryCount, v.book_id, v.chapter, v.verse
    LIMIT ?
  `).all(...params) as Array<{ book_id: string; chapter: number; verse: number; entryCount: number }>;

  return toolResult({
    mode: "thinlyCovered",
    maxTotalEntries: maxEntries,
    passages: rows.map((r) => ({
      bookId: r.book_id, chapter: r.chapter, verse: r.verse, entryCount: r.entryCount,
    })),
    count: rows.length,
  });
}

function handleGroupBy(args: Record<string, any>) {
  let sql: string;
  if (args.groupBy === "book") {
    sql = `
      SELECT b.id AS book_id, b.name, b.testament, b.book_order,
             COUNT(ce.id) AS entryCount,
             COUNT(DISTINCT ce.source_id) AS sourceCount
      FROM books b
      LEFT JOIN commentary_entries ce ON ce.book_id = b.id
      GROUP BY b.id
      ORDER BY b.book_order
      LIMIT ?
    `;
  } else {
    sql = `
      SELECT cs.id, cs.name, cs.tradition, COUNT(ce.id) AS entryCount
      FROM commentary_sources cs
      LEFT JOIN commentary_entries ce ON ce.source_id = cs.id
      GROUP BY cs.id
      ORDER BY entryCount DESC
      LIMIT ?
    `;
  }
  const rows = db.prepare(sql).all(args.limit);
  return toolResult({ groupBy: args.groupBy, groups: rows });
}

function toolResult(payload: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }] };
}
