import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

describe('audit/queries', () => {
  let dir: string
  let dbPath: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'selah-audit-'))
    dbPath = join(dir, 'test.db')
    const db = new Database(dbPath)
    db.exec(`
      CREATE TABLE user_profiles (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, avatar_color TEXT NOT NULL,
        pin_hash TEXT, is_default INTEGER NOT NULL DEFAULT 0,
        child_lock INTEGER NOT NULL DEFAULT 0,
        locked_provider TEXT, locked_model TEXT,
        audit_policy TEXT NOT NULL DEFAULT 'none',
        created_at TEXT NOT NULL DEFAULT '', updated_at TEXT NOT NULL DEFAULT ''
      );
      CREATE TABLE ai_conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT, title TEXT, context_ref TEXT,
        has_flagged_messages INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT '', updated_at TEXT NOT NULL DEFAULT ''
      );
      CREATE TABLE ai_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conversation_id INTEGER NOT NULL, role TEXT NOT NULL, content TEXT NOT NULL,
        provider_id TEXT, model_id TEXT,
        user_id TEXT, flag_level TEXT, flag_source TEXT, flag_reviewed_at TEXT,
        created_at TEXT NOT NULL DEFAULT ''
      );
    `)
    db.close()
    process.env.DATABASE_URL = `file:${dbPath}`
    const g = globalThis as unknown as { prisma?: unknown; prismaVersion?: unknown }
    g.prisma = undefined
    g.prismaVersion = undefined
    vi.resetModules()
  })

  afterEach(async () => {
    const { prisma } = await import('@/lib/db')
    await prisma.$disconnect()
    rmSync(dir, { recursive: true, force: true })
  })

  it('listAuditableProfiles returns child-locked profiles with flag counts', async () => {
    const { prisma } = await import('@/lib/db')
    await prisma.userProfile.create({ data: { id: 'p1', name: 'Alice', avatarColor: '#1', childLock: true, auditPolicy: 'flagged-only', createdAt: '', updatedAt: '' } })
    await prisma.userProfile.create({ data: { id: 'p2', name: 'Bob', avatarColor: '#2', childLock: false, createdAt: '', updatedAt: '' } })
    const conv = await prisma.aiConversation.create({ data: { userId: 'p1', title: 't', hasFlaggedMessages: true, createdAt: '', updatedAt: '' } })
    await prisma.aiMessage.create({ data: { conversationId: conv.id, role: 'user', content: 'x', userId: 'p1', flagLevel: 'critical', flagSource: 'keyword', createdAt: '' } })
    await prisma.aiMessage.create({ data: { conversationId: conv.id, role: 'user', content: 'y', userId: 'p1', flagLevel: 'concerning', flagSource: 'model', createdAt: '' } })

    const { listAuditableProfiles } = await import('@/lib/audit/queries')
    const rows = await listAuditableProfiles()
    expect(rows).toHaveLength(1)
    expect(rows[0].profile.id).toBe('p1')
    expect(rows[0].unreviewed.critical).toBe(1)
    expect(rows[0].unreviewed.concerning).toBe(1)
  })

  it('listFlaggedThreads returns threads with flags for a profile', async () => {
    const { prisma } = await import('@/lib/db')
    await prisma.userProfile.create({ data: { id: 'p1', name: 'A', avatarColor: '#1', childLock: true, auditPolicy: 'flagged-only', createdAt: '', updatedAt: '' } })
    const c1 = await prisma.aiConversation.create({ data: { userId: 'p1', title: 'flagged', hasFlaggedMessages: true, createdAt: '2026-04-20', updatedAt: '2026-04-20' } })
    await prisma.aiMessage.create({ data: { conversationId: c1.id, role: 'user', content: 'x', userId: 'p1', flagLevel: 'critical', flagSource: 'keyword', createdAt: '' } })
    await prisma.aiConversation.create({ data: { userId: 'p1', title: 'clean', hasFlaggedMessages: false, createdAt: '2026-04-20', updatedAt: '2026-04-20' } })

    const { listFlaggedThreads } = await import('@/lib/audit/queries')
    const threads = await listFlaggedThreads('p1')
    expect(threads).toHaveLength(1)
    expect(threads[0].id).toBe(c1.id)
  })

  it('markMessageReviewed writes flag_reviewed_at', async () => {
    const { prisma } = await import('@/lib/db')
    await prisma.userProfile.create({ data: { id: 'p1', name: 'A', avatarColor: '#1', childLock: true, auditPolicy: 'flagged-only', createdAt: '', updatedAt: '' } })
    const c = await prisma.aiConversation.create({ data: { userId: 'p1', title: 't', hasFlaggedMessages: true, createdAt: '', updatedAt: '' } })
    const m = await prisma.aiMessage.create({ data: { conversationId: c.id, role: 'user', content: 'x', userId: 'p1', flagLevel: 'critical', flagSource: 'keyword', createdAt: '' } })

    const { markMessageReviewed } = await import('@/lib/audit/queries')
    await markMessageReviewed(m.id)

    const after = await prisma.aiMessage.findUnique({ where: { id: m.id } })
    expect(after?.flagReviewedAt).toBeTruthy()
  })
})
