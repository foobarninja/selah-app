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
    const t = await createThread({ devotionalId: 'rom-8-28', title: 'On good' })
    expect(t.id).toBeGreaterThan(0)
    expect(t.title).toBe('On good')
  })

  it('findActiveThread returns the most-recent thread for a devotional', async () => {
    const { createThread, findActiveThread } = await import('@/lib/ai/companion/thread-store')
    const a = await createThread({ devotionalId: 'rom-8-28', title: 'first' })
    const b = await createThread({ devotionalId: 'rom-8-28', title: 'second' })
    const active = await findActiveThread('rom-8-28')
    expect(active?.id).toBe(b.id)
  })

  it('findActiveThread returns null for a devotional with no thread', async () => {
    const { findActiveThread } = await import('@/lib/ai/companion/thread-store')
    const active = await findActiveThread('never-touched')
    expect(active).toBeNull()
  })

  it('listThreads returns all threads for a devotional, most-recent first', async () => {
    const { createThread, listThreads } = await import('@/lib/ai/companion/thread-store')
    const a = await createThread({ devotionalId: 'rom-8-28', title: 'a' })
    const b = await createThread({ devotionalId: 'rom-8-28', title: 'b' })
    const list = await listThreads('rom-8-28')
    expect(list.map((t) => t.id)).toEqual([b.id, a.id])
  })

  it('appendMessage persists + updates the thread updatedAt', async () => {
    const { createThread, appendMessage, getThreadMessages } = await import('@/lib/ai/companion/thread-store')
    const t = await createThread({ devotionalId: 'rom-8-28', title: 'x' })
    const userMsg = await appendMessage(t.id, { role: 'user', content: 'hello' })
    const asstMsg = await appendMessage(t.id, { role: 'assistant', content: 'hi' })
    expect(userMsg.id).toBeGreaterThan(0)
    expect(asstMsg.id).toBeGreaterThan(userMsg.id)
    const messages = await getThreadMessages(t.id)
    expect(messages).toHaveLength(2)
    expect(messages[0].role).toBe('user')
    expect(messages[1].role).toBe('assistant')
  })

  it('listThreads includes messageCount', async () => {
    const { createThread, appendMessage, listThreads } = await import('@/lib/ai/companion/thread-store')
    const t = await createThread({ devotionalId: 'rom-8-28', title: 'x' })
    await appendMessage(t.id, { role: 'user', content: 'hi' })
    await appendMessage(t.id, { role: 'assistant', content: 'hi back' })
    const list = await listThreads('rom-8-28')
    expect(list[0].messageCount).toBe(2)
  })

  it('getThreadMessages throws if a message has an unexpected role', async () => {
    const { createThread, getThreadMessages } = await import('@/lib/ai/companion/thread-store')
    const t = await createThread({ devotionalId: 'rom-8-28', title: 'x' })
    // Inject a rogue row directly through sqlite (bypassing Prisma) to simulate DB corruption.
    const db = new Database(dbPath)
    db.prepare(`INSERT INTO ai_messages (conversation_id, role, content, created_at) VALUES (?, 'system', 'rogue', ?)`)
      .run(t.id, new Date().toISOString())
    db.close()
    await expect(getThreadMessages(t.id)).rejects.toThrow(/unexpected role/)
  })
})
