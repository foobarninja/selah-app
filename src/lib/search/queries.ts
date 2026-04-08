import Database from 'better-sqlite3'
import { BOOK_NAMES } from '@/lib/constants'

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

  const db = getDb()
  const ftsQuery = sanitizeFtsQuery(query)
  const likeQuery = `%${query}%`

  try {
    // Verse search — try FTS first, fall back to LIKE
    let rawVerses: Array<{ id: number; book_id: string; chapter: number; verse: number; text: string }> = []
    try {
      rawVerses = db.prepare(`
        SELECT v.id, v.book_id, v.chapter, v.verse, v.text
        FROM verses_fts f
        JOIN verses v ON v.id = f.rowid
        WHERE verses_fts MATCH ? AND v.translation_id = 'BSB'
        ORDER BY rank
        LIMIT ?
      `).all(ftsQuery, limit) as typeof rawVerses
    } catch {
      rawVerses = db.prepare(`
        SELECT id, book_id, chapter, verse, text FROM verses
        WHERE translation_id = 'BSB' AND text LIKE ?
        LIMIT ?
      `).all(likeQuery, limit) as typeof rawVerses
    }

    // Character search — LIKE with name-priority
    let rawCharacters: Array<{ id: string; name: string; bio_brief: string }> = []
    try {
      rawCharacters = db.prepare(`
        SELECT id, name, bio_brief FROM characters
        WHERE name LIKE ?
        ORDER BY CASE WHEN LOWER(name) = LOWER(?) THEN 0 ELSE 1 END, name
        LIMIT ?
      `).all(likeQuery, query, limit) as typeof rawCharacters
    } catch { /* ignore */ }

    // Theme LIKE search
    let rawThemes: Array<{ id: string; name: string; definition: string }> = []
    try {
      rawThemes = db.prepare(`
        SELECT id, name, definition FROM themes
        WHERE name LIKE ? OR definition LIKE ?
        LIMIT ?
      `).all(likeQuery, likeQuery, limit) as typeof rawThemes
    } catch { /* ignore */ }

    // Strong's LIKE search
    let rawStrongs: Array<{ number: string; word: string; transliteration: string; short_definition: string }> = []
    try {
      rawStrongs = db.prepare(`
        SELECT number, word, transliteration, short_definition FROM strongs_entries
        WHERE short_definition LIKE ? OR transliteration LIKE ? OR word LIKE ? OR number = ?
        LIMIT ?
      `).all(likeQuery, likeQuery, likeQuery, query.toUpperCase(), limit) as typeof rawStrongs
    } catch { /* ignore */ }

    // Narrative search — try FTS first, fall back to LIKE
    let rawNarratives: Array<{ id: string; title: string; summary: string; book_id: string }> = []
    try {
      rawNarratives = db.prepare(`
        SELECT n.id, n.title, n.summary, n.book_id
        FROM narrative_fts f
        JOIN narrative_units n ON n.rowid = f.rowid
        WHERE narrative_fts MATCH ?
        ORDER BY rank
        LIMIT ?
      `).all(ftsQuery, limit) as typeof rawNarratives
    } catch {
      try {
        rawNarratives = db.prepare(`
          SELECT id, title, summary, book_id FROM narrative_units
          WHERE title LIKE ? OR summary LIKE ?
          LIMIT ?
        `).all(likeQuery, likeQuery, limit) as typeof rawNarratives
      } catch { /* ignore */ }
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

function sanitizeFtsQuery(query: string): string {
  // Remove FTS5 special characters, wrap in quotes for phrase search
  const cleaned = query.replace(/['"*()]/g, '').trim()
  if (cleaned.includes(' ')) {
    // Multi-word: use implicit AND
    return cleaned.split(/\s+/).filter(Boolean).join(' ')
  }
  return cleaned
}
