// 10-generate-characters.ts — Insert pre-baked Layer 2A character profiles
import { db, heading, log } from './db'
import type { CharacterRecord } from './data/character-types'

import { patriarchalCharacters } from './data/characters-patriarchal'
import { exodusJudgesCharacters } from './data/characters-exodus-judges'
import { monarchyCharacters } from './data/characters-monarchy'
import { exilePostExileCharacters } from './data/characters-exile-postexile'
import { lifeOfChristCharacters } from './data/characters-life-of-christ'
import { earlyChurchCharacters } from './data/characters-early-church'

const ALL_CHARACTERS: CharacterRecord[] = [
  ...patriarchalCharacters,
  ...exodusJudgesCharacters,
  ...monarchyCharacters,
  ...exilePostExileCharacters,
  ...lifeOfChristCharacters,
  ...earlyChurchCharacters,
]

function main(): void {
  heading('Importing Layer 2A — Character Profiles')
  log(`${ALL_CHARACTERS.length} characters to insert`)

  const insert = db.prepare(`
    INSERT OR REPLACE INTO characters (
      id, name, aliases, gender, tribe_clan, occupation, social_status,
      era, approximate_dates, bio_brief, bio_full, modern_parallel,
      emotional_arc, faith_journey, source_tier, source_notes,
      is_named, prominence
    ) VALUES (
      @id, @name, @aliases, @gender, @tribeClan, @occupation, @socialStatus,
      @era, @approximateDates, @bioBrief, @bioFull, @modernParallel,
      @emotionalArc, @faithJourney, @sourceTier, @sourceNotes,
      @isNamed, @prominence
    )
  `)

  const batchInsert = db.transaction((chars: CharacterRecord[]) => {
    for (const c of chars) {
      insert.run({
        ...c,
        isNamed: c.isNamed ? 1 : 0,
      })
    }
  })

  // Check for duplicate IDs before inserting
  const ids = ALL_CHARACTERS.map(c => c.id)
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
  if (dupes.length > 0) {
    log(`⚠ Duplicate IDs found: ${dupes.join(', ')}`)
    log('Aborting. Fix duplicates before importing.')
    db.close()
    process.exit(1)
  }

  batchInsert(ALL_CHARACTERS)

  const count = (db.prepare('SELECT COUNT(*) as c FROM characters').get() as { c: number }).c
  log(`✓ ${count} characters now in database`)

  // Summary by era
  const byEra = db.prepare('SELECT era, COUNT(*) as c FROM characters GROUP BY era ORDER BY c DESC').all() as { era: string; c: number }[]
  for (const row of byEra) {
    log(`  ${row.era}: ${row.c}`)
  }

  db.close()
}

main()
