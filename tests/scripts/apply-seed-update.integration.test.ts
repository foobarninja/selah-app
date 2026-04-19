// tests/scripts/apply-seed-update.integration.test.ts
//
// End-to-end test for applySeedUpdate. Builds a minimal "live DB" + a
// "fresh seed" in a temp directory, runs the CLI, and verifies:
//   - user-local rows survive
//   - seed content is replaced
//   - timestamped backup is created
//   - .seed-version marker is written
//
// Does NOT hit the network.

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, rmSync, readdirSync, readFileSync, existsSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { applySeedUpdate } from '../../scripts/ops/apply-seed-update'
import type { SeedManifest } from '../../src/lib/seed/manifest'

describe('applySeedUpdate (local fresh seed)', () => {
  let dir: string
  let prevCwd: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'selah-update-'))
    prevCwd = process.cwd()
    const dataDir = join(dir, 'data')
    require('fs').mkdirSync(dataDir)
    process.chdir(dir)
  })

  afterEach(() => {
    process.chdir(prevCwd)
    rmSync(dir, { recursive: true, force: true })
  })

  function writeLiveDb(): void {
    const db = new Database(join(dir, 'data/selah.db'))
    db.pragma('foreign_keys = OFF')
    db.exec(`CREATE TABLE devotionals (id TEXT PRIMARY KEY, title TEXT)`)
    db.prepare(`INSERT INTO devotionals VALUES ('d-old', 'Old title')`).run()
    db.exec(`CREATE TABLE user_notes (id INTEGER PRIMARY KEY, body TEXT)`)
    db.prepare(`INSERT INTO user_notes (id, body) VALUES (1, 'MY PRECIOUS NOTE')`).run()
    db.exec(`CREATE TABLE devotional_history (id INTEGER PRIMARY KEY, devotional_id TEXT, rating INTEGER)`)
    db.prepare(`INSERT INTO devotional_history VALUES (1, 'd-old', 5)`).run()
    db.close()
  }

  function writeFreshSeed(): string {
    const path = join(dir, 'data/selah-seed.db')
    const db = new Database(path)
    db.pragma('foreign_keys = OFF')
    // Seed content: devotional got renamed AND gained a new column.
    db.exec(`CREATE TABLE devotionals (id TEXT PRIMARY KEY, title TEXT, subtitle TEXT)`)
    db.prepare(`INSERT INTO devotionals VALUES ('d-new', 'New title', 'subtitle here')`).run()
    // user tables exist empty in the fresh seed.
    db.exec(`CREATE TABLE user_notes (id INTEGER PRIMARY KEY, body TEXT)`)
    db.exec(`CREATE TABLE devotional_history (id INTEGER PRIMARY KEY, devotional_id TEXT, rating INTEGER)`)
    db.close()
    return path
  }

  it('preserves user rows, replaces seed content, writes marker + backup', async () => {
    writeLiveDb()
    const freshPath = writeFreshSeed()

    const manifest: SeedManifest = {
      seedVersion: '2099.01.01',
      schemaVersion: 1,
      sha256: 'test',
      sizeXz: 0,
      sizeRaw: 0,
      releasedAt: new Date().toISOString(),
      downloadUrl: 'local://',
    }

    await applySeedUpdate({ manifest, localFreshSeedPath: freshPath })

    // Marker written as JSON with both version fields
    const marker = JSON.parse(readFileSync(join(dir, 'data/.seed-version'), 'utf8'))
    expect(marker.seedVersion).toBe('2099.01.01')
    expect(marker.schemaVersion).toBe(1)

    // DB now has the new seed content + preserved user rows
    const db = new Database(join(dir, 'data/selah.db'), { readonly: true })
    const devs = db.prepare(`SELECT id, title, subtitle FROM devotionals`).all()
    const notes = db.prepare(`SELECT id, body FROM user_notes`).all()
    const hist = db.prepare(`SELECT id, devotional_id, rating FROM devotional_history`).all()
    db.close()

    expect(devs).toEqual([{ id: 'd-new', title: 'New title', subtitle: 'subtitle here' }])
    expect(notes).toEqual([{ id: 1, body: 'MY PRECIOUS NOTE' }])
    // Orphan preserved (devotional_id 'd-old' doesn't exist in new seed)
    expect(hist).toEqual([{ id: 1, devotional_id: 'd-old', rating: 5 }])

    // Backup exists
    const backups = readdirSync(join(dir, 'data')).filter((f) => f.startsWith('selah.pre-update-'))
    expect(backups.length).toBe(1)

    // Staging path cleaned up
    expect(existsSync(join(dir, 'data/selah.incoming.db'))).toBe(false)
  })
})
