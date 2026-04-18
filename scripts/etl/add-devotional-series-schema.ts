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

  db.exec(`
    CREATE TABLE IF NOT EXISTS devotional_series (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      audience TEXT NOT NULL DEFAULT 'family',
      season TEXT,
      source_tier TEXT NOT NULL DEFAULT 'ai_assisted',
      source_notes TEXT,
      created_at TEXT NOT NULL DEFAULT ''
    );
  `)

  // SQLite can't ALTER TABLE ADD CHECK — rebuild the table.
  // Foreign keys must be OFF outside a transaction to avoid cascade triggering on DROP.
  db.pragma('foreign_keys = OFF')

  const rebuild = db.transaction(() => {
    db.exec(`
      CREATE TABLE devotionals_new (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        book_id TEXT NOT NULL,
        chapter INTEGER NOT NULL,
        verse_start INTEGER NOT NULL,
        verse_end INTEGER NOT NULL,
        context_brief TEXT NOT NULL,
        modern_moment TEXT NOT NULL,
        conversation_starters TEXT NOT NULL,
        going_deeper TEXT,
        audience TEXT NOT NULL DEFAULT 'family',
        estimated_minutes INTEGER NOT NULL DEFAULT 5,
        season TEXT,
        day_of_year INTEGER,
        narrative_id TEXT,
        source_tier TEXT NOT NULL DEFAULT 'ai_assisted',
        source_notes TEXT,
        created_at TEXT NOT NULL DEFAULT '',
        -- series_id / series_order are detached on series delete by the
        -- trg_devotional_series_detach trigger (created in Task 4). NOT by
        -- ON DELETE SET NULL — that would null only series_id, violating
        -- the pairing CHECK on the line below.
        series_id TEXT,
        series_order INTEGER,
        FOREIGN KEY (book_id) REFERENCES books(id),
        FOREIGN KEY (narrative_id) REFERENCES narrative_units(id),
        FOREIGN KEY (series_id) REFERENCES devotional_series(id),
        CHECK ((series_id IS NULL) = (series_order IS NULL))
      );
    `)

    db.exec(`
      INSERT INTO devotionals_new (
        id, title, book_id, chapter, verse_start, verse_end,
        context_brief, modern_moment, conversation_starters, going_deeper,
        audience, estimated_minutes, season, day_of_year, narrative_id,
        source_tier, source_notes, created_at, series_id, series_order
      )
      SELECT
        id, title, book_id, chapter, verse_start, verse_end,
        context_brief, modern_moment, conversation_starters, going_deeper,
        audience, estimated_minutes, season, day_of_year, narrative_id,
        source_tier, source_notes, created_at, NULL, NULL
      FROM devotionals;
    `)

    db.exec(`DROP TABLE devotionals;`)
    db.exec(`ALTER TABLE devotionals_new RENAME TO devotionals;`)

    db.exec(`CREATE INDEX idx_devotionals_book_chapter_verse ON devotionals(book_id, chapter, verse_start);`)
    db.exec(`CREATE INDEX idx_devotionals_season ON devotionals(season);`)
    db.exec(`CREATE INDEX idx_devotionals_audience ON devotionals(audience);`)
    db.exec(`CREATE INDEX idx_devotionals_series_order ON devotionals(series_id, series_order);`)
    db.exec(`
      CREATE UNIQUE INDEX idx_devotional_series_order_unique
        ON devotionals(series_id, series_order)
        WHERE series_id IS NOT NULL;
    `)

    const fkViolations = db.prepare(`PRAGMA foreign_key_check`).all() as unknown[]
    if (fkViolations.length > 0) {
      throw new Error(`foreign_key_check failed after rebuild: ${JSON.stringify(fkViolations)}`)
    }
  })

  try {
    rebuild()
  } finally {
    db.pragma('foreign_keys = ON')
  }
}

const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')
try {
  migrate(db)
  console.log('[migration] done.')
} finally {
  db.close()
}
