// 04b-fetch-commentary-entries.ts — Fetch commentary text from HelloAO API
// This is a long-running script that fetches all commentary entries verse-by-verse.
// Usage: npx tsx scripts/etl/04b-fetch-commentary-entries.ts [--source <id>]
//
// The HelloAO API pattern:
//   GET https://bible.helloao.org/api/c/{sourceId}/books.json  → list of books
//   GET https://bible.helloao.org/api/c/{sourceId}/{bookId}/{chapter}.json → chapter content
//
// Each chapter response has: { chapter: { content: [ { type: "verse", number: N, content: [string] } ] } }
// Some commentaries group verses (e.g., verse 1 covers 1-3), others are per-verse.

import { db, heading, log } from './db'

const API_BASE = 'https://bible.helloao.org/api/c'
const RATE_LIMIT_MS = 100 // be polite to the API

interface BookEntry {
  id: string
  name: string
  numberOfChapters: number
}

interface VerseEntry {
  type: string
  number: number
  content: string[]
}

interface ChapterResponse {
  chapter: {
    number: number
    content: VerseEntry[]
    introduction?: string
  }
  numberOfVerses: number
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      log(`  ⚠ HTTP ${res.status} for ${url}`)
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    log(`  ⚠ Fetch error for ${url}: ${(err as Error).message}`)
    return null
  }
}

async function fetchSource(sourceId: string): Promise<number> {
  log(`Fetching books list for ${sourceId}...`)
  const booksData = await fetchJSON<{ books: BookEntry[] }>(`${API_BASE}/${sourceId}/books.json`)
  if (!booksData || !booksData.books) {
    log(`  ⚠ Could not fetch books for ${sourceId}`)
    return 0
  }

  const books = booksData.books
  log(`  ${books.length} books available`)

  const insert = db.prepare(`
    INSERT OR REPLACE INTO commentary_entries (source_id, book_id, chapter, verse, text, is_introduction)
    VALUES (@sourceId, @bookId, @chapter, @verse, @text, @isIntroduction)
  `)

  const insertBatch = db.transaction((entries: {
    sourceId: string; bookId: string; chapter: number; verse: number | null;
    text: string; isIntroduction: number
  }[]) => {
    for (const e of entries) {
      insert.run(e)
    }
  })

  let totalEntries = 0

  for (const book of books) {
    // Check if this book exists in our books table
    const bookExists = db.prepare('SELECT id FROM books WHERE id = ?').get(book.id)
    if (!bookExists) {
      // Try common ID mappings
      continue
    }

    for (let ch = 1; ch <= book.numberOfChapters; ch++) {
      await sleep(RATE_LIMIT_MS)

      const chData = await fetchJSON<ChapterResponse>(`${API_BASE}/${sourceId}/${book.id}/${ch}.json`)
      if (!chData || !chData.chapter) continue

      const entries: {
        sourceId: string; bookId: string; chapter: number; verse: number | null;
        text: string; isIntroduction: number
      }[] = []

      // Book/chapter introduction
      if (chData.chapter.introduction && ch === 1) {
        entries.push({
          sourceId,
          bookId: book.id,
          chapter: ch,
          verse: null,
          text: chData.chapter.introduction,
          isIntroduction: 1,
        })
      }

      // Verse entries
      if (chData.chapter.content) {
        for (const v of chData.chapter.content) {
          if (v.type === 'verse' && v.content) {
            const text = Array.isArray(v.content) ? v.content.join('\n\n') : String(v.content)
            if (text.trim()) {
              entries.push({
                sourceId,
                bookId: book.id,
                chapter: ch,
                verse: v.number,
                text,
                isIntroduction: 0,
              })
            }
          }
        }
      }

      if (entries.length > 0) {
        insertBatch(entries)
        totalEntries += entries.length
      }
    }

    const bookCount = (db.prepare(
      'SELECT COUNT(*) as c FROM commentary_entries WHERE source_id = ? AND book_id = ?'
    ).get(sourceId, book.id) as { c: number }).c
    log(`  ${book.id}: ${bookCount} entries`)
  }

  return totalEntries
}

async function main(): Promise<void> {
  heading('Fetching Commentary Entries from HelloAO API')

  // Parse --source flag
  const sourceArg = process.argv.find((_, i) => process.argv[i - 1] === '--source')

  // Get source list from available_commentaries.json or from DB
  const sources = db.prepare('SELECT id, name FROM commentary_sources').all() as { id: string; name: string }[]

  if (sources.length === 0) {
    log('No commentary sources in database. Run 04-import-commentaries.ts first.')
    db.close()
    return
  }

  const toFetch = sourceArg ? sources.filter(s => s.id === sourceArg) : sources

  log(`${toFetch.length} sources to fetch:`)
  for (const s of toFetch) log(`  - ${s.id} (${s.name})`)

  for (const source of toFetch) {
    log(`\n─── ${source.name} ───`)

    // Check if already populated
    const existing = (db.prepare(
      'SELECT COUNT(*) as c FROM commentary_entries WHERE source_id = ?'
    ).get(source.id) as { c: number }).c

    if (existing > 0 && !sourceArg) {
      log(`  Already has ${existing} entries, skipping. Use --source ${source.id} to re-fetch.`)
      continue
    }

    const count = await fetchSource(source.id)
    log(`  ✓ ${count} entries imported for ${source.id}`)
  }

  const totalCount = (db.prepare('SELECT COUNT(*) as c FROM commentary_entries').get() as { c: number }).c
  log(`\n✓ ${totalCount} total commentary entries in database`)

  // Summary by source
  const bySource = db.prepare(
    'SELECT source_id, COUNT(*) as c FROM commentary_entries GROUP BY source_id ORDER BY c DESC'
  ).all() as { source_id: string; c: number }[]
  for (const row of bySource) {
    log(`  ${row.source_id}: ${row.c}`)
  }

  db.close()
}

main().catch(err => {
  console.error(err)
  db.close()
  process.exit(1)
})
