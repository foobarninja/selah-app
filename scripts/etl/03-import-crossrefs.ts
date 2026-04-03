// 03-import-crossrefs.ts — Import cross-references from HelloAO DatasetReference table
import { db, DATA_DIR, heading, log } from './db'
import { existsSync } from 'fs'
import { join } from 'path'
import Database from 'better-sqlite3'

function main(): void {
  heading('Importing cross-references')

  const dbPath = join(DATA_DIR, 'bible.eng.db')
  if (!existsSync(dbPath)) { log('bible.eng.db not found.'); db.close(); return }

  const sourceDb = new Database(dbPath, { readonly: true })
  const totalRows = (sourceDb.prepare('SELECT COUNT(*) as c FROM DatasetReference').get() as { c: number }).c
  log(`Source: ${totalRows.toLocaleString()} cross-references in DatasetReference`)

  const validBooks = new Set((db.prepare('SELECT id FROM books').all() as { id: string }[]).map(b => b.id))

  const insert = db.prepare(`
    INSERT OR IGNORE INTO cross_references (source_book, source_chapter, source_verse, target_book, target_chapter, target_verse, target_end_verse, score, ref_type)
    VALUES (@sb, @sc, @sv, @tb, @tc, @tv, @tev, @score, 'cross')
  `)

  const batchInsert = db.transaction((rows: Record<string, unknown>[]) => {
    for (const r of rows) insert.run(r)
  })

  const BATCH = 10000
  let offset = 0
  let imported = 0

  while (offset < totalRows) {
    const rows = sourceDb.prepare(`
      SELECT bookId, chapterNumber, verseNumber, referenceBookId, referenceChapter, referenceVerse, endVerseNumber, score
      FROM DatasetReference LIMIT ${BATCH} OFFSET ${offset}
    `).all() as Record<string, unknown>[]

    if (rows.length === 0) break

    const batch = []
    for (const row of rows) {
      const sb = String(row.bookId)
      const tb = String(row.referenceBookId)
      if (!validBooks.has(sb) || !validBooks.has(tb)) continue
      batch.push({
        sb, sc: Number(row.chapterNumber), sv: Number(row.verseNumber),
        tb, tc: Number(row.referenceChapter), tv: Number(row.referenceVerse),
        tev: row.endVerseNumber ? Number(row.endVerseNumber) : null,
        score: row.score ? Number(row.score) : null,
      })
    }

    if (batch.length > 0) { batchInsert(batch); imported += batch.length }
    offset += BATCH
    if (offset % 100000 === 0) log(`  ${offset.toLocaleString()} / ${totalRows.toLocaleString()}`)
  }

  sourceDb.close()
  const total = (db.prepare('SELECT COUNT(*) as c FROM cross_references').get() as { c: number }).c
  log(`\n✓ ${total.toLocaleString()} cross-references imported`)
  db.close()
}

main()
