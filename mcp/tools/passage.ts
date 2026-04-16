import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "../lib/db.js";
import { normalizeBookId, parsePassageRef } from "../lib/passageRef.js";

const MAX_CHARS = 40_000;
const BSB = "BSB";

const TRUNCATION_ORDER = [
  "parallelTranslations",
  "commentary",
  "devotionals",
  "characters",
  "crossRefs",
  "themes",
  "narrativeUnit",
] as const;

const inputSchema = {
  reference: z
    .string()
    .optional()
    .describe('Scripture reference like "Rom 8:28", "John 3:16-18", "Psalm 119". Either this or explicit coords is required.'),
  bookId: z.string().optional().describe('Uppercase 3-letter book code (e.g. "ROM", "GEN"). Used with chapter/verseStart/verseEnd if reference is omitted.'),
  chapter: z.number().int().positive().optional(),
  verseStart: z.number().int().positive().optional(),
  verseEnd: z.number().int().positive().optional(),

  includeCrossRefs: z.boolean().default(false).describe("Include cross-references for the passage (top by score, with BSB snippets of target verses)."),
  includeThemes: z.boolean().default(false).describe("Include passage_themes overlapping the passage with theme metadata."),
  includeCharacters: z.boolean().default(false).describe("Include character appearances overlapping the passage with brief bio."),
  includeCommentary: z.boolean().default(false).describe("Include commentary entries overlapping the passage. Use sourceIds to filter."),
  sourceIds: z.array(z.string()).optional().describe("Restrict commentary to these source ids (e.g. [\"matthew-henry\", \"selah-ai\"]). Only used when includeCommentary is true."),
  includeDevotionals: z.boolean().default(false).describe("Include devotionals anchored to or overlapping the passage."),
  includeNarrativeUnit: z.boolean().default(false).describe("Include the narrative unit(s) containing the passage."),
  includeParallelTranslations: z.array(z.string()).optional().describe("Translation IDs to include alongside BSB (e.g. [\"KJV\"]). BSB is always returned."),
};

export function registerPassageTools(server: McpServer): void {
  server.registerTool(
    "get_passage",
    {
      description: [
        "Unified passage view. Always returns BSB verse text + footnotes + Strong's (never truncated).",
        "",
        "Output cap: " + MAX_CHARS + " chars. Truncation priority when cap is exceeded (dropped first → last):",
        "  parallelTranslations → commentary → devotionals → characters → crossRefs → themes → narrativeUnit.",
        "Dropped sections are listed in the `trimmed` field on the response; when that array is non-empty, the remaining content does NOT reflect the full picture — call again with narrower include flags rather than reasoning from the partial payload.",
      ].join("\n"),
      inputSchema,
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async (args) => {
      const coords = resolveCoords(args);
      if (!coords) {
        return errorResult("Could not resolve passage coordinates. Provide `reference` or explicit bookId + chapter.");
      }
      const { bookId, chapter, verseStart, verseEnd } = coords;

      const verses = fetchVerses(bookId, chapter, verseStart, verseEnd);
      if (verses.length === 0) {
        return errorResult(`No BSB verses found for ${bookId} ${chapter}${verseStart ? ":" + verseStart : ""}${verseEnd ? "-" + verseEnd : ""}.`);
      }

      const actualStart = verses[0].verse;
      const actualEnd = verses[verses.length - 1].verse;

      const payload: Record<string, unknown> = {
        bookId,
        chapter,
        verseStart: actualStart,
        verseEnd: actualEnd,
        verses: verses.map((v) => ({ verse: v.verse, text: v.text, heading: v.heading, wordsOfJesus: !!v.words_of_jesus })),
        footnotes: fetchFootnotes(bookId, chapter, actualStart, actualEnd),
        strongs: fetchStrongs(bookId, chapter, actualStart, actualEnd),
      };

      const optional: Partial<Record<typeof TRUNCATION_ORDER[number], unknown>> = {};
      const notRequested: typeof TRUNCATION_ORDER[number][] = [];

      if (args.includeNarrativeUnit) {
        optional.narrativeUnit = fetchNarrativeUnit(bookId, chapter, actualStart);
      } else {
        notRequested.push("narrativeUnit");
      }
      if (args.includeThemes) {
        optional.themes = fetchPassageThemes(bookId, chapter, actualStart, actualEnd);
      } else {
        notRequested.push("themes");
      }
      if (args.includeCrossRefs) {
        optional.crossRefs = fetchCrossRefs(bookId, chapter, actualStart, actualEnd);
      } else {
        notRequested.push("crossRefs");
      }
      if (args.includeCharacters) {
        optional.characters = fetchCharacterAppearances(bookId, chapter, actualStart, actualEnd);
      } else {
        notRequested.push("characters");
      }
      if (args.includeDevotionals) {
        optional.devotionals = fetchDevotionals(bookId, chapter, actualStart, actualEnd);
      } else {
        notRequested.push("devotionals");
      }
      if (args.includeCommentary) {
        optional.commentary = fetchCommentary(bookId, chapter, actualStart, actualEnd, args.sourceIds);
      } else {
        notRequested.push("commentary");
      }
      if (args.includeParallelTranslations && args.includeParallelTranslations.length > 0) {
        optional.parallelTranslations = fetchParallelTranslations(
          bookId,
          chapter,
          actualStart,
          actualEnd,
          args.includeParallelTranslations
        );
      } else {
        notRequested.push("parallelTranslations");
      }

      const trimmed: Array<{ section: string; reason: "cap" | "notRequested"; bytesOmitted?: number }> = [];
      for (const section of notRequested) {
        trimmed.push({ section, reason: "notRequested" });
      }

      // Enforce cap
      const sectionsInPriority = [...TRUNCATION_ORDER];
      // Keep dropping sections (from highest-priority-to-drop) until we fit.
      const workingPayload = { ...payload, ...optional, trimmed };
      let size = JSON.stringify(workingPayload).length;
      for (const section of sectionsInPriority) {
        if (size <= MAX_CHARS) break;
        if (!(section in optional)) continue;
        const bytes = JSON.stringify((workingPayload as Record<string, unknown>)[section] ?? null).length;
        delete (workingPayload as Record<string, unknown>)[section];
        trimmed.push({ section, reason: "cap", bytesOmitted: bytes });
        size = JSON.stringify(workingPayload).length;
      }
      (workingPayload as Record<string, unknown>).trimmed = trimmed;

      return {
        content: [{ type: "text" as const, text: JSON.stringify(workingPayload, null, 2) }],
      };
    }
  );
}

function errorResult(msg: string) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify({ error: msg }) }],
    isError: true,
  };
}

function resolveCoords(args: {
  reference?: string;
  bookId?: string;
  chapter?: number;
  verseStart?: number;
  verseEnd?: number;
}): { bookId: string; chapter: number; verseStart?: number; verseEnd?: number } | null {
  if (args.reference) {
    const parsed = parsePassageRef(args.reference);
    if (parsed) return parsed;
  }
  if (args.bookId && args.chapter) {
    const normalized = normalizeBookId(args.bookId);
    if (!normalized) return null;
    return {
      bookId: normalized,
      chapter: args.chapter,
      verseStart: args.verseStart,
      verseEnd: args.verseEnd,
    };
  }
  return null;
}

interface VerseRow {
  verse: number;
  text: string;
  heading: string | null;
  words_of_jesus: number;
}

function fetchVerses(bookId: string, chapter: number, verseStart?: number, verseEnd?: number): VerseRow[] {
  const params: unknown[] = [BSB, bookId, chapter];
  let sql = `SELECT verse, text, heading, words_of_jesus FROM verses
             WHERE translation_id = ? AND book_id = ? AND chapter = ?`;
  if (verseStart !== undefined) {
    sql += ` AND verse >= ?`;
    params.push(verseStart);
    if (verseEnd !== undefined) {
      sql += ` AND verse <= ?`;
      params.push(verseEnd);
    }
  }
  sql += ` ORDER BY verse`;
  return db.prepare(sql).all(...params) as VerseRow[];
}

function fetchFootnotes(bookId: string, chapter: number, vStart: number, vEnd: number) {
  const rows = db
    .prepare(
      `SELECT verse, note_text, caller FROM footnotes
       WHERE translation_id = ? AND book_id = ? AND chapter = ? AND verse BETWEEN ? AND ?
       ORDER BY verse`
    )
    .all(BSB, bookId, chapter, vStart, vEnd) as Array<{ verse: number; note_text: string; caller: string | null }>;
  return rows.map((r) => ({ verse: r.verse, caller: r.caller, text: r.note_text }));
}

function fetchStrongs(bookId: string, chapter: number, vStart: number, vEnd: number) {
  const rows = db
    .prepare(
      `SELECT svm.verse, svm.strongs_number, svm.translated_word, svm.word_position,
              se.word, se.transliteration, se.short_definition
       FROM strongs_verse_map svm
       LEFT JOIN strongs_entries se ON se.number = svm.strongs_number
       WHERE svm.book_id = ? AND svm.chapter = ? AND svm.verse BETWEEN ? AND ?
       ORDER BY svm.verse, svm.word_position`
    )
    .all(bookId, chapter, vStart, vEnd) as Array<{
    verse: number;
    strongs_number: string;
    translated_word: string | null;
    word_position: number | null;
    word: string | null;
    transliteration: string | null;
    short_definition: string | null;
  }>;
  return rows.map((r) => ({
    verse: r.verse,
    position: r.word_position,
    strongs: r.strongs_number,
    translated: r.translated_word,
    original: r.word,
    transliteration: r.transliteration,
    gloss: r.short_definition,
  }));
}

function fetchCrossRefs(bookId: string, chapter: number, vStart: number, vEnd: number) {
  const rows = db
    .prepare(
      `SELECT cr.target_book, cr.target_chapter, cr.target_verse, cr.target_end_verse, cr.score,
              cr.ref_type, v.text AS target_text
       FROM cross_references cr
       LEFT JOIN verses v
         ON v.translation_id = 'BSB' AND v.book_id = cr.target_book
         AND v.chapter = cr.target_chapter AND v.verse = cr.target_verse
       WHERE cr.source_book = ? AND cr.source_chapter = ? AND cr.source_verse BETWEEN ? AND ?
       ORDER BY cr.score DESC NULLS LAST
       LIMIT 30`
    )
    .all(bookId, chapter, vStart, vEnd) as Array<{
    target_book: string;
    target_chapter: number;
    target_verse: number;
    target_end_verse: number | null;
    score: number | null;
    ref_type: string;
    target_text: string | null;
  }>;
  return rows.map((r) => ({
    target: {
      bookId: r.target_book,
      chapter: r.target_chapter,
      verseStart: r.target_verse,
      verseEnd: r.target_end_verse,
    },
    score: r.score,
    refType: r.ref_type,
    snippet: r.target_text,
  }));
}

function fetchPassageThemes(bookId: string, chapter: number, vStart: number, vEnd: number) {
  const rows = db
    .prepare(
      `SELECT pt.id, pt.theme_id, pt.verse_start, pt.verse_end, pt.relevance, pt.context_note, pt.source_tier,
              t.name, t.category, t.definition
       FROM passage_themes pt
       JOIN themes t ON t.id = pt.theme_id
       WHERE pt.book_id = ? AND pt.chapter = ?
         AND pt.verse_start <= ?
         AND COALESCE(pt.verse_end, pt.verse_start) >= ?
       ORDER BY pt.relevance, t.name`
    )
    .all(bookId, chapter, vEnd, vStart) as Array<{
    id: number;
    theme_id: string;
    verse_start: number;
    verse_end: number | null;
    relevance: string;
    context_note: string | null;
    source_tier: string;
    name: string;
    category: string | null;
    definition: string | null;
  }>;
  return rows.map((r) => ({
    tagId: r.id,
    themeId: r.theme_id,
    name: r.name,
    category: r.category,
    relevance: r.relevance,
    verseStart: r.verse_start,
    verseEnd: r.verse_end,
    contextNote: r.context_note,
    sourceTier: r.source_tier,
    definition: r.definition,
  }));
}

function fetchCharacterAppearances(bookId: string, chapter: number, vStart: number, vEnd: number) {
  const rows = db
    .prepare(
      `SELECT ca.character_id, ca.verse_start, ca.verse_end, ca.role, ca.emotional_state,
              ca.motivation, ca.narrative_note, ca.source_tier,
              c.name, c.bio_brief, c.era
       FROM character_appearances ca
       JOIN characters c ON c.id = ca.character_id
       WHERE ca.book_id = ? AND ca.chapter = ?
         AND ca.verse_start <= ?
         AND COALESCE(ca.verse_end, ca.verse_start) >= ?
       ORDER BY c.name`
    )
    .all(bookId, chapter, vEnd, vStart) as Array<{
    character_id: string;
    verse_start: number;
    verse_end: number | null;
    role: string;
    emotional_state: string | null;
    motivation: string | null;
    narrative_note: string | null;
    source_tier: string;
    name: string;
    bio_brief: string | null;
    era: string | null;
  }>;
  return rows.map((r) => ({
    characterId: r.character_id,
    name: r.name,
    era: r.era,
    verseStart: r.verse_start,
    verseEnd: r.verse_end,
    role: r.role,
    emotionalState: r.emotional_state,
    motivation: r.motivation,
    narrativeNote: r.narrative_note,
    sourceTier: r.source_tier,
    bioBrief: r.bio_brief,
  }));
}

function fetchCommentary(bookId: string, chapter: number, vStart: number, vEnd: number, sourceIds?: string[]) {
  const params: unknown[] = [bookId, chapter, vStart, vEnd];
  let sql = `SELECT ce.id, ce.source_id, ce.verse, ce.text, ce.is_introduction,
                    cs.name AS source_name, cs.tradition
             FROM commentary_entries ce
             JOIN commentary_sources cs ON cs.id = ce.source_id
             WHERE ce.book_id = ? AND ce.chapter = ?
               AND (ce.verse IS NULL OR ce.verse BETWEEN ? AND ?)`;
  if (sourceIds && sourceIds.length > 0) {
    sql += ` AND ce.source_id IN (${sourceIds.map(() => "?").join(",")})`;
    for (const id of sourceIds) params.push(id);
  }
  sql += ` ORDER BY ce.verse NULLS FIRST, cs.name`;
  const rows = db.prepare(sql).all(...params) as Array<{
    id: number;
    source_id: string;
    verse: number | null;
    text: string;
    is_introduction: number;
    source_name: string;
    tradition: string | null;
  }>;
  return rows.map((r) => ({
    id: r.id,
    sourceId: r.source_id,
    sourceName: r.source_name,
    tradition: r.tradition,
    verse: r.verse,
    isIntroduction: !!r.is_introduction,
    text: r.text,
  }));
}

function fetchDevotionals(bookId: string, chapter: number, vStart: number, vEnd: number) {
  const rows = db
    .prepare(
      `SELECT id, title, verse_start, verse_end, context_brief, modern_moment,
              conversation_starters, going_deeper, audience, source_tier
       FROM devotionals
       WHERE book_id = ? AND chapter = ?
         AND verse_start <= ? AND COALESCE(verse_end, verse_start) >= ?
       ORDER BY title`
    )
    .all(bookId, chapter, vEnd, vStart) as Array<{
    id: string;
    title: string;
    verse_start: number;
    verse_end: number | null;
    context_brief: string;
    modern_moment: string;
    conversation_starters: string;
    going_deeper: string | null;
    audience: string;
    source_tier: string;
  }>;
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    verseStart: r.verse_start,
    verseEnd: r.verse_end,
    audience: r.audience,
    sourceTier: r.source_tier,
    contextBrief: r.context_brief,
    modernMoment: r.modern_moment,
    conversationStarters: r.conversation_starters,
    goingDeeper: r.going_deeper,
  }));
}

function fetchNarrativeUnit(bookId: string, chapter: number, vStart: number) {
  const rows = db
    .prepare(
      `SELECT id, title, chapter_start, verse_start, chapter_end, verse_end,
              summary, significance, modern_parallel, source_tier
       FROM narrative_units
       WHERE book_id = ?
         AND (chapter_start < ?
              OR (chapter_start = ? AND verse_start <= ?))
         AND (chapter_end IS NULL
              OR chapter_end > ?
              OR (chapter_end = ? AND COALESCE(verse_end, 999) >= ?))
       ORDER BY chapter_start, verse_start`
    )
    .all(bookId, chapter, chapter, vStart, chapter, chapter, vStart) as Array<{
    id: string;
    title: string;
    chapter_start: number;
    verse_start: number;
    chapter_end: number | null;
    verse_end: number | null;
    summary: string | null;
    significance: string | null;
    modern_parallel: string | null;
    source_tier: string;
  }>;
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    span: {
      chapterStart: r.chapter_start,
      verseStart: r.verse_start,
      chapterEnd: r.chapter_end,
      verseEnd: r.verse_end,
    },
    summary: r.summary,
    significance: r.significance,
    modernParallel: r.modern_parallel,
    sourceTier: r.source_tier,
  }));
}

function fetchParallelTranslations(bookId: string, chapter: number, vStart: number, vEnd: number, translations: string[]) {
  const results: Record<string, Array<{ verse: number; text: string }>> = {};
  for (const tid of translations) {
    if (tid === BSB) continue;
    const rows = db
      .prepare(
        `SELECT verse, text FROM verses
         WHERE translation_id = ? AND book_id = ? AND chapter = ? AND verse BETWEEN ? AND ?
         ORDER BY verse`
      )
      .all(tid, bookId, chapter, vStart, vEnd) as Array<{ verse: number; text: string }>;
    if (rows.length > 0) results[tid] = rows;
  }
  return results;
}
