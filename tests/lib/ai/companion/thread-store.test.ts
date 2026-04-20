import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

// NOTE: db.ts builds a Prisma singleton at module-evaluation time using DATABASE_URL.
// We must:
//   1. Set DATABASE_URL before any import of @/lib/db (done via beforeEach + vi.resetModules)
//   2. Clear the globalThis prisma cache so db.ts creates a fresh client each test
//   3. Disconnect the Prisma client in afterEach so better-sqlite3 releases the file lock

const globalForPrisma = globalThis as unknown as {
  prisma: { $disconnect(): Promise<void> } | undefined
  prismaVersion: number | undefined
}

describe('thread-store', () => {
  let dir: string
  let dbPath: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'selah-thread-'))
    dbPath = join(dir, 'test.db')
    const db = new Database(dbPath)
    db.exec(`
      CREATE TABLE ai_conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        context_ref TEXT,
        user_id TEXT,
        has_flagged_messages INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT '',
        updated_at TEXT NOT NULL DEFAULT ''
      );
      CREATE TABLE ai_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conversation_id INTEGER NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        provider_id TEXT,
        model_id TEXT,
        user_id TEXT,
        flag_level TEXT,
        flag_source TEXT,
        flag_reviewed_at TEXT,
        created_at TEXT NOT NULL DEFAULT ''
      );
    `)
    db.close()

    // Point Prisma at our fixture DB.
    process.env.DATABASE_URL = `file:${dbPath}`
    // Clear the global singleton cache so db.ts re-creates the client
    // with the new DATABASE_URL when the module is re-evaluated.
    globalForPrisma.prisma = undefined
    globalForPrisma.prismaVersion = undefined
    // Reset modules so db.ts re-evaluates and picks up the new DATABASE_URL.
    vi.resetModules()
  })

  afterEach(async () => {
    // Disconnect so better-sqlite3 releases the file lock before we delete.
    if (globalForPrisma.prisma) {
      await globalForPrisma.prisma.$disconnect()
      globalForPrisma.prisma = undefined
      globalForPrisma.prismaVersion = undefined
    }
    delete process.env.DATABASE_URL
    rmSync(dir, { recursive: true, force: true })
  })

  it('createThread stamps contextRef and title', async () => {
    const { createThread } = await import('@/lib/ai/companion/thread-store')
    const t = await createThread({ devotionalId: 'rom-8-28', title: 'On good', userId: 'u1' })
    expect(t.id).toBeGreaterThan(0)
    expect(t.title).toBe('On good')
  })

  it('findActiveThread returns the most-recent thread for a devotional', async () => {
    const { createThread, findActiveThread } = await import('@/lib/ai/companion/thread-store')
    const a = await createThread({ devotionalId: 'rom-8-28', title: 'first', userId: 'u1' })
    const b = await createThread({ devotionalId: 'rom-8-28', title: 'second', userId: 'u1' })
    const active = await findActiveThread('rom-8-28', 'u1')
    expect(active?.id).toBe(b.id)
  })

  it('findActiveThread returns null for a devotional with no thread', async () => {
    const { findActiveThread } = await import('@/lib/ai/companion/thread-store')
    const active = await findActiveThread('never-touched', 'u1')
    expect(active).toBeNull()
  })

  it('listThreads returns all threads for a devotional, most-recent first', async () => {
    const { createThread, listThreads } = await import('@/lib/ai/companion/thread-store')
    const a = await createThread({ devotionalId: 'rom-8-28', title: 'a', userId: 'u1' })
    const b = await createThread({ devotionalId: 'rom-8-28', title: 'b', userId: 'u1' })
    const list = await listThreads('rom-8-28', 'u1')
    expect(list.map((t) => t.id)).toEqual([b.id, a.id])
  })

  it('appendMessage persists + updates the thread updatedAt', async () => {
    const { createThread, appendMessage, getThreadMessages } = await import('@/lib/ai/companion/thread-store')
    const t = await createThread({ devotionalId: 'rom-8-28', title: 'x', userId: 'u1' })
    const userMsg = await appendMessage(t.id, { role: 'user', content: 'hello', userId: 'u1' })
    const asstMsg = await appendMessage(t.id, { role: 'assistant', content: 'hi', userId: 'u1' })
    expect(userMsg.id).toBeGreaterThan(0)
    expect(asstMsg.id).toBeGreaterThan(userMsg.id)
    const messages = await getThreadMessages(t.id, 'u1')
    expect(messages).toHaveLength(2)
    expect(messages[0].role).toBe('user')
    expect(messages[1].role).toBe('assistant')
  })

  it('listThreads includes messageCount', async () => {
    const { createThread, appendMessage, listThreads } = await import('@/lib/ai/companion/thread-store')
    const t = await createThread({ devotionalId: 'rom-8-28', title: 'x', userId: 'u1' })
    await appendMessage(t.id, { role: 'user', content: 'hi', userId: 'u1' })
    await appendMessage(t.id, { role: 'assistant', content: 'hi back', userId: 'u1' })
    const list = await listThreads('rom-8-28', 'u1')
    expect(list[0].messageCount).toBe(2)
  })

  it('getThreadMessages throws if a message has an unexpected role', async () => {
    const { createThread, getThreadMessages } = await import('@/lib/ai/companion/thread-store')
    const t = await createThread({ devotionalId: 'rom-8-28', title: 'x', userId: 'u1' })
    // Inject a rogue row directly through sqlite (bypassing Prisma) to simulate DB corruption.
    const db = new Database(dbPath)
    db.prepare(`INSERT INTO ai_messages (conversation_id, role, content, user_id, created_at) VALUES (?, 'system', 'rogue', 'u1', ?)`)
      .run(t.id, new Date().toISOString())
    db.close()
    await expect(getThreadMessages(t.id, 'u1')).rejects.toThrow(/unexpected role/)
  })

  it('findActiveThread isolates users — u1 does not see u2 threads', async () => {
    const { createThread, findActiveThread } = await import('@/lib/ai/companion/thread-store')
    await createThread({ devotionalId: 'rom-8-28', title: 'a', userId: 'u1' })
    await createThread({ devotionalId: 'rom-8-28', title: 'b', userId: 'u2' })
    const a = await findActiveThread('rom-8-28', 'u1')
    const b = await findActiveThread('rom-8-28', 'u2')
    expect(a?.title).toBe('a')
    expect(b?.title).toBe('b')
  })

  it('appendMessage persists flagLevel and flagSource when provided', async () => {
    const { createThread, findActiveThread, appendMessage } = await import('@/lib/ai/companion/thread-store')
    await createThread({ devotionalId: 'rom-8-28', title: 'a', userId: 'u1' })
    const active = await findActiveThread('rom-8-28', 'u1')
    expect(active).not.toBeNull()
    const msg = await appendMessage(active!.id, {
      role: 'user',
      content: 'I hate myself',
      userId: 'u1',
      flagLevel: 'concerning',
      flagSource: 'keyword',
    })
    const db = new Database(dbPath)
    const raw = db.prepare('SELECT flag_level, flag_source FROM ai_messages WHERE id=?').get(msg.id) as { flag_level: string; flag_source: string }
    db.close()
    expect(raw.flag_level).toBe('concerning')
    expect(raw.flag_source).toBe('keyword')
  })

  it('appendMessage sets has_flagged_messages on the parent conversation when flagLevel is present', async () => {
    const { createThread, findActiveThread, appendMessage } = await import('@/lib/ai/companion/thread-store')
    await createThread({ devotionalId: 'rom-8-28', title: 'a', userId: 'u1' })
    const active = await findActiveThread('rom-8-28', 'u1')
    await appendMessage(active!.id, {
      role: 'user',
      content: 'I hate myself',
      userId: 'u1',
      flagLevel: 'concerning',
      flagSource: 'keyword',
    })
    const db = new Database(dbPath)
    const conv = db.prepare('SELECT has_flagged_messages FROM ai_conversations WHERE id=?').get(active!.id) as { has_flagged_messages: number }
    db.close()
    expect(conv.has_flagged_messages).toBe(1)
  })

  it('appendMessage does NOT set has_flagged_messages when no flag is provided', async () => {
    const { createThread, findActiveThread, appendMessage } = await import('@/lib/ai/companion/thread-store')
    await createThread({ devotionalId: 'rom-8-28', title: 'a', userId: 'u1' })
    const active = await findActiveThread('rom-8-28', 'u1')
    await appendMessage(active!.id, {
      role: 'user',
      content: 'what does this mean',
      userId: 'u1',
    })
    const db = new Database(dbPath)
    const conv = db.prepare('SELECT has_flagged_messages FROM ai_conversations WHERE id=?').get(active!.id) as { has_flagged_messages: number }
    db.close()
    expect(conv.has_flagged_messages).toBe(0)
  })
})
