import { buildFrontmatter } from './primitives'

// Types kept loose here since these renderers accept raw Prisma shapes
// and we want to avoid a circular dep with generated client types.
type NoteLike = {
  title: string | null
  noteType: string
  content: string
  createdAt: string | Date
  anchors: Array<{
    bookId: string | null
    chapter: number | null
    verseStart: number | null
    refId: string | null
  }>
}

type CollectionLike = {
  title: string
  description: string | null
  items: Array<{
    itemType: string
    itemRef: string
    note: string | null
    sortOrder: number
  }>
}

type ConversationMessage = {
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: string | Date
}

type ConversationLike = {
  title: string | null
  createdAt: string | Date
  messages: ConversationMessage[]
}

/** Render a journal notes array to a Markdown string. */
export function renderJournalToMarkdown(notes: NoteLike[]): string {
  const lines: string[] = [buildFrontmatter('Journal Export')]

  for (const note of notes) {
    lines.push(`## ${note.title || 'Untitled'} (${note.noteType})`)
    lines.push(`Created: ${toIso(note.createdAt)}`)

    if (note.anchors.length > 0) {
      const anchorStrs = note.anchors.map((a) =>
        a.bookId ? `${a.bookId} ${a.chapter}:${a.verseStart}` : a.refId || 'unknown',
      )
      lines.push(`Anchored to: ${anchorStrs.join(', ')}`)
    }
    lines.push('', note.content, '', '---', '')
  }
  return lines.join('\n')
}

/** Render a user collections array to a Markdown string. */
export function renderCollectionToMarkdown(collections: CollectionLike[]): string {
  const lines: string[] = [buildFrontmatter('Collections Export')]

  for (const col of collections) {
    lines.push(`## ${col.title}`)
    if (col.description) lines.push(col.description)
    lines.push('')
    for (const item of col.items) {
      lines.push(`- [${item.itemType}] ${item.itemRef}${item.note ? ` — ${item.note}` : ''}`)
    }
    lines.push('', '---', '')
  }
  return lines.join('\n')
}

/** Render an AI conversation transcript to a Markdown string. */
export function renderConversationToMarkdown(conversation: ConversationLike): string {
  const title = conversation.title || 'AI Conversation'
  const lines: string[] = [buildFrontmatter(title, `Started: ${toIso(conversation.createdAt)}`)]

  for (const msg of conversation.messages) {
    if (msg.role === 'system') continue
    const speaker = msg.role === 'user' ? 'You' : 'Assistant'
    lines.push(`### ${speaker} — ${toIso(msg.createdAt)}`)
    lines.push('')
    lines.push(msg.content)
    lines.push('', '---', '')
  }
  return lines.join('\n')
}

function toIso(d: string | Date): string {
  return typeof d === 'string' ? d : d.toISOString()
}
