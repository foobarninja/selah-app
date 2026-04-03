// 07-verify.ts — Validate row counts after all imports
import { db, heading, log } from './db'

function count(table: string): number {
  return (db.prepare(`SELECT COUNT(*) as c FROM ${table}`).get() as { c: number }).c
}

function main(): void {
  heading('Verification — Row counts')

  const checks = [
    { table: 'books', expected: '66' },
    { table: 'translations', expected: '30+' },
    { table: 'verses', expected: '500K+' },
    { table: 'strongs_entries', expected: '8,600+' },
    { table: 'cross_references', expected: '344K+' },
    { table: 'commentary_sources', expected: '9+' },
    { table: 'commentary_entries', expected: 'varies' },
    { table: 'characters', expected: '125+' },
  ]

  console.log('\n' + '─'.repeat(55))
  console.log(`${'Table'.padEnd(22)} ${'Actual'.padStart(10)} ${'Expected'.padStart(10)}  OK?`)
  console.log('─'.repeat(55))

  let allOk = true
  for (const { table, expected } of checks) {
    const actual = count(table)
    const ok = actual > 0 ? '✓' : '✗'
    if (actual === 0) allOk = false
    console.log(`${table.padEnd(22)} ${actual.toLocaleString().padStart(10)} ${expected.padStart(10)}  ${ok}`)
  }
  console.log('─'.repeat(55))

  if (allOk) log('\n✓ All tables have data.')
  else log('\n⚠ Some tables are empty. Run the remaining import scripts.')

  // Spot checks
  heading('Spot checks')

  const verse = db.prepare("SELECT text, translation_id FROM verses WHERE book_id='JHN' AND chapter=3 AND verse=16 LIMIT 1").get() as { text: string; translation_id: string } | undefined
  if (verse) log(`John 3:16 (${verse.translation_id}): "${verse.text.slice(0, 80)}..."`)
  else log('⚠ John 3:16 not found')

  const strongs = db.prepare("SELECT short_definition, definition FROM strongs_entries WHERE number='G26'").get() as { short_definition: string; definition: string } | undefined
  if (strongs) log(`G26 (agapē): "${strongs.short_definition || strongs.definition.slice(0, 60)}"`)
  else log('⚠ G26 not found')

  db.close()
}

main()
