// scripts/etl/add-companion-opener-column.ts
//
// Idempotent: adds devotionals.companion_opener if missing.
// Additive-only, safe to run against a populated DB.

import Database from 'better-sqlite3'
import { resolve } from 'path'

const DB_PATH = process.env.SELAH_DB_PATH ?? resolve(process.cwd(), 'data/selah.db')

function migrate(db: Database.Database): void {
  const existing = db
    .prepare(`SELECT COUNT(*) AS n FROM pragma_table_info('devotionals') WHERE name = 'companion_opener'`)
    .get() as { n: number }
  if (existing.n > 0) {
    console.log('[migration] devotionals.companion_opener already exists — skipping.')
    return
  }
  console.log('[migration] adding devotionals.companion_opener column...')
  db.exec(`ALTER TABLE devotionals ADD COLUMN companion_opener TEXT`)
  console.log('[migration] done.')
}

function main(): void {
  const db = new Database(DB_PATH)
  try {
    db.pragma('foreign_keys = OFF')
    db.transaction(() => migrate(db))()
    console.log('[migration] committed.')
  } finally {
    db.close()
  }
}

main()
