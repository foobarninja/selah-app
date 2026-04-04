// 11-generate-climate-contexts.ts — Insert pre-baked Layer 2C climate context profiles
import { db, heading, log } from './db'
import type { ClimateRecord } from './data/climate-types'

import { climateContextsA } from './data/climate-contexts-a'
import { climateContextsB } from './data/climate-contexts-b'

const ALL_CONTEXTS: ClimateRecord[] = [
  ...climateContextsA,
  ...climateContextsB,
]

function main(): void {
  heading('Importing Layer 2C — Climate Contexts')
  log(`${ALL_CONTEXTS.length} climate contexts to insert`)

  const insert = db.prepare(`
    INSERT OR REPLACE INTO climate_contexts (
      id, name, era, date_range, political, economic, social,
      religious, geographic, daily_life, modern_parallel,
      source_tier, source_notes
    ) VALUES (
      @id, @name, @era, @dateRange, @political, @economic, @social,
      @religious, @geographic, @dailyLife, @modernParallel,
      @sourceTier, @sourceNotes
    )
  `)

  const batchInsert = db.transaction((contexts: ClimateRecord[]) => {
    for (const c of contexts) {
      insert.run(c)
    }
  })

  // Check for duplicate IDs
  const ids = ALL_CONTEXTS.map(c => c.id)
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
  if (dupes.length > 0) {
    log(`⚠ Duplicate IDs found: ${dupes.join(', ')}`)
    log('Aborting. Fix duplicates before importing.')
    db.close()
    process.exit(1)
  }

  batchInsert(ALL_CONTEXTS)

  const count = (db.prepare('SELECT COUNT(*) as c FROM climate_contexts').get() as { c: number }).c
  log(`✓ ${count} climate contexts now in database`)

  // Summary by era
  const byEra = db.prepare('SELECT era, name FROM climate_contexts ORDER BY era').all() as { era: string; name: string }[]
  for (const row of byEra) {
    log(`  ${row.era}: ${row.name}`)
  }

  db.close()
}

main()
