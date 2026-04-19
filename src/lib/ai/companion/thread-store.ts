// src/lib/ai/companion/thread-store.ts
//
// Thin persistence layer over ai_conversations + ai_messages for the
// devotional companion. Routes-layer code should not touch Prisma
// directly; everything funnels through here so thread lifecycle is
// testable in isolation.

import { prisma } from '@/lib/db'
import { toContextRef } from './context-ref'
import type { CompanionMessage, CompanionThreadSummary } from './types'

interface CreateThreadInput {
  devotionalId: string
  title: string
}

interface AppendMessageInput {
  role: 'user' | 'assistant'
  content: string
  providerId?: string | null
  modelId?: string | null
}

export async function createThread(input: CreateThreadInput): Promise<CompanionThreadSummary> {
  const now = new Date().toISOString()
  const row = await prisma.aiConversation.create({
    data: {
      title: input.title,
      contextRef: toContextRef(input.devotionalId),
      createdAt: now,
      updatedAt: now,
    },
  })
  return { id: row.id, title: row.title ?? '', createdAt: row.createdAt, updatedAt: row.updatedAt, messageCount: 0 }
}

export async function findActiveThread(devotionalId: string): Promise<CompanionThreadSummary | null> {
  const row = await prisma.aiConversation.findFirst({
    where: { contextRef: toContextRef(devotionalId) },
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

export async function listThreads(devotionalId: string): Promise<CompanionThreadSummary[]> {
  const rows = await prisma.aiConversation.findMany({
    where: { contextRef: toContextRef(devotionalId) },
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

export async function getThreadMessages(conversationId: number): Promise<CompanionMessage[]> {
  const rows = await prisma.aiMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
  })
  return rows.map((r) => ({
    id: r.id,
    role: r.role as 'user' | 'assistant',
    content: r.content,
    createdAt: r.createdAt,
  }))
}

export async function appendMessage(conversationId: number, input: AppendMessageInput): Promise<CompanionMessage> {
  const now = new Date().toISOString()
  const [message] = await prisma.$transaction([
    prisma.aiMessage.create({
      data: {
        conversationId,
        role: input.role,
        content: input.content,
        providerId: input.providerId ?? null,
        modelId: input.modelId ?? null,
        createdAt: now,
      },
    }),
    prisma.aiConversation.update({ where: { id: conversationId }, data: { updatedAt: now } }),
  ])
  return {
    id: message.id,
    role: message.role as 'user' | 'assistant',
    content: message.content,
    createdAt: message.createdAt,
  }
}
