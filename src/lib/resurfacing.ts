import Database from 'better-sqlite3'
import { BOOK_NAMES } from '@/lib/constants'
import type { ResurfacedEntry, MatchChannel, NoteType, JournalAnchor } from '@/components/reader/types'

function getDb() {
  const dbUrl = process.env.DATABASE_URL ?? 'file:./data/selah.db'
  return new Database(dbUrl.replace('file:', ''), { readonly: true })
}

/**
 * Five-channel resurfacing engine.
 * Surfaces past user notes that are relevant to the current passage.
 */
export async function surfaceNotes(
  bookId: string,
  chapter: number,
  verseStart: number,
  verseEnd: number,
  limit = 5,
): Promise<ResurfacedEntry[]> {
  const db = getDb()
  const results = new Map<number, { entry: ResurfacedEntry; score: number }>()

  try {
    // Channel 1: Direct verse anchor match
    const directMatches = db.prepare(`
      SELECT n.id, n.content, n.note_type, n.created_at,
             a.anchor_type, a.book_id, a.chapter, a.verse_start, a.ref_id
      FROM user_notes n
      JOIN user_note_anchors a ON a.note_id = n.id
      WHERE a.anchor_type = 'verse' AND a.book_id = ? AND a.chapter = ?
        AND a.verse_start >= ? AND a.verse_start <= ?
      LIMIT 10
    `).all(bookId, chapter, verseStart, verseEnd) as NoteRow[]

    for (const row of directMatches) {
      addResult(results, row, 'direct-anchor', 1.0)
    }

    // Channel 2: Theme overlap
    const themeMatches = db.prepare(`
      SELECT DISTINCT n.id, n.content, n.note_type, n.created_at
      FROM user_notes n
      JOIN user_note_themes nt ON nt.note_id = n.id
      JOIN passage_themes pt ON pt.theme_id = nt.theme_id
      WHERE pt.book_id = ? AND pt.chapter = ?
        AND pt.verse_start <= ? AND (pt.verse_end >= ? OR pt.verse_end IS NULL)
      LIMIT 10
    `).all(bookId, chapter, verseEnd, verseStart) as NoteRow[]

    for (const row of themeMatches) {
      if (!results.has(row.id)) {
        addResult(results, row, 'theme-overlap', 0.7)
      }
    }

    // Channel 3: Character overlap
    const charMatches = db.prepare(`
      SELECT DISTINCT n.id, n.content, n.note_type, n.created_at
      FROM user_notes n
      JOIN user_note_anchors a ON a.note_id = n.id
      JOIN character_appearances ca ON ca.character_id = a.ref_id
      WHERE a.anchor_type = 'character'
        AND ca.book_id = ? AND ca.chapter = ?
        AND ca.verse_start <= ? AND (ca.verse_end >= ? OR ca.verse_end IS NULL)
      LIMIT 10
    `).all(bookId, chapter, verseEnd, verseStart) as NoteRow[]

    for (const row of charMatches) {
      if (!results.has(row.id)) {
        addResult(results, row, 'character-overlap', 0.6)
      }
    }

    // Channel 4: Cross-reference chain
    const xrefMatches = db.prepare(`
      SELECT DISTINCT n.id, n.content, n.note_type, n.created_at
      FROM user_notes n
      JOIN user_note_anchors a ON a.note_id = n.id
      JOIN cross_references cr ON cr.target_book = a.book_id
        AND cr.target_chapter = a.chapter AND cr.target_verse = a.verse_start
      WHERE a.anchor_type = 'verse'
        AND cr.source_book = ? AND cr.source_chapter = ?
        AND cr.source_verse >= ? AND cr.source_verse <= ?
      LIMIT 10
    `).all(bookId, chapter, verseStart, verseEnd) as NoteRow[]

    for (const row of xrefMatches) {
      if (!results.has(row.id)) {
        addResult(results, row, 'cross-reference-chain', 0.5)
      }
    }

    // Channel 5: FTS resonance (if user_notes_fts exists)
    try {
      // Get key terms from the passage
      const verseText = db.prepare(`
        SELECT text FROM verses
        WHERE translation_id = 'BSB' AND book_id = ? AND chapter = ? AND verse = ?
      `).get(bookId, chapter, verseStart) as { text: string } | undefined

      if (verseText) {
        const keywords = extractKeywords(verseText.text)
        if (keywords) {
          const ftsMatches = db.prepare(`
            SELECT n.id, n.content, n.note_type, n.created_at
            FROM user_notes_fts f
            JOIN user_notes n ON n.id = f.rowid
            WHERE user_notes_fts MATCH ?
            LIMIT 5
          `).all(keywords) as NoteRow[]

          for (const row of ftsMatches) {
            if (!results.has(row.id)) {
              addResult(results, row, 'full-text-resonance', 0.3)
            }
          }
        }
      }
    } catch {
      // user_notes_fts may not exist yet
    }
  } finally {
    db.close()
  }

  return Array.from(results.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry)
}

interface NoteRow {
  id: number
  content: string
  note_type: string
  created_at: string
  anchor_type?: string
  book_id?: string
  chapter?: number
  verse_start?: number
  ref_id?: string
}

function addResult(
  results: Map<number, { entry: ResurfacedEntry; score: number }>,
  row: NoteRow,
  channel: MatchChannel,
  score: number,
) {
  const anchors: JournalAnchor[] = []
  if (row.book_id) {
    const bookName = BOOK_NAMES[row.book_id] ?? row.book_id
    anchors.push({ type: 'verse', ref: `${bookName} ${row.chapter}:${row.verse_start}` })
  }
  if (row.ref_id) {
    anchors.push({ type: (row.anchor_type === 'character' ? 'character' : 'theme') as 'character' | 'theme', ref: row.ref_id })
  }

  results.set(row.id, {
    entry: {
      id: String(row.id),
      noteType: row.note_type as NoteType,
      content: row.content.substring(0, 200),
      anchors,
      tags: [],
      createdAt: row.created_at,
      matchChannel: channel,
      matchScore: score,
    },
    score,
  })
}

function extractKeywords(text: string): string {
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'was', 'are', 'were', 'be', 'been', 'has', 'had', 'do', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'shall', 'can', 'this', 'that', 'these', 'those', 'it', 'its', 'his', 'her', 'he', 'she', 'they', 'them', 'their', 'we', 'our', 'you', 'your', 'i', 'me', 'my', 'not', 'no', 'from', 'into', 'him', 'who', 'whom', 'which', 'what', 'how', 'when', 'where', 'why', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'than', 'too', 'very', 'just', 'also', 'now', 'then', 'so', 'if', 'as', 'out', 'up', 'about', 'over', 'after', 'before', 'between', 'under', 'again', 'there', 'here', 'said'])
  const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/)
    .filter((w) => w.length > 3 && !stopWords.has(w))
    .slice(0, 5)
  return words.join(' ')
}
