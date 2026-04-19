import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const { title, contextRef, messages } = body as {
    title?: string
    contextRef?: string
    messages: Array<{ role: string; content: string; timestamp: string }>
  }

  const now = new Date().toISOString()

  if (id === 'new') {
    const conversation = await prisma.aiConversation.create({
      data: {
        title: title || 'Saved conversation',
        contextRef: contextRef || null,
        userId,
        createdAt: now,
        updatedAt: now,
        messages: {
          create: messages.map((m) => ({
            role: m.role,
            content: m.content,
            userId,
            createdAt: m.timestamp || now,
          })),
        },
      },
    })
    return NextResponse.json({ id: String(conversation.id) }, { status: 201 })
  }

  const convId = parseInt(id, 10)
  if (isNaN(convId)) {
    return NextResponse.json({ error: 'Invalid conversation id' }, { status: 400 })
  }

  const { count } = await prisma.aiConversation.updateMany({
    where: { id: convId, userId },
    data: { updatedAt: now },
  })
  if (count === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  for (const m of messages) {
    await prisma.aiMessage.create({
      data: {
        conversationId: convId,
        role: m.role,
        content: m.content,
        userId,
        createdAt: m.timestamp || now,
      },
    })
  }

  return NextResponse.json({ id }, { status: 200 })
}
