// src/lib/ai/companion/context-ref.ts
//
// Namespaced contextRef for devotional companion threads. Stored in
// ai_conversations.context_ref so we can filter conversations by
// feature (companion) and by devotional id.

const PREFIX = 'devotional-companion:'

export function toContextRef(devotionalId: string): string {
  if (!devotionalId) throw new Error('toContextRef: devotionalId is empty')
  return `${PREFIX}${devotionalId}`
}

export function parseContextRef(ref: string | null | undefined): { devotionalId: string } | null {
  if (typeof ref !== 'string' || !ref.startsWith(PREFIX)) return null
  const devotionalId = ref.slice(PREFIX.length)
  if (!devotionalId) return null
  return { devotionalId }
}

export function isCompanionContextRef(ref: string | null | undefined): boolean {
  return parseContextRef(ref) !== null
}
