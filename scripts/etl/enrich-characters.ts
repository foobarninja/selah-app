// enrich-characters.ts — Helper to extract character profile + commentary for enrichment
// Usage: npx tsx scripts/etl/enrich-characters.ts <character-id>
// Outputs the existing profile and all relevant commentary to stdout

import { db } from './db'

const charId = process.argv[2]
if (!charId) {
  console.error('Usage: npx tsx scripts/etl/enrich-characters.ts <character-id>')
  process.exit(1)
}

const char = db.prepare('SELECT * FROM characters WHERE id = ?').get(charId) as Record<string, unknown>
if (!char) {
  console.error('Character not found:', charId)
  db.close()
  process.exit(1)
}

// Parse emotional_arc to extract Scripture references
const arc = JSON.parse(char.emotional_arc as string) as { reference: string }[]
const refs: { bookId: string; chapter: number; verseStart: number; verseEnd: number }[] = []

for (const entry of arc) {
  const ref = entry.reference
  // Parse references like "Genesis 12:1-4", "1 Samuel 17:1-58", "Acts 9:1-31"
  const match = ref.match(/^(\d?\s*\w+)\s+(\d+):(\d+)(?:-(\d+))?/)
  if (!match) continue

  const bookName = match[1].trim()
  const chapter = parseInt(match[2])
  const vStart = parseInt(match[3])
  const vEnd = match[4] ? parseInt(match[4]) : vStart

  // Map book name to USFM ID
  const book = db.prepare('SELECT id FROM books WHERE name LIKE ?').get(bookName + '%') as { id: string } | undefined
  if (book) {
    refs.push({ bookId: book.id, chapter, verseStart: vStart, verseEnd: vEnd })
  }
}

// Output profile
console.log('=== CHARACTER PROFILE ===')
console.log('id:', char.id)
console.log('name:', char.name)
console.log('era:', char.era)
console.log('prominence:', char.prominence)
console.log('bio_brief:', char.bio_brief)
console.log('bio_full:', char.bio_full)
console.log('modern_parallel:', char.modern_parallel)
console.log('emotional_arc:', char.emotional_arc)
console.log('faith_journey:', char.faith_journey)
console.log('source_tier:', char.source_tier)
console.log('source_notes:', char.source_notes)
console.log('=== END PROFILE ===')

// Output commentary for each reference
console.log('\n=== COMMENTARY DATA ===')
for (const ref of refs) {
  const entries = db.prepare(`
    SELECT cs.name as source_name, ce.chapter, ce.verse, ce.text
    FROM commentary_entries ce
    JOIN commentary_sources cs ON ce.source_id = cs.id
    WHERE ce.book_id = ? AND ce.chapter = ? AND ce.verse BETWEEN ? AND ?
    ORDER BY cs.name, ce.verse
  `).all(ref.bookId, ref.chapter, ref.verseStart, ref.verseEnd) as { source_name: string; chapter: number; verse: number; text: string }[]

  if (entries.length > 0) {
    console.log(`\n--- ${ref.bookId} ${ref.chapter}:${ref.verseStart}-${ref.verseEnd} ---`)
    let currentSource = ''
    for (const e of entries) {
      if (e.source_name !== currentSource) {
        if (currentSource) console.log(`=== END ${currentSource} ===\n`)
        currentSource = e.source_name
        console.log(`=== COMMENTARY: ${currentSource} ===`)
      }
      console.log(`${ref.bookId} ${e.chapter}:${e.verse}\n${e.text}\n`)
    }
    if (currentSource) console.log(`=== END ${currentSource} ===`)
  }
}
console.log('\n=== END COMMENTARY DATA ===')

db.close()
