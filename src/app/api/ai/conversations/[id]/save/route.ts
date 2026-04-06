import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
        createdAt: now,
        updatedAt: now,
        messages: {
          create: messages.map((m) => ({
            role: m.role,
            content: m.content,
            createdAt: m.timestamp || now,
          })),
        },
      },
    })
    return NextResponse.json({ id: String(conversation.id) }, { status: 201 })
  }

  const convId = parseInt(id, 10)
  await prisma.aiConversation.update({
    where: { id: convId },
    data: { updatedAt: now },
  })
  for (const m of messages) {
    await prisma.aiMessage.create({
      data: {
        conversationId: convId,
        role: m.role,
        content: m.content,
        createdAt: m.timestamp || now,
      },
    })
  }

  return NextResponse.json({ id }, { status: 200 })
}
