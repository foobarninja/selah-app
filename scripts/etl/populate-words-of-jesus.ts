/**
 * Populate words_of_jesus column using HelloAO KJV API data.
 *
 * The KJV translation in the HelloAO API includes per-verse `wordsOfJesus: true`
 * markers. Since red-letter verse ranges are identical across translations (same
 * biblical events), we import from KJV and apply to all translations.
 *
 * Source: https://bible.helloao.org/api/eng_kjv/{book}/{chapter}.json
 */

import Database from 'better-sqlite3'
import path from 'path'

const DB_PATH = path.resolve(__dirname, '../../data/selah.db')
const API_BASE = 'https://bible.helloao.org/api/eng_kjv'

// Books that contain Jesus's direct speech
const BOOKS_WITH_JESUS_WORDS: Array<{ id: string; apiId: string; chapters: number }> = [
  { id: 'MAT', apiId: 'MAT', chapters: 28 },
  { id: 'MRK', apiId: 'MRK', chapters: 16 },
  { id: 'LUK', apiId: 'LUK', chapters: 24 },
  { id: 'JHN', apiId: 'JHN', chapters: 21 },
  { id: 'ACT', apiId: 'ACT', chapters: 28 },
  { id: 'REV', apiId: 'REV', chapters: 22 },
]

interface ApiVerse {
  type: string
  number?: number
  content?: Array<string | { text: string; wordsOfJesus?: boolean; poem?: number }>
}

interface ApiResponse {
  chapter: {
    number: number
    content: ApiVerse[]
  }
}

async function fetchChapter(bookApiId: string, chapter: number): Promise<Map<number, boolean>> {
  const url = `${API_BASE}/${bookApiId}/${chapter}.json`
  const resp = await fetch(url)
  if (!resp.ok) {
    console.error(`  Failed to fetch ${url}: ${resp.status}`)
    return new Map()
  }

  const data: ApiResponse = await resp.json()
  const result = new Map<number, boolean>()

  for (const item of data.chapter.content) {
    if (item.type !== 'verse' || !item.number || !item.content) continue

    let hasWoJ = false
    for (const part of item.content) {
      if (typeof part === 'object' && part !== null && 'wordsOfJesus' in part && part.wordsOfJesus) {
        hasWoJ = true
        break
      }
    }

    if (hasWoJ) {
      result.set(item.number, true)
    }
  }

  return result
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  const db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')

  // Reset
  db.prepare('UPDATE verses SET words_of_jesus = 0').run()
  console.log('Reset all words_of_jesus to 0\n')

  const markStmt = db.prepare(
    `UPDATE verses SET words_of_jesus = 1
     WHERE book_id = ? AND chapter = ? AND verse = ?`
  )

  const markMany = db.transaction((rows: Array<{ bookId: string; chapter: number; verse: number }>) => {
    for (const r of rows) {
      markStmt.run(r.bookId, r.chapter, r.verse)
    }
  })

  let totalMarked = 0

  for (const book of BOOKS_WITH_JESUS_WORDS) {
    let bookCount = 0
    console.log(`Processing ${book.id} (${book.chapters} chapters)...`)

    for (let ch = 1; ch <= book.chapters; ch++) {
      const wojVerses = await fetchChapter(book.apiId, ch)

      if (wojVerses.size > 0) {
        const rows = Array.from(wojVerses.keys()).map((verse) => ({
          bookId: book.id,
          chapter: ch,
          verse,
        }))
        markMany(rows)
        bookCount += wojVerses.size
      }

      // Rate-limit: ~50ms between requests
      await sleep(50)
    }

    totalMarked += bookCount
    console.log(`  ${book.id}: ${bookCount} verses marked`)
  }

  console.log(`\nTotal verses marked: ${totalMarked}`)

  // Verify
  const count = db
    .prepare('SELECT COUNT(*) as cnt FROM verses WHERE words_of_jesus = 1')
    .get() as { cnt: number }
  console.log(`Database total words_of_jesus = 1: ${count.cnt} (across all translations)`)

  // Spot checks
  const checks = [
    { book: 'MAT', ch: 5, v: 3, expect: true, label: 'Beatitudes' },
    { book: 'MAT', ch: 5, v: 1, expect: false, label: 'Narrative' },
    { book: 'JHN', ch: 3, v: 3, expect: true, label: 'Born again' },
    { book: 'JHN', ch: 3, v: 4, expect: false, label: 'Nicodemus' },
    { book: 'JHN', ch: 4, v: 7, expect: true, label: 'Give Me a drink' },
    { book: 'JHN', ch: 4, v: 9, expect: false, label: 'Woman speaks' },
    { book: 'JHN', ch: 14, v: 6, expect: true, label: 'I am the way' },
    { book: 'REV', ch: 2, v: 1, expect: true, label: 'Letter to Ephesus' },
    { book: 'MRK', ch: 1, v: 1, expect: false, label: 'Mark intro' },
  ]

  console.log('\nSpot checks:')
  for (const c of checks) {
    const row = db
      .prepare(
        "SELECT words_of_jesus FROM verses WHERE translation_id = 'BSB' AND book_id = ? AND chapter = ? AND verse = ?"
      )
      .get(c.book, c.ch, c.v) as { words_of_jesus: number } | undefined
    const actual = row?.words_of_jesus === 1
    const status = actual === c.expect ? 'PASS' : 'FAIL'
    console.log(`  ${status}: ${c.book} ${c.ch}:${c.v} — ${c.label} (expected=${c.expect}, got=${actual})`)
  }

  db.close()
  console.log('\nDone.')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
