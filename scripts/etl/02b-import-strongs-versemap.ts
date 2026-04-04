// 02b-import-strongs-versemap.ts — Import Strong's verse mapping from STEP Bible data
// Source: STEPBible-Data (CC BY 4.0) — Translators Amalgamated Hebrew OT + Greek NT
// Downloads TAHOT and TAGNT files, parses tab-separated word-level Strong's tags,
// and populates strongs_verse_map.
//
// Usage: npx tsx scripts/etl/02b-import-strongs-versemap.ts

import { db, heading, log } from './db'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DATA_DIR = join(__dirname, '..', '..', 'data', 'sources')

const STEP_FILES = [
  {
    url: 'https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Translators%20Amalgamated%20OT%2BNT/TAHOT%20Gen-Deu%20-%20Translators%20Amalgamated%20Hebrew%20OT%20-%20STEPBible.org%20CC%20BY.txt',
    file: 'TAHOT-Gen-Deu.txt',
  },
  {
    url: 'https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Translators%20Amalgamated%20OT%2BNT/TAHOT%20Jos-Est%20-%20Translators%20Amalgamated%20Hebrew%20OT%20-%20STEPBible.org%20CC%20BY.txt',
    file: 'TAHOT-Jos-Est.txt',
  },
  {
    url: 'https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Translators%20Amalgamated%20OT%2BNT/TAHOT%20Job-Sng%20-%20Translators%20Amalgamated%20Hebrew%20OT%20-%20STEPBible.org%20CC%20BY.txt',
    file: 'TAHOT-Job-Sng.txt',
  },
  {
    url: 'https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Translators%20Amalgamated%20OT%2BNT/TAHOT%20Isa-Mal%20-%20Translators%20Amalgamated%20Hebrew%20OT%20-%20STEPBible.org%20CC%20BY.txt',
    file: 'TAHOT-Isa-Mal.txt',
  },
  {
    url: 'https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Translators%20Amalgamated%20OT%2BNT/TAGNT%20Mat-Jhn%20-%20Translators%20Amalgamated%20Greek%20NT%20-%20STEPBible.org%20CC-BY.txt',
    file: 'TAGNT-Mat-Jhn.txt',
  },
  {
    url: 'https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Translators%20Amalgamated%20OT%2BNT/TAGNT%20Act-Rev%20-%20Translators%20Amalgamated%20Greek%20NT%20-%20STEPBible.org%20CC-BY.txt',
    file: 'TAGNT-Act-Rev.txt',
  },
]

// Map STEP Bible book abbreviations to USFM IDs
const BOOK_MAP: Record<string, string> = {
  'Gen': 'GEN', 'Exo': 'EXO', 'Lev': 'LEV', 'Num': 'NUM', 'Deu': 'DEU',
  'Jos': 'JOS', 'Jdg': 'JDG', 'Rut': 'RUT', '1Sa': '1SA', '2Sa': '2SA',
  '1Ki': '1KI', '2Ki': '2KI', '1Ch': '1CH', '2Ch': '2CH', 'Ezr': 'EZR',
  'Neh': 'NEH', 'Est': 'EST', 'Job': 'JOB', 'Psa': 'PSA', 'Pro': 'PRO',
  'Ecc': 'ECC', 'Sng': 'SNG', 'Isa': 'ISA', 'Jer': 'JER', 'Lam': 'LAM',
  'Ezk': 'EZK', 'Dan': 'DAN', 'Hos': 'HOS', 'Jol': 'JOL', 'Amo': 'AMO',
  'Oba': 'OBA', 'Jon': 'JON', 'Mic': 'MIC', 'Nam': 'NAM', 'Hab': 'HAB',
  'Zep': 'ZEP', 'Hag': 'HAG', 'Zec': 'ZEC', 'Mal': 'MAL',
  'Mat': 'MAT', 'Mrk': 'MRK', 'Luk': 'LUK', 'Jhn': 'JHN', 'Act': 'ACT',
  'Rom': 'ROM', '1Co': '1CO', '2Co': '2CO', 'Gal': 'GAL', 'Eph': 'EPH',
  'Php': 'PHP', 'Col': 'COL', '1Th': '1TH', '2Th': '2TH', '1Ti': '1TI',
  '2Ti': '2TI', 'Tit': 'TIT', 'Phm': 'PHM', 'Heb': 'HEB', 'Jas': 'JAS',
  '1Pe': '1PE', '2Pe': '2PE', '1Jn': '1JN', '2Jn': '2JN', '3Jn': '3JN',
  'Jud': 'JUD', 'Rev': 'REV',
}

function extractStrongsNumbers(dStrongsField: string): string[] {
  // Extract Strong's numbers from dStrongs field
  // Format: H9003/{H7225G} or {H1254A} or H9009/{H8064}
  // Strip trailing disambiguation letter (A-Z) to match our base strongs_entries
  const matches = dStrongsField.match(/[HG]\d{4,5}[A-Z]?/g)
  if (!matches) return []
  // Strip trailing letter: H7225G -> H7225, H1254A -> H1254, G5294 stays G5294
  const normalized = matches.map(m => m.replace(/^([HG]\d{4,5})[A-Z]$/, '$1'))
  return [...new Set(normalized)]
}

function parseReference(ref: string): { book: string; chapter: number; verse: number; wordPos: number } | null {
  // Format: Gen.1.1#01=L or Mat.1.1#01=L
  const match = ref.match(/^(\w+)\.(\d+)\.(\d+)#(\d+)/)
  if (!match) return null
  const bookAbbr = match[1]
  const bookId = BOOK_MAP[bookAbbr]
  if (!bookId) return null
  return {
    book: bookId,
    chapter: parseInt(match[2]),
    verse: parseInt(match[3]),
    wordPos: parseInt(match[4]),
  }
}

async function downloadFile(url: string, destPath: string): Promise<void> {
  log(`  Downloading ${destPath}...`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const text = await res.text()
  writeFileSync(destPath, text)
  log(`  ✓ ${Math.round(text.length / 1024)}KB`)
}

function parseFile(filePath: string): { strongsNumber: string; bookId: string; chapter: number; verse: number; wordPosition: number; translatedWord: string }[] {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const results: { strongsNumber: string; bookId: string; chapter: number; verse: number; wordPosition: number; translatedWord: string }[] = []

  for (const line of lines) {
    if (!line.trim() || line.startsWith('=') || line.startsWith('\t') || line.startsWith('TAHOT') || line.startsWith('TAGNT') || line.startsWith('(') || line.startsWith('Ref') || line.startsWith('Text') || line.startsWith('Translators') || line.startsWith('This')) continue

    const fields = line.split('\t')
    if (fields.length < 5) continue

    const ref = parseReference(fields[0])
    if (!ref) continue

    // TAHOT format: ref \t hebrew \t transliteration \t english \t dStrongs \t grammar
    // TAGNT format: ref \t greek \t english \t dStrongs=grammar \t lexical \t sources
    const isGreek = filePath.includes('TAGNT')
    const englishWord = isGreek
      ? (fields[2] || '').replace(/[<>\[\]\/]/g, '').trim()
      : (fields[3] || '').replace(/[<>\[\]\/]/g, '').trim()
    const dStrongsField = isGreek
      ? (fields[3] || '')   // TAGNT: field 3 has "G0976=N-NSF"
      : (fields[4] || '')   // TAHOT: field 4 has "{H1254A}"
    const dStrongs = dStrongsField
    const strongsNums = extractStrongsNumbers(dStrongs)

    for (const sn of strongsNums) {
      // Skip common prefix/suffix tags (articles, prepositions mapped generically)
      if (['H9001', 'H9002', 'H9003', 'H9004', 'H9005', 'H9006', 'H9007', 'H9008', 'H9009', 'H9010', 'H9011', 'H9012', 'H9013', 'H9014', 'H9015'].includes(sn)) continue

      results.push({
        strongsNumber: sn,
        bookId: ref.book,
        chapter: ref.chapter,
        verse: ref.verse,
        wordPosition: ref.wordPos,
        translatedWord: englishWord || null as unknown as string,
      })
    }
  }

  return results
}

async function main(): Promise<void> {
  heading("Importing Strong's Verse Map from STEP Bible Data")

  // Download files if not present
  for (const sf of STEP_FILES) {
    const destPath = join(DATA_DIR, sf.file)
    if (!existsSync(destPath)) {
      await downloadFile(sf.url, destPath)
    } else {
      log(`  ${sf.file} already exists, skipping download`)
    }
  }

  // Build a set of valid strongs numbers and book IDs for FK validation
  const validStrongs = new Set((db.prepare('SELECT number FROM strongs_entries').all() as { number: string }[]).map(r => r.number))
  const validBooks = new Set((db.prepare('SELECT id FROM books').all() as { id: string }[]).map(r => r.id))
  log(`  Valid strongs: ${validStrongs.size}, valid books: ${validBooks.size}`)

  const insert = db.prepare(`
    INSERT OR IGNORE INTO strongs_verse_map
      (strongs_number, book_id, chapter, verse, word_position, translated_word)
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  const batchInsert = db.transaction((rows: { strongsNumber: string; bookId: string; chapter: number; verse: number; wordPosition: number; translatedWord: string }[]) => {
    for (const r of rows) {
      if (validStrongs.has(r.strongsNumber) && validBooks.has(r.bookId)) {
        insert.run(r.strongsNumber, r.bookId, r.chapter, r.verse, r.wordPosition, r.translatedWord)
      }
    }
  })

  let totalInserted = 0

  for (const sf of STEP_FILES) {
    const filePath = join(DATA_DIR, sf.file)
    log(`\nParsing ${sf.file}...`)
    const rows = parseFile(filePath)
    log(`  ${rows.length} mappings found`)

    // Insert in batches of 10000
    for (let i = 0; i < rows.length; i += 10000) {
      batchInsert(rows.slice(i, i + 10000))
    }
    totalInserted += rows.length
    log(`  ✓ Inserted`)
  }

  const count = (db.prepare('SELECT COUNT(*) as c FROM strongs_verse_map').get() as { c: number }).c
  log(`\n✓ ${count.toLocaleString()} total Strong's verse mappings in database`)

  // Summary
  const byLang = db.prepare("SELECT CASE WHEN strongs_number LIKE 'H%' THEN 'Hebrew' ELSE 'Greek' END as lang, COUNT(*) as c FROM strongs_verse_map GROUP BY lang").all() as { lang: string; c: number }[]
  for (const r of byLang) log(`  ${r.lang}: ${r.c.toLocaleString()}`)

  db.close()
}

main().catch(err => {
  console.error(err)
  db.close()
  process.exit(1)
})
