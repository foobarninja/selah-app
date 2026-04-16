import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "../lib/db.js";
import { parseSearchQuery, type ParsedSearchQuery } from "../lib/searchParser.js";
import { normalizeBookId } from "../lib/passageRef.js";
import type Database from "better-sqlite3";

const EntityEnum = z.enum([
  "all",
  "verse",
  "character",
  "theme",
  "narrative_unit",
  "strongs",
  "devotional",
  "commentary",
]);

const inputSchema = {
  query: z
    .string()
    .min(1)
    .describe(
      'Search query. Supports boolean syntax: quoted "phrases", -exclusion, OR, AND (implicit between adjacent terms).'
    ),
  entity: EntityEnum.default("all").describe(
    'Which entity type to search. "all" runs across every type.'
  ),
  bookId: z
    .string()
    .optional()
    .describe(
      'Restrict verses/narrative/devotional/commentary hits to one book (e.g. "GEN", "ROM"). Case-insensitive; full names also accepted.'
    ),
  sourceTier: z
    .string()
    .optional()
    .describe(
      'Filter character/theme/devotional/narrative results by source_tier (e.g. "ai_assisted", "scholarship"). Ignored for verses (always canon) and Strong\'s.'
    ),
  limit: z
    .number()
    .int()
    .min(1)
    .max(50)
    .default(10)
    .describe("Max results per entity bucket."),
};

type SearchHit =
  | { type: "verse"; id: number; bookId: string; chapter: number; verse: number; snippet: string }
  | { type: "character"; id: string; name: string; snippet: string }
  | { type: "theme"; id: string; name: string; snippet: string }
  | { type: "narrative_unit"; id: string; bookId: string; title: string; snippet: string }
  | { type: "strongs"; number: string; word: string; transliteration: string; snippet: string }
  | { type: "devotional"; id: string; title: string; bookId: string; chapter: number; snippet: string }
  | { type: "commentary"; id: number; sourceId: string; bookId: string; chapter: number; verse: number | null; snippet: string };

export function registerSearchTools(server: McpServer): void {
  server.registerTool(
    "search",
    {
      description:
        'Unified text search across Selah content. Returns typed hits ({type, id, snippet, ...}) so downstream tools (get_passage, get_character, get_theme) can be called on specific results.',
      inputSchema,
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async (args) => {
      const { query, entity, limit } = args;
      const bookId = args.bookId ? (normalizeBookId(args.bookId) ?? args.bookId.toUpperCase()) : undefined;
      const sourceTier = args.sourceTier;

      const parsed = parseSearchQuery(query);
      if (parsed.positiveTerms.length === 0) {
        return toolResult({ hits: [], note: "query has no positive terms" });
      }

      const hits: SearchHit[] = [];

      if (entity === "all" || entity === "verse") {
        hits.push(...searchVerses(parsed, { bookId, limit }));
      }
      if (entity === "all" || entity === "character") {
        hits.push(...searchCharacters(parsed, { sourceTier, limit }));
      }
      if (entity === "all" || entity === "theme") {
        hits.push(...searchThemes(parsed, { sourceTier, limit }));
      }
      if (entity === "all" || entity === "narrative_unit") {
        hits.push(...searchNarrative(parsed, { bookId, sourceTier, limit }));
      }
      if (entity === "all" || entity === "strongs") {
        hits.push(...searchStrongs(parsed, { limit }));
      }
      if (entity === "all" || entity === "devotional") {
        hits.push(...searchDevotionals(parsed, { bookId, sourceTier, limit }));
      }
      if (entity === "all" || entity === "commentary") {
        hits.push(...searchCommentary(parsed, { bookId, limit }));
      }

      return toolResult({ hits });
    }
  );
}

function toolResult(payload: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }],
  };
}

function searchVerses(
  parsed: ParsedSearchQuery,
  { bookId, limit }: { bookId?: string; limit: number }
): SearchHit[] {
  const params: unknown[] = [];
  let sql: string;
  if (parsed.ftsExpression) {
    sql = `SELECT v.id, v.book_id, v.chapter, v.verse, v.text
           FROM verses_fts f
           JOIN verses v ON v.id = f.rowid
           WHERE verses_fts MATCH ? AND v.translation_id = 'BSB'`;
    params.push(parsed.ftsExpression);
    if (bookId) { sql += ` AND v.book_id = ?`; params.push(bookId); }
    sql += ` ORDER BY rank LIMIT ?`;
    params.push(limit);
  } else {
    const clauses = parsed.positiveTerms.map(() => `text LIKE ?`).join(" AND ");
    sql = `SELECT id, book_id, chapter, verse, text FROM verses
           WHERE translation_id = 'BSB' AND (${clauses})`;
    for (const t of parsed.positiveTerms) params.push(`%${t}%`);
    if (bookId) { sql += ` AND book_id = ?`; params.push(bookId); }
    sql += ` LIMIT ?`;
    params.push(limit);
  }
  try {
    const rows = db.prepare(sql).all(...params) as Array<{ id: number; book_id: string; chapter: number; verse: number; text: string }>;
    return rows.map((r) => ({
      type: "verse",
      id: r.id,
      bookId: r.book_id,
      chapter: r.chapter,
      verse: r.verse,
      snippet: r.text,
    }));
  } catch {
    return [];
  }
}

function searchCharacters(
  parsed: ParsedSearchQuery,
  { sourceTier, limit }: { sourceTier?: string; limit: number }
): SearchHit[] {
  const rows = entityLike(
    db,
    `SELECT id, name, COALESCE(bio_brief, '') AS bio_brief FROM characters`,
    parsed,
    ["name", "bio_brief"],
    "name",
    limit,
    sourceTier ? `source_tier = ?` : null,
    sourceTier ? [sourceTier] : []
  ) as Array<{ id: string; name: string; bio_brief: string }>;
  return rows.map((r) => ({
    type: "character",
    id: r.id,
    name: r.name,
    snippet: r.bio_brief.slice(0, 200),
  }));
}

function searchThemes(
  parsed: ParsedSearchQuery,
  { sourceTier, limit }: { sourceTier?: string; limit: number }
): SearchHit[] {
  const rows = entityLike(
    db,
    `SELECT id, name, COALESCE(definition, '') AS definition FROM themes`,
    parsed,
    ["name", "definition"],
    "name",
    limit,
    sourceTier ? `source_tier = ?` : null,
    sourceTier ? [sourceTier] : []
  ) as Array<{ id: string; name: string; definition: string }>;
  return rows.map((r) => ({
    type: "theme",
    id: r.id,
    name: r.name,
    snippet: r.definition.slice(0, 200),
  }));
}

function searchNarrative(
  parsed: ParsedSearchQuery,
  { bookId, sourceTier, limit }: { bookId?: string; sourceTier?: string; limit: number }
): SearchHit[] {
  const params: unknown[] = [];
  let sql: string;
  if (parsed.ftsExpression) {
    sql = `SELECT n.id, n.book_id, n.title, COALESCE(n.summary, '') AS summary
           FROM narrative_fts f
           JOIN narrative_units n ON n.rowid = f.rowid
           WHERE narrative_fts MATCH ?`;
    params.push(parsed.ftsExpression);
    if (bookId) { sql += ` AND n.book_id = ?`; params.push(bookId); }
    if (sourceTier) { sql += ` AND n.source_tier = ?`; params.push(sourceTier); }
    sql += ` ORDER BY rank LIMIT ?`;
    params.push(limit);
  } else {
    const perTerm = parsed.positiveTerms.map(() => `(title LIKE ? OR summary LIKE ?)`).join(" AND ");
    sql = `SELECT id, book_id, title, COALESCE(summary, '') AS summary FROM narrative_units
           WHERE ${perTerm}`;
    for (const t of parsed.positiveTerms) { params.push(`%${t}%`, `%${t}%`); }
    if (bookId) { sql += ` AND book_id = ?`; params.push(bookId); }
    if (sourceTier) { sql += ` AND source_tier = ?`; params.push(sourceTier); }
    sql += ` LIMIT ?`;
    params.push(limit);
  }
  try {
    const rows = db.prepare(sql).all(...params) as Array<{ id: string; book_id: string; title: string; summary: string }>;
    return rows.map((r) => ({
      type: "narrative_unit",
      id: r.id,
      bookId: r.book_id,
      title: r.title,
      snippet: r.summary.slice(0, 200),
    }));
  } catch {
    return [];
  }
}

function searchStrongs(parsed: ParsedSearchQuery, { limit }: { limit: number }): SearchHit[] {
  const rows = entityLike(
    db,
    `SELECT number, word, COALESCE(transliteration, '') AS transliteration,
            COALESCE(short_definition, '') AS short_definition
     FROM strongs_entries`,
    parsed,
    ["word", "transliteration", "short_definition", "number"],
    "number",
    limit,
    null,
    []
  ) as Array<{ number: string; word: string; transliteration: string; short_definition: string }>;
  return rows.map((r) => ({
    type: "strongs",
    number: r.number,
    word: r.word,
    transliteration: r.transliteration,
    snippet: r.short_definition.slice(0, 200),
  }));
}

function searchDevotionals(
  parsed: ParsedSearchQuery,
  { bookId, sourceTier, limit }: { bookId?: string; sourceTier?: string; limit: number }
): SearchHit[] {
  const extra: string[] = [];
  const extraParams: unknown[] = [];
  if (bookId) { extra.push(`book_id = ?`); extraParams.push(bookId); }
  if (sourceTier) { extra.push(`source_tier = ?`); extraParams.push(sourceTier); }
  const extraClause = extra.length > 0 ? extra.join(" AND ") : null;

  const rows = entityLike(
    db,
    `SELECT id, title, book_id, chapter, COALESCE(context_brief, '') AS context_brief,
            COALESCE(modern_moment, '') AS modern_moment FROM devotionals`,
    parsed,
    ["title", "context_brief", "modern_moment"],
    "title",
    limit,
    extraClause,
    extraParams
  ) as Array<{ id: string; title: string; book_id: string; chapter: number; context_brief: string; modern_moment: string }>;
  return rows.map((r) => ({
    type: "devotional",
    id: r.id,
    title: r.title,
    bookId: r.book_id,
    chapter: r.chapter,
    snippet: (r.context_brief || r.modern_moment).slice(0, 200),
  }));
}

function searchCommentary(
  parsed: ParsedSearchQuery,
  { bookId, limit }: { bookId?: string; limit: number }
): SearchHit[] {
  const extra: string[] = [];
  const extraParams: unknown[] = [];
  if (bookId) { extra.push(`book_id = ?`); extraParams.push(bookId); }
  const extraClause = extra.length > 0 ? extra.join(" AND ") : null;

  const rows = entityLike(
    db,
    `SELECT id, source_id, book_id, chapter, verse, text FROM commentary_entries`,
    parsed,
    ["text"],
    "id",
    limit,
    extraClause,
    extraParams
  ) as Array<{ id: number; source_id: string; book_id: string; chapter: number; verse: number | null; text: string }>;
  return rows.map((r) => ({
    type: "commentary",
    id: r.id,
    sourceId: r.source_id,
    bookId: r.book_id,
    chapter: r.chapter,
    verse: r.verse,
    snippet: r.text.slice(0, 240),
  }));
}

function entityLike(
  database: Database.Database,
  baseSelect: string,
  parsed: ParsedSearchQuery,
  searchColumns: string[],
  orderByColumn: string,
  limit: number,
  extraWhere: string | null,
  extraParams: unknown[]
): unknown[] {
  const { positiveTerms, negativeTerms } = parsed;
  if (positiveTerms.length === 0) return [];

  const posClauses: string[] = [];
  const posParams: string[] = [];
  for (const term of positiveTerms) {
    for (const col of searchColumns) {
      posClauses.push(`${col} LIKE ?`);
      posParams.push(`%${term}%`);
    }
  }
  const negClauses: string[] = [];
  const negParams: string[] = [];
  for (const term of negativeTerms) {
    for (const col of searchColumns) {
      negClauses.push(`${col} NOT LIKE ?`);
      negParams.push(`%${term}%`);
    }
  }

  let where = `(${posClauses.join(" OR ")})`;
  if (negClauses.length > 0) where += ` AND (${negClauses.join(" AND ")})`;
  if (extraWhere) where += ` AND ${extraWhere}`;

  const sql = `${baseSelect} WHERE ${where} ORDER BY ${orderByColumn} LIMIT ?`;
  try {
    return database.prepare(sql).all(...posParams, ...negParams, ...extraParams, limit);
  } catch {
    return [];
  }
}
