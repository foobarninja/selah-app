import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const conversation = await prisma.aiConversation.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      messages: { orderBy: { createdAt: 'asc' } },
    },
  })

  if (!conversation) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({
    id: String(conversation.id),
    title: conversation.title,
    contextRef: conversation.contextRef,
    messages: conversation.messages.map((m) => ({
      id: String(m.id),
      role: m.role,
      content: m.content,
      timestamp: m.createdAt,
    })),
  })
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.aiConversation.delete({
    where: { id: parseInt(id, 10) },
  })
  return NextResponse.json({ ok: true })
}
