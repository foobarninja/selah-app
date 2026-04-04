// 19-generate-scene-cast.ts — Insert scene cast (character appearances) for narrative units
// Run after scene cast data files are generated.
// Usage: npx tsx scripts/etl/19-generate-scene-cast.ts

import { db, heading, log } from './db'

interface AppearanceRecord {
  characterId: string
  bookId: string
  chapter: number
  verseStart: number
  verseEnd: number | null
  role: string
  emotionalState: string | null
  motivation: string | null
  stakes: string | null
  narrativeNote: string | null
  modernParallel: string | null
  sourceTier: string
}

function insertAppearances(appearances: AppearanceRecord[]): void {
  const insert = db.prepare(`
    INSERT OR REPLACE INTO character_appearances (
      character_id, book_id, chapter, verse_start, verse_end,
      role, emotional_state, motivation, stakes,
      narrative_note, modern_parallel, source_tier
    ) VALUES (
      @characterId, @bookId, @chapter, @verseStart, @verseEnd,
      @role, @emotionalState, @motivation, @stakes,
      @narrativeNote, @modernParallel, @sourceTier
    )
  `)

  const batch = db.transaction((items: AppearanceRecord[]) => {
    for (const a of items) {
      insert.run(a)
    }
  })

  batch(appearances)
}

// This script is called by agents that write appearance data directly to the DB.
// It serves as a verification/reporting tool.
function main(): void {
  heading('Scene Cast — Character Appearances')

  const count = (db.prepare('SELECT COUNT(*) as c FROM character_appearances').get() as { c: number }).c
  log(`${count} character appearances in database`)

  const byRole = db.prepare('SELECT role, COUNT(*) as c FROM character_appearances GROUP BY role ORDER BY c DESC').all() as { role: string; c: number }[]
  for (const row of byRole) {
    log(`  ${row.role}: ${row.c}`)
  }

  const byBook = db.prepare('SELECT book_id, COUNT(*) as c FROM character_appearances GROUP BY book_id ORDER BY c DESC LIMIT 10').all() as { book_id: string; c: number }[]
  log('\nTop books by appearances:')
  for (const row of byBook) {
    log(`  ${row.book_id}: ${row.c}`)
  }

  db.close()
}

main()
