// src/lib/audit/queries.ts
//
// Queries for the parent audit dashboard. All queries return flags
// scoped to child-locked profiles. Access is gated at the API layer
// (only adult profiles may call these endpoints).

import { prisma } from '@/lib/db'
import type { FlagLevel } from '@/lib/safety/types'

export interface AuditProfileSummary {
  profile: {
    id: string
    name: string
    avatarColor: string
    auditPolicy: 'none' | 'flagged-only' | 'full'
  }
  unreviewed: {
    critical: number
    concerning: number
    sensitive: number
  }
  lastFlaggedAt: string | null
}

export interface FlaggedThreadSummary {
  id: number
  title: string | null
  updatedAt: string
  flaggedCount: number
  unreviewedCount: number
}

export async function listAuditableProfiles(): Promise<AuditProfileSummary[]> {
  const profiles = await prisma.userProfile.findMany({
    where: { childLock: true },
    orderBy: { name: 'asc' },
  })

  const results: AuditProfileSummary[] = []
  for (const p of profiles) {
    const unreviewed = await prisma.aiMessage.groupBy({
      by: ['flagLevel'],
      where: { userId: p.id, flagReviewedAt: null, flagLevel: { not: null } },
      _count: { _all: true },
    })
    const counts = { critical: 0, concerning: 0, sensitive: 0 }
    for (const row of unreviewed) {
      const lvl = row.flagLevel as FlagLevel | null
      if (lvl === 'critical' || lvl === 'concerning' || lvl === 'sensitive') {
        counts[lvl] = row._count._all
      }
    }
    const latestFlagged = await prisma.aiMessage.findFirst({
      where: { userId: p.id, flagLevel: { not: null } },
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true },
    })
    results.push({
      profile: {
        id: p.id,
        name: p.name,
        avatarColor: p.avatarColor,
        auditPolicy: p.auditPolicy as 'none' | 'flagged-only' | 'full',
      },
      unreviewed: counts,
      lastFlaggedAt: latestFlagged?.createdAt ?? null,
    })
  }
  return results
}

export async function listFlaggedThreads(profileId: string): Promise<FlaggedThreadSummary[]> {
  const threads = await prisma.aiConversation.findMany({
    where: { userId: profileId, hasFlaggedMessages: true },
    orderBy: { updatedAt: 'desc' },
  })
  const out: FlaggedThreadSummary[] = []
  for (const t of threads) {
    const flagged = await prisma.aiMessage.count({ where: { conversationId: t.id, flagLevel: { not: null } } })
    const unreviewed = await prisma.aiMessage.count({ where: { conversationId: t.id, flagLevel: { not: null }, flagReviewedAt: null } })
    out.push({
      id: t.id,
      title: t.title ?? null,
      updatedAt: t.updatedAt,
      flaggedCount: flagged,
      unreviewedCount: unreviewed,
    })
  }
  return out
}

export async function getThreadForAudit(profileId: string, threadId: number, policy: 'flagged-only' | 'full') {
  const thread = await prisma.aiConversation.findFirst({
    where: { id: threadId, userId: profileId },
    include: { messages: { orderBy: { createdAt: 'asc' } } },
  })
  if (!thread) return null

  if (policy === 'full') return thread

  const messages = thread.messages
  const keep = new Set<number>()
  messages.forEach((m, idx) => {
    if (m.flagLevel) {
      keep.add(idx)
      if (idx > 0) keep.add(idx - 1)
      if (idx < messages.length - 1) keep.add(idx + 1)
    }
  })
  const filtered = messages.filter((_, idx) => keep.has(idx))
  return { ...thread, messages: filtered }
}

export async function markMessageReviewed(messageId: number): Promise<void> {
  await prisma.aiMessage.update({
    where: { id: messageId },
    data: { flagReviewedAt: new Date().toISOString() },
  })
}
