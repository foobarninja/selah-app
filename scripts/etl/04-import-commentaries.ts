// 04-import-commentaries.ts — Import commentary metadata from HelloAO
import { db, DATA_DIR, heading, log } from './db'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

function main(): void {
  heading('Importing commentary sources')

  const metaPath = join(DATA_DIR, 'available_commentaries.json')
  if (!existsSync(metaPath)) {
    log('available_commentaries.json not found. Run 00-download-sources.sh first.')
    db.close()
    return
  }

  const raw = JSON.parse(readFileSync(metaPath, 'utf-8'))
  const commentaries = raw.commentaries || raw

  const insertSource = db.prepare(`
    INSERT OR IGNORE INTO commentary_sources (id, name, english_name)
    VALUES (@id, @name, @englishName)
  `)

  let count = 0
  const sources = Array.isArray(commentaries) ? commentaries : Object.entries(commentaries).map(([id, v]) => ({ id, ...(v as Record<string, unknown>) }))
  for (const c of sources) {
    const s = c as Record<string, unknown>
    insertSource.run({
      id: s.id, name: s.name || s.id,
      englishName: s.english_name || s.englishName || s.name || s.id,
    })
    count++
  }

  log(`✓ ${count} commentary sources imported`)
  log('Note: Commentary content fetching via API is a separate long-running step.')
  db.close()
}

main()
