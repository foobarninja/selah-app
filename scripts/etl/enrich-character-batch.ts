// enrich-character-batch.ts — Enrich a batch of characters with commentary data
// Usage: npx tsx scripts/etl/enrich-character-batch.ts <id1> <id2> <id3> ...
// Pulls each character's profile + commentary, sends to Claude for enrichment,
// strips [ENRICHED] tags, and updates the database.

import { db, heading, log } from './db'

interface CharRow {
  id: string
  name: string
  aliases: string | null
  gender: string | null
  tribe_clan: string | null
  occupation: string | null
  social_status: string | null
  era: string | null
  approximate_dates: string | null
  bio_brief: string | null
  bio_full: string | null
  modern_parallel: string | null
  emotional_arc: string | null
  faith_journey: string | null
  source_tier: string
  source_notes: string | null
  tyndale_profile_id: string | null
  is_named: number
  prominence: string
}

function getCharacterCommentary(charId: string): string {
  const char = db.prepare('SELECT * FROM characters WHERE id = ?').get(charId) as CharRow
  if (!char || !char.emotional_arc) return ''

  const arc = JSON.parse(char.emotional_arc) as { reference: string }[]
  const refs: { bookId: string; chapter: number; vStart: number; vEnd: number }[] = []

  for (const entry of arc) {
    const match = entry.reference.match(/^(\d?\s*\w+)\s+(\d+):(\d+)(?:-(\d+))?/)
    if (!match) continue
    const bookName = match[1].trim()
    const book = db.prepare('SELECT id FROM books WHERE name LIKE ?').get(bookName + '%') as { id: string } | undefined
    if (book) {
      refs.push({
        bookId: book.id,
        chapter: parseInt(match[2]),
        vStart: parseInt(match[3]),
        vEnd: match[4] ? parseInt(match[4]) : parseInt(match[3]),
      })
    }
  }

  let commentary = ''
  for (const ref of refs) {
    const entries = db.prepare(`
      SELECT cs.name as source_name, ce.chapter, ce.verse, ce.text
      FROM commentary_entries ce JOIN commentary_sources cs ON ce.source_id = cs.id
      WHERE ce.book_id = ? AND ce.chapter = ? AND ce.verse BETWEEN ? AND ?
      ORDER BY cs.name, ce.verse
    `).all(ref.bookId, ref.chapter, ref.vStart, ref.vEnd) as { source_name: string; chapter: number; verse: number; text: string }[]

    if (entries.length > 0) {
      commentary += `\n--- ${ref.bookId} ${ref.chapter}:${ref.vStart}-${ref.vEnd} ---\n`
      let currentSource = ''
      for (const e of entries) {
        if (e.source_name !== currentSource) {
          if (currentSource) commentary += `=== END ${currentSource} ===\n\n`
          currentSource = e.source_name
          commentary += `=== COMMENTARY: ${currentSource} ===\n`
        }
        // Truncate very long commentary entries to manage token budget
        const text = e.text.length > 2000 ? e.text.slice(0, 2000) + '...[truncated]' : e.text
        commentary += `${ref.bookId} ${e.chapter}:${e.verse}\n${text}\n\n`
      }
      if (currentSource) commentary += `=== END ${currentSource} ===\n`
    }
  }

  return commentary
}

function formatProfile(char: CharRow): string {
  return `id: ${char.id}
name: ${char.name}
era: ${char.era}
prominence: ${char.prominence}
bio_brief: ${char.bio_brief}
bio_full: ${char.bio_full}
modern_parallel: ${char.modern_parallel}
emotional_arc: ${char.emotional_arc}
faith_journey: ${char.faith_journey}
source_tier: ${char.source_tier}
source_notes: ${char.source_notes}`
}

async function main() {
  const charIds = process.argv.slice(2)
  if (charIds.length === 0) {
    console.error('Usage: npx tsx scripts/etl/enrich-character-batch.ts <id1> <id2> ...')
    process.exit(1)
  }

  heading(`Enriching ${charIds.length} characters`)

  for (const charId of charIds) {
    const char = db.prepare('SELECT * FROM characters WHERE id = ?').get(charId) as CharRow
    if (!char) { log(`⚠ ${charId} not found, skipping`); continue }

    const commentary = getCharacterCommentary(charId)
    if (!commentary.trim()) {
      log(`  ${charId}: no commentary found, skipping`)
      continue
    }

    log(`  ${charId}: commentary found, enrichment ready`)
    // Output the profile + commentary for agent consumption
    console.log(`\n### CHARACTER: ${charId} ###`)
    console.log(formatProfile(char))
    console.log('\n### COMMENTARY ###')
    console.log(commentary)
    console.log('### END ###\n')
  }

  db.close()
}

main()
