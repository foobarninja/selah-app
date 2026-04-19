import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

describe('profiles/queries', () => {
  let dir: string
  let dbPath: string

  beforeEach(async () => {
    dir = mkdtempSync(join(tmpdir(), 'selah-profiles-'))
    dbPath = join(dir, 'test.db')
    const db = new Database(dbPath)
    db.exec(`
      CREATE TABLE user_profiles (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, avatar_color TEXT NOT NULL,
        pin_hash TEXT, is_default INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT '', updated_at TEXT NOT NULL DEFAULT ''
      );
      -- Tables exercised by assertions:
      CREATE TABLE user_notes (id INTEGER PRIMARY KEY, user_id TEXT, body TEXT);
      CREATE TABLE journals (id TEXT PRIMARY KEY, user_id TEXT, title TEXT);
      CREATE TABLE ai_conversations (id INTEGER PRIMARY KEY, user_id TEXT, title TEXT);
      -- Stubs so cascade DELETE doesn't hit "no such table":
      CREATE TABLE ai_messages (id INTEGER PRIMARY KEY, user_id TEXT);
      CREATE TABLE devotional_history (id INTEGER PRIMARY KEY, user_id TEXT);
      CREATE TABLE user_note_anchors (id INTEGER PRIMARY KEY, user_id TEXT);
      CREATE TABLE user_note_themes (id INTEGER PRIMARY KEY, user_id TEXT);
      CREATE TABLE user_note_tags (id INTEGER PRIMARY KEY, user_id TEXT);
      CREATE TABLE user_tags (id INTEGER PRIMARY KEY, user_id TEXT);
      CREATE TABLE user_bookmarks (id INTEGER PRIMARY KEY, user_id TEXT);
      CREATE TABLE user_collections (id TEXT PRIMARY KEY, user_id TEXT);
      CREATE TABLE user_collection_items (id INTEGER PRIMARY KEY, user_id TEXT);
      CREATE TABLE reading_history (id INTEGER PRIMARY KEY, user_id TEXT);
      CREATE TABLE study_projects (id TEXT PRIMARY KEY, user_id TEXT);
      CREATE TABLE study_assembly_items (id INTEGER PRIMARY KEY, user_id TEXT);
      CREATE TABLE user_settings (user_id TEXT, key TEXT, value TEXT, PRIMARY KEY (user_id, key));
    `)
    db.close()
    process.env.DATABASE_URL = `file:${dbPath}`
    // Reset Prisma global singleton (see tests/lib/ai/companion/thread-store.test.ts precedent).
    const globalForPrisma = globalThis as unknown as { prisma?: unknown; prismaVersion?: unknown }
    globalForPrisma.prisma = undefined
    globalForPrisma.prismaVersion = undefined
    const { vi } = await import('vitest')
    vi.resetModules()
  })

  afterEach(async () => {
    const { prisma } = await import('@/lib/db')
    await prisma.$disconnect()
    rmSync(dir, { recursive: true, force: true })
  })

  it('createProfile inserts with defaults and returns the row', async () => {
    const { createProfile } = await import('@/lib/profiles/queries')
    const p = await createProfile({ name: 'Ada', avatarColor: '#ff0', pin: null })
    expect(p.id.length).toBeGreaterThan(10)
    expect(p.name).toBe('Ada')
    expect(p.avatarColor).toBe('#ff0')
    expect(p.pinHash).toBeNull()
    expect(p.isDefault).toBe(false)
  })

  it('createProfile hashes the PIN when provided', async () => {
    const { createProfile } = await import('@/lib/profiles/queries')
    const p = await createProfile({ name: 'Bob', avatarColor: '#0ff', pin: '1234' })
    expect(p.pinHash).not.toBeNull()
    expect(p.pinHash).not.toBe('1234')
  })

  it('listProfiles orders default first, then by createdAt', async () => {
    const { createProfile, listProfiles, markDefault } = await import('@/lib/profiles/queries')
    const a = await createProfile({ name: 'A', avatarColor: '#1', pin: null })
    const b = await createProfile({ name: 'B', avatarColor: '#2', pin: null })
    await markDefault(b.id)
    const list = await listProfiles()
    expect(list[0].id).toBe(b.id) // default first
    expect(list[1].id).toBe(a.id)
  })

  it('deleteProfile removes the profile AND its rows from user-local tables', async () => {
    const { createProfile, deleteProfile } = await import('@/lib/profiles/queries')
    const p = await createProfile({ name: 'X', avatarColor: '#1', pin: null })
    // Seed one row per user-local table for this profile + one for another profile
    const other = await createProfile({ name: 'Y', avatarColor: '#2', pin: null })
    const db = new Database(dbPath)
    db.prepare(`INSERT INTO user_notes (user_id, body) VALUES (?, 'x'), (?, 'y')`).run(p.id, other.id)
    db.prepare(`INSERT INTO journals (id, user_id, title) VALUES ('j1', ?, 't'), ('j2', ?, 'u')`).run(p.id, other.id)
    db.prepare(`INSERT INTO ai_conversations (user_id, title) VALUES (?, 'c'), (?, 'd')`).run(p.id, other.id)
    db.close()

    await deleteProfile(p.id)

    // Profile gone, other profile's rows survive
    const db2 = new Database(dbPath, { readonly: true })
    expect(db2.prepare(`SELECT COUNT(*) n FROM user_profiles WHERE id=?`).get(p.id)).toEqual({ n: 0 })
    expect(db2.prepare(`SELECT COUNT(*) n FROM user_notes WHERE user_id=?`).get(p.id)).toEqual({ n: 0 })
    expect(db2.prepare(`SELECT COUNT(*) n FROM user_notes WHERE user_id=?`).get(other.id)).toEqual({ n: 1 })
    expect(db2.prepare(`SELECT COUNT(*) n FROM journals WHERE user_id=?`).get(p.id)).toEqual({ n: 0 })
    expect(db2.prepare(`SELECT COUNT(*) n FROM ai_conversations WHERE user_id=?`).get(p.id)).toEqual({ n: 0 })
    db2.close()
  })

  it('deleteProfile refuses to delete the last remaining profile', async () => {
    const { createProfile, deleteProfile } = await import('@/lib/profiles/queries')
    const p = await createProfile({ name: 'Only', avatarColor: '#1', pin: null })
    await expect(deleteProfile(p.id)).rejects.toThrow(/last/i)
  })

  it('updateProfile changes name, color, and PIN independently', async () => {
    const { createProfile, updateProfile } = await import('@/lib/profiles/queries')
    const p = await createProfile({ name: 'X', avatarColor: '#1', pin: null })
    await updateProfile(p.id, { name: 'Renamed' })
    await updateProfile(p.id, { avatarColor: '#fff' })
    await updateProfile(p.id, { pin: '5678' })
    await updateProfile(p.id, { pin: null }) // remove PIN

    const { listProfiles } = await import('@/lib/profiles/queries')
    const list = await listProfiles()
    const updated = list.find((x) => x.id === p.id)!
    expect(updated.name).toBe('Renamed')
    expect(updated.avatarColor).toBe('#fff')
    expect(updated.pinHash).toBeNull()
  })
})
