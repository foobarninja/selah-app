import { Paragraph } from 'docx'
import { prisma } from '@/lib/db'
import {
  buildCoverPage,
  buildFooter,
  buildMetadataLine,
  packDocument,
} from '../docx/primitives'
import { renderMarkdownToParagraphs } from '../docx/markdown'
import { DOCX_COLORS } from '../constants'
import { formatDate, formatTime, formatExportDate } from '../formatters'

/**
 * Generate a DOCX transcript of an AI conversation.
 *
 * Layout:
 *   Cover (conversation title, start date)
 *   For each message (skipping system):
 *     Metadata line (speaker + timestamp)
 *     Message body rendered from markdown (honors tier labels inline)
 *   Footer
 */
export async function generateConversationDocx(conversationId: number): Promise<Buffer> {
  const conv = await prisma.aiConversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  })
  if (!conv) throw new Error(`Conversation ${conversationId} not found`)

  const title = conv.title || 'AI Conversation'
  // createdAt is stored as String in the DB schema
  const startDate = formatDate(conv.createdAt, 'long')

  const sections: Paragraph[] = []

  sections.push(
    ...buildCoverPage({
      title,
      subtitle: 'An AI-assisted Bible study conversation',
      metadata: `Started: ${startDate}`,
    }),
  )

  for (const msg of conv.messages) {
    if (msg.role === 'system') continue

    const speaker = msg.role === 'user' ? 'You' : 'Assistant'
    const timeLabel = `${formatDate(msg.createdAt, 'short')} · ${formatTime(msg.createdAt)}`

    sections.push(
      buildMetadataLine([
        { text: `[${speaker.toUpperCase()}]`, bold: true },
        { text: `  ${timeLabel}`, color: DOCX_COLORS.muted },
      ]),
    )

    sections.push(...renderMarkdownToParagraphs(msg.content))
  }

  return packDocument(sections, buildFooter(`Exported from Selah · ${formatExportDate()}`))
}
