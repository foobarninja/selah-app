import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { id } = await params
  const conversationId = parseInt(id, 10)
  if (isNaN(conversationId)) {
    return NextResponse.json({ error: 'Invalid conversation id' }, { status: 400 })
  }

  const conversation = await prisma.aiConversation.findFirst({
    where: { id: conversationId, userId },
    include: { messages: { orderBy: { createdAt: 'asc' } } },
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
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { id } = await params
  const conversationId = parseInt(id, 10)
  if (isNaN(conversationId)) {
    return NextResponse.json({ error: 'Invalid conversation id' }, { status: 400 })
  }

  const { count } = await prisma.aiConversation.deleteMany({
    where: { id: conversationId, userId },
  })
  if (count === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ ok: true })
}
