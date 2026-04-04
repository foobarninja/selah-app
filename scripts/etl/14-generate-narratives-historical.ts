// 14-generate-narratives-historical.ts — Insert pre-baked Layer 2D narrative units for Historical Books
import { db, heading, log } from './db'
import type { NarrativeUnitRecord } from './data/narrative-types'

import { narrativesJoshua } from './data/narratives-joshua'
import { narrativesJudges } from './data/narratives-judges'
import { narrativesRuth } from './data/narratives-ruth'
import { narratives1Samuel } from './data/narratives-1samuel'
import { narratives2Samuel } from './data/narratives-2samuel'
import { narratives1Kings } from './data/narratives-1kings'
import { narratives2Kings } from './data/narratives-2kings'
import { narrativesChronicles } from './data/narratives-chronicles'
import { narrativesEzraNehemiahEsther } from './data/narratives-ezra-nehemiah-esther'

const ALL_NARRATIVES: NarrativeUnitRecord[] = [
  ...narrativesJoshua,
  ...narrativesJudges,
  ...narrativesRuth,
  ...narratives1Samuel,
  ...narratives2Samuel,
  ...narratives1Kings,
  ...narratives2Kings,
  ...narrativesChronicles,
  ...narrativesEzraNehemiahEsther,
]

function main(): void {
  heading('Importing Layer 2D — Narrative Units (Historical Books)')
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

  // Check for duplicate IDs
  const ids = ALL_NARRATIVES.map(u => u.id)
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
  if (dupes.length > 0) {
    log(`⚠ Duplicate IDs found: ${dupes.join(', ')}`)
    log('Aborting. Fix duplicates before importing.')
    db.close()
    process.exit(1)
  }

  batchInsert(ALL_NARRATIVES)

  const count = (db.prepare('SELECT COUNT(*) as c FROM narrative_units').get() as { c: number }).c
  log(`✓ ${count} narrative units now in database`)

  // Summary by book
  const byBook = db.prepare(`SELECT book_id, COUNT(*) as c FROM narrative_units
    WHERE book_id IN ('JOS','JDG','RUT','1SA','2SA','1KI','2KI')
    GROUP BY book_id ORDER BY MIN(rowid)`).all() as { book_id: string; c: number }[]
  for (const row of byBook) {
    log(`  ${row.book_id}: ${row.c}`)
  }

  db.close()
}

main()
