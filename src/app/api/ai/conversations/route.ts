import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET() {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const conversations = await prisma.aiConversation.findMany({
    where: {
      userId,
      NOT: { contextRef: { startsWith: 'devotional-companion:' } },
    },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      contextRef: true,
      updatedAt: true,
      _count: { select: { messages: true } },
    },
  })

  return NextResponse.json(
    conversations.map((c) => ({
      id: String(c.id),
      groundingLabel: c.title || c.contextRef || 'Untitled',
      messageCount: c._count.messages,
      date: c.updatedAt,
    }))
  )
}
