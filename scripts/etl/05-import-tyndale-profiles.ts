// 05-import-tyndale-profiles.ts — Import Tyndale character profiles
import { db, DATA_DIR, heading, log } from './db'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

function main(): void {
  heading('Importing Tyndale character profiles')

  const path = join(DATA_DIR, 'tyndale_profiles.json')
  if (!existsSync(path)) {
    log('tyndale_profiles.json not found. Run 00-download-sources.sh first.')
    db.close()
    return
  }

  const data = JSON.parse(readFileSync(path, 'utf-8'))
  const insert = db.prepare(`
    INSERT OR IGNORE INTO characters (id, name, bio_brief, bio_full, source_tier, source_notes, tyndale_profile_id, is_named, prominence)
    VALUES (@id, @name, @bioBrief, @bioFull, 'scholarship', 'Tyndale Open Study Notes', @tyndaleId, 1, 'secondary')
  `)

  // Handle both array and object formats
  const profiles = data.profiles || data.entries || data
  let entries: [string, Record<string, unknown>][]

  if (Array.isArray(profiles)) {
    entries = profiles.map((p: Record<string, unknown>, i: number) => [String(p.id || i), p])
  } else if (typeof profiles === 'object') {
    entries = Object.entries(profiles)
  } else {
    log('Unexpected data format.')
    log(JSON.stringify(data).slice(0, 300))
    db.close()
    return
  }

  log(`Found ${entries.length} profile entries`)

  const batchInsert = db.transaction((items: [string, Record<string, unknown>][]) => {
    for (const [key, value] of items) {
      const name = String(value.name || value.title || key)
      const desc = String(value.description || value.summary || value.bio || '')
      insert.run({
        id: slugify(name), name,
        bioBrief: desc.slice(0, 300) || null,
        bioFull: desc || null, tyndaleId: String(key),
      })
    }
  })

  batchInsert(entries)

  const count = (db.prepare('SELECT COUNT(*) as c FROM characters').get() as { c: number }).c
  log(`✓ ${count} characters in database`)
  db.close()
}

main()
