import Database from 'better-sqlite3'
import { BOOK_NAMES } from '@/lib/constants'
import { parseSearchQuery, type ParsedSearchQuery } from './parser'

// FTS5 queries require raw SQLite (Prisma doesn't support virtual tables)
function getDb() {
  const dbUrl = process.env.DATABASE_URL ?? 'file:./data/selah.db'
  const dbPath = dbUrl.replace('file:', '')
  return new Database(dbPath, { readonly: true })
}

export interface SearchResults {
  verses: Array<{ id: number; bookId: string; chapter: number; verse: number; text: string; bookName: string }>
  characters: Array<{ id: string; name: string; bioBrief: string }>
  themes: Array<{ id: string; name: string; definition: string }>
  strongs: Array<{ number: string; word: string; transliteration: string; shortDefinition: string }>
  narratives: Array<{ id: string; title: string; summary: string; bookId: string }>
}

export async function universalSearch(query: string, limit = 10): Promise<SearchResults> {
  if (!query || query.trim().length < 2) {
    return { verses: [], characters: [], themes: [], strongs: [], narratives: [] }
  }

  const parsed = parseSearchQuery(query)

  // Need at least one positive term for any search to make sense
  if (parsed.positiveTerms.length === 0) {
    return { verses: [], characters: [], themes: [], strongs: [], narratives: [] }
  }

  const db = getDb()

  try {
    // ── Verses: FTS5 boolean query, fall back to LIKE on first positive term ──
    let rawVerses: Array<{ id: number; book_id: string; chapter: number; verse: number; text: string }> = []
    if (parsed.ftsExpression) {
      try {
        rawVerses = db.prepare(`
          SELECT v.id, v.book_id, v.chapter, v.verse, v.text
          FROM verses_fts f
          JOIN verses v ON v.id = f.rowid
          WHERE verses_fts MATCH ? AND v.translation_id = 'BSB'
          ORDER BY rank
          LIMIT ?
        `).all(parsed.ftsExpression, limit) as typeof rawVerses
      } catch {
        rawVerses = fallbackVerseLike(db, parsed, limit)
      }
    } else {
      rawVerses = fallbackVerseLike(db, parsed, limit)
    }

    // ── Characters: OR across positive terms, exclude negatives ──
    const rawCharacters = searchEntities<{ id: string; name: string; bio_brief: string }>(
      db,
      'SELECT id, name, bio_brief FROM characters',
      parsed,
      ['name'],
      'name',
      limit,
    )

    // ── Themes: LIKE on name and definition ──
    const rawThemes = searchEntities<{ id: string; name: string; definition: string }>(
      db,
      'SELECT id, name, definition FROM themes',
      parsed,
      ['name', 'definition'],
      'name',
      limit,
    )

    // ── Strong's: LIKE on word, transliteration, short_definition, number ──
    const rawStrongs = searchEntities<{ number: string; word: string; transliteration: string; short_definition: string }>(
      db,
      'SELECT number, word, transliteration, short_definition FROM strongs_entries',
      parsed,
      ['word', 'transliteration', 'short_definition', 'number'],
      'number',
      limit,
    )

    // ── Narrative units: FTS5 boolean, fall back to LIKE ──
    let rawNarratives: Array<{ id: string; title: string; summary: string; book_id: string }> = []
    if (parsed.ftsExpression) {
      try {
        rawNarratives = db.prepare(`
          SELECT n.id, n.title, n.summary, n.book_id
          FROM narrative_fts f
          JOIN narrative_units n ON n.rowid = f.rowid
          WHERE narrative_fts MATCH ?
          ORDER BY rank
          LIMIT ?
        `).all(parsed.ftsExpression, limit) as typeof rawNarratives
      } catch {
        rawNarratives = fallbackNarrativeLike(db, parsed, limit)
      }
    } else {
      rawNarratives = fallbackNarrativeLike(db, parsed, limit)
    }

    return {
      verses: rawVerses.map((v) => ({
        id: v.id,
        bookId: v.book_id,
        chapter: v.chapter,
        verse: v.verse,
        text: v.text,
        bookName: BOOK_NAMES[v.book_id] ?? v.book_id,
      })),
      characters: rawCharacters.map((c) => ({
        id: c.id,
        name: c.name,
        bioBrief: c.bio_brief ?? '',
      })),
      themes: rawThemes.map((t) => ({
        id: t.id,
        name: t.name,
        definition: t.definition ?? '',
      })),
      strongs: rawStrongs.map((s) => ({
        number: s.number,
        word: s.word,
        transliteration: s.transliteration ?? '',
        shortDefinition: s.short_definition ?? '',
      })),
      narratives: rawNarratives.map((n) => ({
        id: n.id,
        title: n.title,
        summary: n.summary ?? '',
        bookId: n.book_id,
      })),
    }
  } finally {
    db.close()
  }
}

/**
 * LIKE-based entity search: OR across (column × positive term) combinations,
 * then exclude rows matching any negative term in any searched column.
 *
 * Column names are hardcoded by callers (no user input), so the string-
 * concatenated SQL is safe from injection.
 */
function searchEntities<T>(
  db: Database.Database,
  baseSelect: string,
  parsed: ParsedSearchQuery,
  searchColumns: string[],
  orderByColumn: string,
  limit: number,
): T[] {
  const { positiveTerms, negativeTerms } = parsed
  if (positiveTerms.length === 0) return []

  const posClauses: string[] = []
  const posParams: string[] = []
  for (const term of positiveTerms) {
    for (const col of searchColumns) {
      posClauses.push(`${col} LIKE ?`)
      posParams.push(`%${term}%`)
    }
  }

  const negClauses: string[] = []
  const negParams: string[] = []
  for (const term of negativeTerms) {
    for (const col of searchColumns) {
      negClauses.push(`${col} NOT LIKE ?`)
      negParams.push(`%${term}%`)
    }
  }

  let where = `(${posClauses.join(' OR ')})`
  if (negClauses.length > 0) {
    where += ` AND (${negClauses.join(' AND ')})`
  }

  const sql = `${baseSelect} WHERE ${where} ORDER BY ${orderByColumn} LIMIT ?`
  try {
    return db.prepare(sql).all(...posParams, ...negParams, limit) as T[]
  } catch {
    return []
  }
}

function fallbackVerseLike(
  db: Database.Database,
  parsed: ParsedSearchQuery,
  limit: number,
): Array<{ id: number; book_id: string; chapter: number; verse: number; text: string }> {
  if (parsed.positiveTerms.length === 0) return []
  const likeClauses = parsed.positiveTerms.map(() => 'text LIKE ?').join(' AND ')
  try {
    return db.prepare(
      `SELECT id, book_id, chapter, verse, text FROM verses
       WHERE translation_id = 'BSB' AND (${likeClauses})
       LIMIT ?`,
    ).all(...parsed.positiveTerms.map((t) => `%${t}%`), limit) as Array<{ id: number; book_id: string; chapter: number; verse: number; text: string }>
  } catch {
    return []
  }
}

function fallbackNarrativeLike(
  db: Database.Database,
  parsed: ParsedSearchQuery,
  limit: number,
): Array<{ id: string; title: string; summary: string; book_id: string }> {
  if (parsed.positiveTerms.length === 0) return []
  const perTerm = parsed.positiveTerms
    .map(() => '(title LIKE ? OR summary LIKE ?)')
    .join(' AND ')
  const params = parsed.positiveTerms.flatMap((t) => [`%${t}%`, `%${t}%`])
  try {
    return db.prepare(
      `SELECT id, title, summary, book_id FROM narrative_units
       WHERE ${perTerm}
       LIMIT ?`,
    ).all(...params, limit) as Array<{ id: string; title: string; summary: string; book_id: string }>
  } catch {
    return []
  }
}
