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

const describeIfDb = existsSync(SOURCE_DB) ? describe : describe.skip

describeIfDb('devotional series migration', () => {
  beforeEach(() => {
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

  describe('constraints', () => {
    it('CHECK rejects series_id without series_order', () => {
      runMigration()
      const db = new Database(TEST_DB)
      try {
        db.exec(`INSERT INTO devotional_series (id, title, description) VALUES ('s1', 't', 'd');`)
        const existing = db.prepare(`SELECT id FROM devotionals LIMIT 1`).get() as { id: string }
        expect(() =>
          db.prepare(`UPDATE devotionals SET series_id = 's1' WHERE id = ?`).run(existing.id)
        ).toThrow(/CHECK/i)
      } finally {
        db.close()
      }
    })

    it('CHECK rejects series_order without series_id', () => {
      runMigration()
      const db = new Database(TEST_DB)
      try {
        const existing = db.prepare(`SELECT id FROM devotionals LIMIT 1`).get() as { id: string }
        expect(() =>
          db.prepare(`UPDATE devotionals SET series_order = 10 WHERE id = ?`).run(existing.id)
        ).toThrow(/CHECK/i)
      } finally {
        db.close()
      }
    })

    it('CHECK accepts both NULL and both set', () => {
      runMigration()
      const db = new Database(TEST_DB)
      try {
        db.exec(`INSERT INTO devotional_series (id, title, description) VALUES ('s2', 't', 'd');`)
        const existing = db.prepare(`SELECT id FROM devotionals LIMIT 2`).all() as Array<{ id: string }>
        db.prepare(`UPDATE devotionals SET series_id = 's2', series_order = 10 WHERE id = ?`).run(existing[0].id)
        db.prepare(`UPDATE devotionals SET series_id = NULL, series_order = NULL WHERE id = ?`).run(existing[1].id)
        const row = db.prepare(`SELECT series_id, series_order FROM devotionals WHERE id = ?`).get(existing[0].id) as any
        expect(row.series_id).toBe('s2')
        expect(row.series_order).toBe(10)
      } finally {
        db.close()
      }
    })

    it('partial unique index rejects duplicate (series_id, series_order)', () => {
      runMigration()
      const db = new Database(TEST_DB)
      try {
        db.exec(`INSERT INTO devotional_series (id, title, description) VALUES ('s3', 't', 'd');`)
        const existing = db.prepare(`SELECT id FROM devotionals LIMIT 2`).all() as Array<{ id: string }>
        db.prepare(`UPDATE devotionals SET series_id = 's3', series_order = 10 WHERE id = ?`).run(existing[0].id)
        expect(() =>
          db.prepare(`UPDATE devotionals SET series_id = 's3', series_order = 10 WHERE id = ?`).run(existing[1].id)
        ).toThrow(/UNIQUE/i)
      } finally {
        db.close()
      }
    })

    it('partial unique index allows many (NULL, NULL) rows', () => {
      runMigration()
      const db = new Database(TEST_DB)
      try {
        const count = db.prepare(`SELECT COUNT(*) AS n FROM devotionals WHERE series_id IS NULL`).get() as { n: number }
        expect(count.n).toBeGreaterThan(1)
      } finally {
        db.close()
      }
    })

    it('ON DELETE via trigger nulls out both columns on series delete', () => {
      runMigration()
      const db = new Database(TEST_DB)
      try {
        db.pragma('foreign_keys = ON')
        db.exec(`INSERT INTO devotional_series (id, title, description) VALUES ('s4', 't', 'd');`)
        const existing = db.prepare(`SELECT id FROM devotionals LIMIT 1`).get() as { id: string }
        db.prepare(`UPDATE devotionals SET series_id = 's4', series_order = 10 WHERE id = ?`).run(existing.id)
        db.prepare(`DELETE FROM devotional_series WHERE id = 's4'`).run()
        const row = db.prepare(`SELECT series_id, series_order FROM devotionals WHERE id = ?`).get(existing.id) as any
        expect(row.series_id).toBeNull()
        expect(row.series_order).toBeNull()
      } finally {
        db.close()
      }
    })

    it('trigger detaches children correctly for a multi-row series delete', () => {
      runMigration()
      const db = new Database(TEST_DB)
      try {
        db.pragma('foreign_keys = ON')
        db.exec(`
          INSERT INTO devotional_series (id, title, description) VALUES ('m1', 't', 'd');
          INSERT INTO devotional_series (id, title, description) VALUES ('m2', 't', 'd');
        `)
        const existing = db.prepare(`SELECT id FROM devotionals LIMIT 4`).all() as Array<{ id: string }>
        db.prepare(`UPDATE devotionals SET series_id = 'm1', series_order = 10 WHERE id = ?`).run(existing[0].id)
        db.prepare(`UPDATE devotionals SET series_id = 'm1', series_order = 20 WHERE id = ?`).run(existing[1].id)
        db.prepare(`UPDATE devotionals SET series_id = 'm2', series_order = 10 WHERE id = ?`).run(existing[2].id)
        db.prepare(`UPDATE devotionals SET series_id = 'm2', series_order = 20 WHERE id = ?`).run(existing[3].id)

        // Delete both series in one statement — trigger should fire per row.
        db.prepare(`DELETE FROM devotional_series WHERE id IN ('m1', 'm2')`).run()

        const rows = db.prepare(
          `SELECT id, series_id, series_order FROM devotionals WHERE id IN (?, ?, ?, ?)`
        ).all(existing[0].id, existing[1].id, existing[2].id, existing[3].id) as Array<{ id: string; series_id: string | null; series_order: number | null }>

        expect(rows).toHaveLength(4)
        for (const row of rows) {
          expect(row.series_id).toBeNull()
          expect(row.series_order).toBeNull()
        }
      } finally {
        db.close()
      }
    })
  })
})
