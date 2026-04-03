// 01-import-translations.ts — Parse bible.eng.db (HelloAO format) into translations + verses
import Database from 'better-sqlite3'
import { readFileSync } from 'fs'
import { join } from 'path'
import { db, DATA_DIR, heading, log } from './db'

function main(): void {
  heading('Importing translations and verses')

  // 1. Import translation metadata from JSON
  const metaPath = join(DATA_DIR, 'available_translations.json')
  log(`Reading ${metaPath}`)
  const raw = JSON.parse(readFileSync(metaPath, 'utf-8'))
  const translations = raw.translations || raw

  const insertTrans = db.prepare(`
    INSERT OR IGNORE INTO translations (id, name, english_name, short_name, language, text_direction, website, license_url, license_notes, has_strongs, is_primary, sort_order)
    VALUES (@id, @name, @englishName, @shortName, @language, @textDirection, @website, @licenseUrl, @licenseNotes, @hasStrongs, @isPrimary, @sortOrder)
  `)

  let tCount = 0
  for (const t of translations) {
    insertTrans.run({
      id: t.id, name: t.name || t.id,
      englishName: t.englishName || t.english_name || t.name || t.id,
      shortName: t.shortName || t.short_name || t.id,
      language: t.language || 'eng', textDirection: t.textDirection || t.text_direction || 'ltr',
      website: t.website || null, licenseUrl: t.licenseUrl || t.license_url || null,
      licenseNotes: t.licenseNotes || t.license_notes || null,
      hasStrongs: 0, isPrimary: t.id === 'BSB' ? 1 : 0, sortOrder: tCount,
    })
    tCount++
  }
  log(`✓ ${tCount} translations imported`)

  // 2. Import verses from bible.eng.db
  // HelloAO schema: ChapterVerse(number, chapterNumber, bookId, translationId, text, ...)
  const sourceDb = new Database(join(DATA_DIR, 'bible.eng.db'), { readonly: true })

  const totalRows = (sourceDb.prepare('SELECT COUNT(*) as c FROM ChapterVerse').get() as { c: number }).c
  log(`Source: ${totalRows.toLocaleString()} verse rows in ChapterVerse`)

  const validBooks = new Set(
    (db.prepare('SELECT id FROM books').all() as { id: string }[]).map(b => b.id)
  )

  const insertVerse = db.prepare(`
    INSERT OR IGNORE INTO verses (translation_id, book_id, chapter, verse, text, words_of_jesus)
    VALUES (@translationId, @bookId, @chapter, @verse, @text, 0)
  `)

  const BATCH = 10000
  let offset = 0
  let imported = 0

  const batchInsert = db.transaction((rows: { translationId: string; bookId: string; chapter: number; verse: number; text: string }[]) => {
    for (const row of rows) insertVerse.run(row)
  })

  while (offset < totalRows) {
    const rows = sourceDb.prepare(`
      SELECT number, chapterNumber, bookId, translationId, text
      FROM ChapterVerse LIMIT ${BATCH} OFFSET ${offset}
    `).all() as { number: number; chapterNumber: number; bookId: string; translationId: string; text: string }[]

    if (rows.length === 0) break

    const batch = []
    for (const row of rows) {
      if (!validBooks.has(row.bookId) || !row.text) continue
      batch.push({
        translationId: row.translationId, bookId: row.bookId,
        chapter: row.chapterNumber, verse: row.number, text: row.text,
      })
    }

    if (batch.length > 0) { batchInsert(batch); imported += batch.length }
    offset += BATCH
    if (offset % 100000 === 0) log(`  ${offset.toLocaleString()} / ${totalRows.toLocaleString()} (${imported.toLocaleString()} imported)`)
  }

  sourceDb.close()
  const finalCount = (db.prepare('SELECT COUNT(*) as c FROM verses').get() as { c: number }).c
  log(`\n✓ ${finalCount.toLocaleString()} verses in Selah database`)
  db.close()
}

main()
