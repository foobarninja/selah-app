// src/lib/ai/companion/require-owned.ts
//
// Ownership gate for AI conversations. Call this before reading or mutating
// messages in a conversation. Returns the conversation row on success, or
// null if the conversation doesn't exist or belongs to a different user —
// callers should translate null into a 404 (not 401/403, to avoid leaking
// whether a conversation exists under a different user).

import type { PrismaClient } from '@/generated/prisma/client'

export async function requireOwnedConversation(
  prisma: PrismaClient,
  userId: string,
  conversationId: number,
) {
  return prisma.aiConversation.findFirst({
    where: { id: conversationId, userId },
  })
}
