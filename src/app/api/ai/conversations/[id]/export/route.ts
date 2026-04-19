import { NextRequest, NextResponse } from 'next/server'
import { generateConversationDocx } from '@/lib/export/targets/ai-conversation'
import { renderConversationToMarkdown } from '@/lib/export/markdown/renderers'
import { prisma } from '@/lib/db'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

  const format = request.nextUrl.searchParams.get('format') ?? 'docx'
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)

  try {
    if (format === 'markdown' || format === 'md') {
      const conv = await prisma.aiConversation.findFirst({
        where: { id: conversationId, userId },
        include: { messages: { orderBy: { createdAt: 'asc' } } },
      })
      if (!conv) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
      }
      const md = renderConversationToMarkdown(conv)
      return new NextResponse(md, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Content-Disposition': `attachment; filename="selah-conversation-${timestamp}.md"`,
        },
      })
    }

    const exists = await prisma.aiConversation.findFirst({
      where: { id: conversationId, userId },
      select: { id: true },
    })
    if (!exists) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const buffer = await generateConversationDocx(conversationId)
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="selah-conversation-${timestamp}.docx"`,
      },
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Export failed'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
