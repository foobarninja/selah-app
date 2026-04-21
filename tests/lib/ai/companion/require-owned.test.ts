import { describe, it, expect } from 'vitest'
import Database from 'better-sqlite3'
import type { PrismaClient } from '@/generated/prisma/client'
import { requireOwnedConversation } from '@/lib/ai/companion/require-owned'

// We stand up a minimal in-memory DB and a narrow Prisma-shaped stub so the
// ownership gate can be tested without booting the full ORM.
function makePrisma() {
  const raw = new Database(':memory:')
  raw.exec(`
    CREATE TABLE ai_conversations (
      id INTEGER PRIMARY KEY,
      user_id TEXT,
      title TEXT,
      context_ref TEXT,
      has_flagged_messages INTEGER DEFAULT 0,
      flag_reviewed_at TEXT,
      created_at TEXT,
      updated_at TEXT
    );
  `)
  raw.prepare(
    'INSERT INTO ai_conversations (id,user_id,title,context_ref,created_at,updated_at) VALUES (?,?,?,?,?,?)',
  ).run(1, 'user-alice', 'Alice chat', 'GEN:1', '2026-01-01', '2026-01-01')
  raw.prepare(
    'INSERT INTO ai_conversations (id,user_id,title,context_ref,created_at,updated_at) VALUES (?,?,?,?,?,?)',
  ).run(2, 'user-bob', 'Bob chat', 'ROM:8', '2026-01-01', '2026-01-01')

  const prisma = {
    aiConversation: {
      findFirst: async ({ where }: { where: { id: number; userId: string } }) => {
        const row = raw
          .prepare('SELECT id, user_id FROM ai_conversations WHERE id = ? AND user_id = ?')
          .get(where.id, where.userId) as { id: number; user_id: string } | undefined
        return row ? { id: row.id, userId: row.user_id } : null
      },
    },
  } as unknown as PrismaClient
  return prisma
}

describe('requireOwnedConversation', () => {
  it('returns the conversation when owned by userId', async () => {
    const prisma = makePrisma()
    const result = await requireOwnedConversation(prisma, 'user-alice', 1)
    expect(result).not.toBeNull()
    expect(result?.id).toBe(1)
  })

  it('returns null when conversation belongs to a different user', async () => {
    const prisma = makePrisma()
    const result = await requireOwnedConversation(prisma, 'user-alice', 2)
    expect(result).toBeNull()
  })

  it('returns null when conversation does not exist', async () => {
    const prisma = makePrisma()
    const result = await requireOwnedConversation(prisma, 'user-alice', 999)
    expect(result).toBeNull()
  })
})
