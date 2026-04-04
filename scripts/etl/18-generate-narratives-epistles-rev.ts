// 18-generate-narratives-epistles-rev.ts — Insert pre-baked Layer 2D narrative units for Epistles + Revelation
import { db, heading, log } from './db'
import type { NarrativeUnitRecord } from './data/narrative-types'

import { narrativesPaulineEarly } from './data/narratives-pauline-early'
import { narrativesPaulinePrison } from './data/narratives-pauline-prison'
import { narrativesPaulinePastoral } from './data/narratives-pauline-pastoral'
import { narrativesGeneralEpistles } from './data/narratives-general-epistles'
import { narrativesRevelation } from './data/narratives-revelation'

const ALL_NARRATIVES: NarrativeUnitRecord[] = [
  ...narrativesPaulineEarly,
  ...narrativesPaulinePrison,
  ...narrativesPaulinePastoral,
  ...narrativesGeneralEpistles,
  ...narrativesRevelation,
]

function main(): void {
  heading('Importing Layer 2D — Narrative Units (Epistles + Revelation)')
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
    WHERE book_id NOT IN ('GEN','EXO','LEV','NUM','DEU','JOS','JDG','RUT','1SA','2SA','1KI','2KI','JOB','PSA','PRO','ECC','SNG','ISA','JER','LAM','EZK','DAN','HOS','JOL','AMO','OBA','JON','MIC','NAM','HAB','ZEP','HAG','ZEC','MAL','MAT','MRK','LUK','JHN','ACT')
    GROUP BY book_id ORDER BY MIN(rowid)`).all() as { book_id: string; c: number }[]
  for (const row of byBook) {
    log(`  ${row.book_id}: ${row.c}`)
  }

  db.close()
}

main()
