// 02-import-strongs.ts — Parse openscriptures Strong's dictionaries
// Files are .js with var strongsXxxDictionary = { "H1": {...}, ... }
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { db, DATA_DIR, heading, log } from './db'

function parseStrongsJs(filePath: string): Record<string, Record<string, string>> {
  const content = readFileSync(filePath, 'utf-8')
  // Find first "= {" and extract from there to the last "}"
  const startIdx = content.indexOf('= {')
  if (startIdx === -1) throw new Error(`Could not find '= {' in ${filePath}`)
  const lastBrace = content.lastIndexOf('}')
  if (lastBrace === -1) throw new Error(`Could not find closing '}' in ${filePath}`)
  const jsonStr = content.slice(startIdx + 2, lastBrace + 1)
  return JSON.parse(jsonStr)
}

function main(): void {
  heading("Importing Strong's concordance")

  const insert = db.prepare(`
    INSERT OR IGNORE INTO strongs_entries (number, language, word, transliteration, pronunciation, definition, short_definition, kjv_usage, derivation)
    VALUES (@number, @language, @word, @transliteration, @pronunciation, @definition, @shortDefinition, @kjvUsage, @derivation)
  `)

  const batchInsert = db.transaction((entries: Record<string, unknown>[]) => {
    for (const e of entries) insert.run(e)
  })

  // Hebrew
  const hebrewFile = join(DATA_DIR, 'strongs', 'hebrew', 'strongs-hebrew-dictionary.js')
  if (existsSync(hebrewFile)) {
    log('Parsing Hebrew dictionary...')
    const dict = parseStrongsJs(hebrewFile)
    const entries = Object.entries(dict).map(([key, e]) => ({
      number: key, language: 'hebrew', word: e.lemma || '',
      transliteration: e.xlit || null, pronunciation: e.pron || null,
      definition: e.strongs_def || e.derivation || '',
      shortDefinition: e.kjv_def?.split(',')[0]?.trim().slice(0, 100) || null,
      kjvUsage: e.kjv_def || null, derivation: e.derivation || null,
    }))
    batchInsert(entries)
    log(`✓ ${entries.length} Hebrew entries`)
  } else {
    log(`⚠ Not found: ${hebrewFile}`)
  }

  // Greek
  const greekFile = join(DATA_DIR, 'strongs', 'greek', 'strongs-greek-dictionary.js')
  if (existsSync(greekFile)) {
    log('Parsing Greek dictionary...')
    const dict = parseStrongsJs(greekFile)
    const entries = Object.entries(dict).map(([key, e]) => ({
      number: key, language: 'greek', word: e.lemma || '',
      transliteration: e.xlit || null, pronunciation: e.pron || null,
      definition: e.strongs_def || e.derivation || '',
      shortDefinition: e.kjv_def?.split(',')[0]?.trim().slice(0, 100) || null,
      kjvUsage: e.kjv_def || null, derivation: e.derivation || null,
    }))
    batchInsert(entries)
    log(`✓ ${entries.length} Greek entries`)
  } else {
    log(`⚠ Not found: ${greekFile}`)
  }

  const total = (db.prepare('SELECT COUNT(*) as c FROM strongs_entries').get() as { c: number }).c
  log(`\nTotal: ${total.toLocaleString()}`)
  db.close()
}

main()
