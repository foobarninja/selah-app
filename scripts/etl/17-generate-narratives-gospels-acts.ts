// 17-generate-narratives-gospels-acts.ts — Insert pre-baked Layer 2D narrative units for Gospels + Acts
import { db, heading, log } from './db'
import type { NarrativeUnitRecord } from './data/narrative-types'

import { narrativesMatthew } from './data/narratives-matthew'
import { narrativesMark } from './data/narratives-mark'
import { narrativesLuke } from './data/narratives-luke'
import { narrativesJohn } from './data/narratives-john'
import { narrativesActs } from './data/narratives-acts'

const ALL_NARRATIVES: NarrativeUnitRecord[] = [
  ...narrativesMatthew,
  ...narrativesMark,
  ...narrativesLuke,
  ...narrativesJohn,
  ...narrativesActs,
]

function main(): void {
  heading('Importing Layer 2D — Narrative Units (Gospels + Acts)')
  log(`${ALL_NARRATIVES.length} narrative units to insert`)

  const insert = db.prepare(`
    INSERT OR REPLACE INTO narrative_units (
      id, title, book_id, chapter_start, verse_start, chapter_end, verse_end,
      summary, significance, relational_note, conceptual_note, climate_note,
      modern_parallel, key_questions, preaching_angles,
      source_tier, source_notes
    ) VALUES (
      @id, @title, @bookId, @chapterStart, @verseStart, @chapterEnd, @verseEnd,
      @summary, @significance, @relationalNote, @conceptualNote, @climateNote,
      @modernParallel, @keyQuestions, @preachingAngles,
      @sourceTier, @sourceNotes
    )
  `)

  const batchInsert = db.transaction((units: NarrativeUnitRecord[]) => {
    for (const u of units) {
      insert.run(u)
    }
  })

  const ids = ALL_NARRATIVES.map(u => u.id)
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
  if (dupes.length > 0) {
    log(`⚠ Duplicate IDs found: ${dupes.join(', ')}`)
    log('Aborting.')
    db.close()
    process.exit(1)
  }

  batchInsert(ALL_NARRATIVES)

  const count = (db.prepare('SELECT COUNT(*) as c FROM narrative_units').get() as { c: number }).c
  log(`✓ ${count} narrative units now in database`)

  const byBook = db.prepare(`SELECT book_id, COUNT(*) as c FROM narrative_units
    WHERE book_id IN ('MAT','MRK','LUK','JHN','ACT')
    GROUP BY book_id ORDER BY MIN(rowid)`).all() as { book_id: string; c: number }[]
  for (const row of byBook) {
    log(`  ${row.book_id}: ${row.c}`)
  }

  db.close()
}

main()
