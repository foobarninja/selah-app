import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const conversations = await prisma.aiConversation.findMany({
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
