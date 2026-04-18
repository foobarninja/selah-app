// scripts/etl/add-devotional-series-schema.ts
import Database from 'better-sqlite3'
import { resolve } from 'path'

const DB_PATH = process.env.SELAH_DB_PATH ?? resolve(process.cwd(), 'data/selah.db')

function migrate(db: Database.Database): void {
  const hasSeriesColumn = db
    .prepare(`SELECT COUNT(*) AS n FROM pragma_table_info('devotionals') WHERE name = 'series_id'`)
    .get() as { n: number }

  if (hasSeriesColumn.n > 0) {
    console.log('[migration] devotionals.series_id already exists — skipping.')
    return
  }

  console.log('[migration] adding devotional series schema...')
  // Subsequent tasks fill this in.
}

const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')
try {
  migrate(db)
  console.log('[migration] done.')
} finally {
  db.close()
}
