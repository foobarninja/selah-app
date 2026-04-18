// tests/lib/migrations/devotional-series.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { copyFileSync, existsSync, unlinkSync } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'

const SOURCE_DB = resolve(process.cwd(), 'data/selah.db')
const TEST_DB = resolve(process.cwd(), 'data/selah-migration-test.db')

function runMigration(): void {
  execSync(
    `npx tsx scripts/etl/add-devotional-series-schema.ts`,
    { env: { ...process.env, SELAH_DB_PATH: TEST_DB }, stdio: 'pipe' }
  )
}

describe('devotional series migration', () => {
  beforeEach(() => {
    if (!existsSync(SOURCE_DB)) throw new Error('data/selah.db missing; migration test requires it')
    copyFileSync(SOURCE_DB, TEST_DB)
  })

  afterEach(() => {
    if (existsSync(TEST_DB)) unlinkSync(TEST_DB)
    ;['-wal', '-shm'].forEach((suffix) => {
      const p = TEST_DB + suffix
      if (existsSync(p)) unlinkSync(p)
    })
  })

  it('creates devotional_series table', () => {
    runMigration()
    const db = new Database(TEST_DB, { readonly: true })
    try {
      const cols = db.prepare(`SELECT name FROM pragma_table_info('devotional_series')`).all() as Array<{ name: string }>
      const names = cols.map((c) => c.name).sort()
      expect(names).toEqual(
        ['audience', 'created_at', 'description', 'id', 'season', 'source_notes', 'source_tier', 'title'].sort()
      )
    } finally {
      db.close()
    }
  })

  it('adds series_id and series_order columns to devotionals', () => {
    runMigration()
    const db = new Database(TEST_DB, { readonly: true })
    try {
      const cols = db.prepare(`SELECT name FROM pragma_table_info('devotionals') WHERE name IN ('series_id', 'series_order')`).all() as Array<{ name: string }>
      expect(cols.map((c) => c.name).sort()).toEqual(['series_id', 'series_order'])
    } finally {
      db.close()
    }
  })

  it('is idempotent on re-run', () => {
    runMigration()
    expect(() => runMigration()).not.toThrow()
  })
})
