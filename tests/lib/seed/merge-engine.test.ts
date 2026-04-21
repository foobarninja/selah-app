// tests/lib/seed/merge-engine.test.ts
//
// Exercises mergeUserData against minimal fixture DBs that stand in for
// "old seed" and "new seed". Each test builds fresh temp DBs so they're
// isolated.

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { mergeUserData } from '@/lib/seed/merge-engine'

// USER_LOCAL_TABLES imported only to know which names to use in fixtures
import { USER_LOCAL_TABLES } from '@/lib/seed/user-tables'

// Pick a couple of real user-local table names for the fixtures so the
// engine's allowlist actually touches them.
const T_HISTORY = 'devotional_history' // has FK to devotionals(id)
const T_NOTES = 'user_notes'
const T_COLLECTIONS = 'user_collections'

describe('mergeUserData', () => {
  let dir: string
  let oldPath: string
  let newPath: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'selah-merge-'))
    oldPath = join(dir, 'old.db')
    newPath = join(dir, 'new.db')
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  function makeOld(schemaAndData: (db: Database.Database) => void): void {
    const db = new Database(oldPath)
    db.pragma('foreign_keys = OFF')
    schemaAndData(db)
    db.close()
  }

  function makeNew(schemaAndData: (db: Database.Database) => void): void {
    const db = new Database(newPath)
    db.pragma('foreign_keys = OFF')
    schemaAndData(db)
    db.close()
  }

  function countRows(path: string, table: string): number {
    const db = new Database(path, { readonly: true })
    try {
      const r = db.prepare(`SELECT COUNT(*) n FROM ${table}`).get() as { n: number }
      return r.n
    } finally {
      db.close()
    }
  }

  it('copies rows from a user-local table that exists in both DBs', () => {
    makeOld((db) => {
      db.exec(`CREATE TABLE ${T_NOTES} (id INTEGER PRIMARY KEY, body TEXT)`)
      db.prepare(`INSERT INTO ${T_NOTES} (id, body) VALUES (1, 'first'), (2, 'second')`).run()
    })
    makeNew((db) => {
      db.exec(`CREATE TABLE ${T_NOTES} (id INTEGER PRIMARY KEY, body TEXT)`)
    })

    const report = mergeUserData(oldPath, newPath)
    expect(report.invariantViolations).toEqual([])
    expect(countRows(newPath, T_NOTES)).toBe(2)
    const merged = report.tablesMerged.find((t) => t.name === T_NOTES)
    expect(merged?.rowsCopied).toBe(2)
  })

  it('replaces any pre-existing rows in the new DB with the old ones', () => {
    makeOld((db) => {
      db.exec(`CREATE TABLE ${T_NOTES} (id INTEGER PRIMARY KEY, body TEXT)`)
      db.prepare(`INSERT INTO ${T_NOTES} (id, body) VALUES (1, 'user-written')`).run()
    })
    makeNew((db) => {
      db.exec(`CREATE TABLE ${T_NOTES} (id INTEGER PRIMARY KEY, body TEXT)`)
      // seed pre-populated a row the user shouldn't inherit
      db.prepare(`INSERT INTO ${T_NOTES} (id, body) VALUES (99, 'seeded')`).run()
    })

    mergeUserData(oldPath, newPath)

    const db = new Database(newPath, { readonly: true })
    const rows = db.prepare(`SELECT id, body FROM ${T_NOTES} ORDER BY id`).all()
    db.close()
    expect(rows).toEqual([{ id: 1, body: 'user-written' }])
  })

  it('skips tables present in new seed but missing from old DB', () => {
    makeOld((db) => {
      db.exec(`CREATE TABLE ${T_NOTES} (id INTEGER PRIMARY KEY, body TEXT)`)
    })
    makeNew((db) => {
      db.exec(`CREATE TABLE ${T_NOTES} (id INTEGER PRIMARY KEY, body TEXT)`)
      db.exec(`CREATE TABLE ${T_COLLECTIONS} (id INTEGER PRIMARY KEY, name TEXT)`)
      db.prepare(`INSERT INTO ${T_COLLECTIONS} (id, name) VALUES (1, 'seeded-default')`).run()
    })

    const report = mergeUserData(oldPath, newPath)
    expect(report.tablesSkippedMissingInOld).toContain(T_COLLECTIONS)
    expect(countRows(newPath, T_COLLECTIONS)).toBe(1) // untouched seed default
  })

  it('handles added columns additively (new column filled with default)', () => {
    makeOld((db) => {
      db.exec(`CREATE TABLE ${T_NOTES} (id INTEGER PRIMARY KEY, body TEXT)`)
      db.prepare(`INSERT INTO ${T_NOTES} (id, body) VALUES (1, 'note')`).run()
    })
    makeNew((db) => {
      db.exec(`CREATE TABLE ${T_NOTES} (id INTEGER PRIMARY KEY, body TEXT, pinned INTEGER DEFAULT 0)`)
    })

    const report = mergeUserData(oldPath, newPath)
    expect(report.invariantViolations).toEqual([])
    expect(report.tablesWithAddedColumns).toContainEqual({ name: T_NOTES, addedColumns: ['pinned'] })

    const db = new Database(newPath, { readonly: true })
    const rows = db.prepare(`SELECT id, body, pinned FROM ${T_NOTES}`).all()
    db.close()
    expect(rows).toEqual([{ id: 1, body: 'note', pinned: 0 }])
  })

  it('fails with invariant violation when a column was removed in the new seed', () => {
    makeOld((db) => {
      db.exec(`CREATE TABLE ${T_NOTES} (id INTEGER PRIMARY KEY, body TEXT, legacy_field TEXT)`)
      db.prepare(`INSERT INTO ${T_NOTES} (id, body, legacy_field) VALUES (1, 'note', 'x')`).run()
    })
    makeNew((db) => {
      db.exec(`CREATE TABLE ${T_NOTES} (id INTEGER PRIMARY KEY, body TEXT)`)
    })

    expect(() => mergeUserData(oldPath, newPath)).toThrow(/invariant violation/)
    // Row count in new DB should be unchanged (transaction rolled back).
    expect(countRows(newPath, T_NOTES)).toBe(0)
  })

  it('warns about tables present in old DB that are neither content nor user-local', () => {
    makeOld((db) => {
      db.exec(`CREATE TABLE ${T_NOTES} (id INTEGER PRIMARY KEY, body TEXT)`)
      db.exec(`CREATE TABLE mystery_table (id INTEGER PRIMARY KEY)`) // unregistered
    })
    makeNew((db) => {
      db.exec(`CREATE TABLE ${T_NOTES} (id INTEGER PRIMARY KEY, body TEXT)`)
    })

    const report = mergeUserData(oldPath, newPath)
    expect(report.unknownTablesInOld).toContain('mystery_table')
  })

  it('reports orphan FK rows but preserves them', () => {
    makeOld((db) => {
      db.exec(`CREATE TABLE devotionals (id TEXT PRIMARY KEY)`)
      db.prepare(`INSERT INTO devotionals (id) VALUES ('dev-old-1')`).run()
      db.exec(`CREATE TABLE ${T_HISTORY} (id INTEGER PRIMARY KEY, devotional_id TEXT REFERENCES devotionals(id))`)
      db.prepare(`INSERT INTO ${T_HISTORY} (id, devotional_id) VALUES (1, 'dev-old-1')`).run()
    })
    makeNew((db) => {
      db.exec(`CREATE TABLE devotionals (id TEXT PRIMARY KEY)`)
      // Note: new seed DROPPED dev-old-1 entirely (renamed).
      db.prepare(`INSERT INTO devotionals (id) VALUES ('dev-new-1')`).run()
      db.exec(`CREATE TABLE ${T_HISTORY} (id INTEGER PRIMARY KEY, devotional_id TEXT REFERENCES devotionals(id))`)
    })

    // This test exercises the "preserve orphan rows, report them" contract;
    // with the default guard the merge refuses, so opt in explicitly here.
    const originalEnv = process.env.SELAH_ALLOW_ORPHAN_FKS
    process.env.SELAH_ALLOW_ORPHAN_FKS = '1'
    try {
      const report = mergeUserData(oldPath, newPath)
      expect(report.invariantViolations).toEqual([])
      expect(countRows(newPath, T_HISTORY)).toBe(1) // orphan preserved
      expect(report.orphanRows.length).toBeGreaterThan(0)
      expect(report.orphanRows.some((o) => o.table === T_HISTORY && o.target === 'devotionals')).toBe(true)
    } finally {
      if (originalEnv === undefined) delete process.env.SELAH_ALLOW_ORPHAN_FKS
      else process.env.SELAH_ALLOW_ORPHAN_FKS = originalEnv
    }
  })

  it('covers every registered user-local table without error (smoke)', () => {
    // Build old and new DBs that each contain a minimal version of every
    // user-local table. This catches forgotten quoting / schema issues.
    const setup = (db: Database.Database) => {
      for (const t of USER_LOCAL_TABLES) {
        db.exec(`CREATE TABLE ${t} (id INTEGER PRIMARY KEY, placeholder TEXT)`)
      }
    }
    makeOld(setup)
    makeNew(setup)

    const report = mergeUserData(oldPath, newPath)
    expect(report.invariantViolations).toEqual([])
    // Every table should have been visited.
    const visited = new Set(report.tablesMerged.map((t) => t.name))
    for (const t of USER_LOCAL_TABLES) expect(visited.has(t)).toBe(true)
  })
})
