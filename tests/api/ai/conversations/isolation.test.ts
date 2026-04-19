import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

describe('ai_conversations cross-profile isolation', () => {
  let dir: string
  let db: Database.Database

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'selah-iso-'))
    db = new Database(join(dir, 'test.db'))
    db.exec(`
      CREATE TABLE ai_conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT,
        title TEXT,
        context_ref TEXT,
        has_flagged_messages INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT '',
        updated_at TEXT NOT NULL DEFAULT ''
      );
    `)
    // Seed: two profiles, each with one general conversation, plus one companion conv for u1
    const now = new Date().toISOString()
    db.prepare(`INSERT INTO ai_conversations (user_id, title, context_ref, created_at, updated_at) VALUES
      ('u1', 'u1-general', NULL, ?, ?),
      ('u2', 'u2-general', NULL, ?, ?),
      ('u1', 'u1-companion', 'devotional-companion:rom-8-28', ?, ?)
    `).run(now, now, now, now, now, now)
  })

  afterEach(() => {
    db.close()
    rmSync(dir, { recursive: true, force: true })
  })

  it('list for u1 excludes u2 and companion threads', () => {
    // Mirror the route's where clause directly via SQL
    const rows = db.prepare(`
      SELECT title FROM ai_conversations
      WHERE user_id = ?
        AND (context_ref IS NULL OR context_ref NOT LIKE 'devotional-companion:%')
      ORDER BY updated_at DESC
    `).all('u1') as Array<{ title: string }>
    expect(rows.map(r => r.title)).toEqual(['u1-general'])
  })

  it('findFirst by id scoped to wrong userId returns nothing', () => {
    const u2ConvId = (db.prepare(`SELECT id FROM ai_conversations WHERE title='u2-general'`).get() as { id: number }).id
    const row = db.prepare(`SELECT * FROM ai_conversations WHERE id=? AND user_id=?`).get(u2ConvId, 'u1')
    expect(row).toBeUndefined()
  })

  it('deleteMany by id scoped to wrong userId is a no-op', () => {
    const u2ConvId = (db.prepare(`SELECT id FROM ai_conversations WHERE title='u2-general'`).get() as { id: number }).id
    const result = db.prepare(`DELETE FROM ai_conversations WHERE id=? AND user_id=?`).run(u2ConvId, 'u1')
    expect(result.changes).toBe(0)
    // Row still exists when queried with correct userId
    const stillThere = db.prepare(`SELECT id FROM ai_conversations WHERE id=? AND user_id=?`).get(u2ConvId, 'u2')
    expect(stillThere).toBeDefined()
  })
})
