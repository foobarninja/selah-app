import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

/**
 * Cross-profile isolation for surfaceNotes (resurfacing engine).
 *
 * Regression guard for the leak where surfaceNotes returned notes from all
 * profiles. Mirrors the route's WHERE clause directly via SQL — every channel
 * must filter on user_notes.user_id. Pattern follows
 * tests/api/ai/conversations/isolation.test.ts.
 */
describe('surfaceNotes cross-profile isolation', () => {
  let dir: string
  let db: Database.Database

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'selah-resurf-iso-'))
    db = new Database(join(dir, 'test.db'))
    db.exec(`
      CREATE TABLE user_notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT NOT NULL,
        note_type TEXT NOT NULL DEFAULT 'annotation',
        highlight_color TEXT DEFAULT 'default',
        is_pinned INTEGER DEFAULT 0,
        study_context TEXT,
        ai_conversation_id INTEGER,
        journal_id TEXT,
        user_id TEXT,
        created_at TEXT NOT NULL DEFAULT '',
        updated_at TEXT NOT NULL DEFAULT ''
      );
      CREATE TABLE user_note_anchors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        note_id INTEGER NOT NULL,
        anchor_type TEXT NOT NULL,
        book_id TEXT,
        chapter INTEGER,
        verse_start INTEGER,
        verse_end INTEGER,
        ref_id TEXT
      );
      CREATE TABLE journals (id TEXT PRIMARY KEY, name TEXT);
    `)
    const now = new Date().toISOString()
    // Two profiles each have a note anchored to the SAME verse (ROM 8:28).
    db.prepare(`INSERT INTO user_notes (content, note_type, user_id, created_at, updated_at) VALUES
      ('u1 private reflection on Rom 8:28', 'reflection', 'u1', ?, ?),
      ('u2 private reflection on Rom 8:28', 'reflection', 'u2', ?, ?)
    `).run(now, now, now, now)
    db.prepare(`INSERT INTO user_note_anchors (note_id, anchor_type, book_id, chapter, verse_start) VALUES
      (1, 'verse', 'ROM', 8, 28),
      (2, 'verse', 'ROM', 8, 28)
    `).run()
  })

  afterEach(() => {
    db.close()
    rmSync(dir, { recursive: true, force: true })
  })

  // Mirrors Channel 1 (direct verse anchor) of surfaceNotes.
  function directAnchorChannel(userId: string) {
    return db.prepare(`
      SELECT n.id, n.content
      FROM user_notes n
      JOIN user_note_anchors a ON a.note_id = n.id
      LEFT JOIN journals j ON j.id = n.journal_id
      WHERE n.user_id = ?
        AND a.anchor_type = 'verse' AND a.book_id = ? AND a.chapter = ?
        AND a.verse_start >= ? AND a.verse_start <= ?
      LIMIT 10
    `).all(userId, 'ROM', 8, 28, 28) as Array<{ id: number; content: string }>
  }

  it('surfaces only the active profile notes for a shared verse anchor', () => {
    const u1 = directAnchorChannel('u1')
    expect(u1.map(r => r.content)).toEqual(['u1 private reflection on Rom 8:28'])

    const u2 = directAnchorChannel('u2')
    expect(u2.map(r => r.content)).toEqual(['u2 private reflection on Rom 8:28'])
  })

  it('does not leak the other profile note (regression guard)', () => {
    const u1 = directAnchorChannel('u1')
    expect(u1.some(r => r.content.includes('u2'))).toBe(false)
  })

  it('returns nothing for a profile with no notes on the verse', () => {
    const u3 = directAnchorChannel('u3')
    expect(u3).toEqual([])
  })
})
