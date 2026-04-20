// src/lib/ai/companion/thread-store.ts
//
// Thin persistence layer over ai_conversations + ai_messages for the
// devotional companion. Routes-layer code should not touch Prisma
// directly; everything funnels through here so thread lifecycle is
// testable in isolation.

import { prisma } from '@/lib/db'
import type { FlagLevel, FlagSource } from '@/lib/safety/types'
import { toContextRef } from './context-ref'
import type { CompanionMessage, CompanionThreadSummary } from './types'

interface CreateThreadInput {
  devotionalId: string
  title: string
  userId: string
}

interface AppendMessageInput {
  role: 'user' | 'assistant'
  content: string
  providerId?: string | null
  modelId?: string | null
  userId: string
  flagLevel?: FlagLevel | null
  flagSource?: FlagSource | null
}

export async function createThread(input: CreateThreadInput): Promise<CompanionThreadSummary> {
  const now = new Date().toISOString()
  const row = await prisma.aiConversation.create({
    data: {
      title: input.title,
      contextRef: toContextRef(input.devotionalId),
      userId: input.userId,
      createdAt: now,
      updatedAt: now,
    },
  })
  return { id: row.id, title: row.title ?? '', createdAt: row.createdAt, updatedAt: row.updatedAt, messageCount: 0 }
}

export async function findActiveThread(devotionalId: string, userId: string): Promise<CompanionThreadSummary | null> {
  const row = await prisma.aiConversation.findFirst({
    where: { contextRef: toContextRef(devotionalId), userId },
    orderBy: { updatedAt: 'desc' },
    include: { _count: { select: { messages: true } } },
  })
  if (!row) return null
  return {
    id: row.id,
    title: row.title ?? '',
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    messageCount: row._count.messages,
  }
}

export async function listThreads(devotionalId: string, userId: string): Promise<CompanionThreadSummary[]> {
  const rows = await prisma.aiConversation.findMany({
    where: { contextRef: toContextRef(devotionalId), userId },
    orderBy: { updatedAt: 'desc' },
    include: { _count: { select: { messages: true } } },
  })
  return rows.map((row) => ({
    id: row.id,
    title: row.title ?? '',
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    messageCount: row._count.messages,
  }))
}

function narrowRole(role: string, messageId: number): 'user' | 'assistant' {
  if (role !== 'user' && role !== 'assistant') {
    throw new Error(`thread-store: unexpected role '${role}' on message ${messageId}`)
  }
  return role
}

export async function getThreadMessages(conversationId: number, userId: string): Promise<CompanionMessage[]> {
  const rows = await prisma.aiMessage.findMany({
    where: { conversationId, userId },
    orderBy: { createdAt: 'asc' },
  })
  return rows.map((r) => ({
    id: r.id,
    role: narrowRole(r.role, r.id),
    content: r.content,
    createdAt: r.createdAt,
  }))
}

export async function appendMessage(conversationId: number, input: AppendMessageInput): Promise<CompanionMessage> {
  const now = new Date().toISOString()
  const flagLevel = input.flagLevel ?? null
  const flagSource = input.flagSource ?? null

  const message = await prisma.$transaction(async (tx) => {
    const created = await tx.aiMessage.create({
      data: {
        conversationId,
        role: input.role,
        content: input.content,
        providerId: input.providerId ?? null,
        modelId: input.modelId ?? null,
        userId: input.userId,
        flagLevel,
        flagSource,
        createdAt: now,
      },
    })
    await tx.aiConversation.update({
      where: { id: conversationId },
      data: { updatedAt: now },
    })
    if (flagLevel) {
      await tx.aiConversation.update({
        where: { id: conversationId },
        data: { hasFlaggedMessages: true },
      })
    }
    return created
  })

  return {
    id: message.id,
    role: narrowRole(message.role, message.id),
    content: message.content,
    createdAt: message.createdAt,
  }
}
