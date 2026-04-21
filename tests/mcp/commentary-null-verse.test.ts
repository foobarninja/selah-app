import { describe, it, expect } from 'vitest'
import Database from 'better-sqlite3'

describe('commentary chapter-intro upsert (NULL verse match)', () => {
  it('finds the existing chapter-intro row via COALESCE', () => {
    const db = new Database(':memory:')
    db.exec(`
      CREATE TABLE commentary_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source_id TEXT,
        book_id TEXT,
        chapter INTEGER,
        verse INTEGER,
        text TEXT
      );
    `)
    db.prepare(
      'INSERT INTO commentary_entries (source_id, book_id, chapter, verse, text) VALUES (?,?,?,?,?)',
    ).run('selah-ai', 'ROM', 8, null, 'intro text')

    const existing = db
      .prepare(
        `SELECT id FROM commentary_entries
         WHERE source_id = ? AND book_id = ? AND chapter = ?
           AND COALESCE(verse, -1) = COALESCE(?, -1)`,
      )
      .get('selah-ai', 'ROM', 8, null) as { id: number } | undefined

    expect(existing?.id).toBeDefined()
  })

  it('does not match a verse-level row when looking up the chapter intro', () => {
    const db = new Database(':memory:')
    db.exec(`
      CREATE TABLE commentary_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source_id TEXT,
        book_id TEXT,
        chapter INTEGER,
        verse INTEGER,
        text TEXT
      );
    `)
    db.prepare(
      'INSERT INTO commentary_entries (source_id, book_id, chapter, verse, text) VALUES (?,?,?,?,?)',
    ).run('selah-ai', 'ROM', 8, 28, 'verse 28 text')

    const existing = db
      .prepare(
        `SELECT id FROM commentary_entries
         WHERE source_id = ? AND book_id = ? AND chapter = ?
           AND COALESCE(verse, -1) = COALESCE(?, -1)`,
      )
      .get('selah-ai', 'ROM', 8, null) as { id: number } | undefined

    expect(existing).toBeUndefined()
  })
})
