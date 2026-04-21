import { describe, it, expect } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync } from 'fs'
import { tmpdir } from 'os'
import { resolve } from 'path'
import { mergeUserData } from '@/lib/seed/merge-engine'

function makeOrphanPair() {
  const dir = mkdtempSync(resolve(tmpdir(), 'selah-merge-orphan-'))
  const oldPath = resolve(dir, 'old.db')
  const newPath = resolve(dir, 'new.db')

  const oldDb = new Database(oldPath)
  oldDb.exec(`
    CREATE TABLE devotionals (id TEXT PRIMARY KEY);
    CREATE TABLE devotional_history (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      devotional_id TEXT,
      FOREIGN KEY (devotional_id) REFERENCES devotionals(id)
    );
    INSERT INTO devotionals (id) VALUES ('dev-old');
    INSERT INTO devotional_history (id, user_id, devotional_id) VALUES ('h1', 'u1', 'dev-old');
  `)
  oldDb.close()

  const newDb = new Database(newPath)
  newDb.exec(`
    CREATE TABLE devotionals (id TEXT PRIMARY KEY);
    CREATE TABLE devotional_history (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      devotional_id TEXT,
      FOREIGN KEY (devotional_id) REFERENCES devotionals(id)
    );
    INSERT INTO devotionals (id) VALUES ('dev-new');
  `)
  newDb.close()

  return { oldPath, newPath }
}

describe('mergeUserData orphan guard', () => {
  it('throws when the merge would leave orphan FK rows', () => {
    const { oldPath, newPath } = makeOrphanPair()
    expect(() => mergeUserData(oldPath, newPath)).toThrow(/orphan FK/)
  })

  it('allows the merge when SELAH_ALLOW_ORPHAN_FKS=1', () => {
    const originalEnv = process.env.SELAH_ALLOW_ORPHAN_FKS
    process.env.SELAH_ALLOW_ORPHAN_FKS = '1'
    try {
      const { oldPath, newPath } = makeOrphanPair()
      const report = mergeUserData(oldPath, newPath)
      expect(report.orphanRows.length).toBeGreaterThan(0)
    } finally {
      if (originalEnv === undefined) delete process.env.SELAH_ALLOW_ORPHAN_FKS
      else process.env.SELAH_ALLOW_ORPHAN_FKS = originalEnv
    }
  })
})
