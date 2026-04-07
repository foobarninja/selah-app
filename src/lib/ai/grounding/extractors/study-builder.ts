import { getProject, getProjectItems } from '@/lib/study-builder/queries'
import { getChapterText } from '@/lib/reader/queries'
import { prisma } from '@/lib/db'
import { BOOK_NAMES } from '@/lib/constants'
import type { StudyBuilderContext } from '../../types'

const MAX_ITEMS = 15

/** Reverse lookup: display name → book ID */
const BOOK_IDS_BY_NAME = Object.fromEntries(
  Object.entries(BOOK_NAMES).map(([id, name]) => [name, id])
)

/** Parse a verse ref like "1 Kings 21:1" → { bookId: "1KI", chapter: 21, verse: 1 } */
function parseVerseRef(ref: string): { bookId: string; chapter: number; verse: number } | null {
  const match = ref.match(/^(.+?)\s+(\d+):(\d+)$/)
  if (!match) return null
  const bookName = match[1]
  const bookId = BOOK_IDS_BY_NAME[bookName]
  if (!bookId) return null
  return { bookId, chapter: parseInt(match[2], 10), verse: parseInt(match[3], 10) }
}

export async function extractStudyBuilderContext(ctx: StudyBuilderContext): Promise<string> {
  const { projectId } = ctx

  const [project, items] = await Promise.all([
    getProject(projectId),
    getProjectItems(projectId),
  ])

  if (!project) return ''

  const parts: string[] = []

  // ── Header ────────────────────────────────────────────────────────────────
  parts.push(`## Study Project: "${project.topic}"`)
  parts.push(`Format: ${project.format} | Last saved: ${project.lastSaved}`)

  // ── Assembly items ────────────────────────────────────────────────────────
  if (items.length === 0) {
    parts.push('\n*No items assembled yet.*')
    return parts.join('\n')
  }

  parts.push(`\n### Assembled Items (${items.length} total)`)

  const displayItems = items.slice(0, MAX_ITEMS)
  for (const item of displayItems) {
    const tierLabel = `Tier ${item.sourceTier}`
    parts.push(`\n**[${item.entityType}]** ${item.title} *(${tierLabel})*`)
    if (item.preview) {
      parts.push(`  ${item.preview}`)
    }
    if (item.annotation) {
      parts.push(`  *Note: ${item.annotation}*`)
    }
  }

  if (items.length > MAX_ITEMS) {
    parts.push(`\n*(${items.length - MAX_ITEMS} more items not shown)*`)
  }

  // ── Fetch actual verse text for verse items ───────────────────────────────
  // Group verse items by book+chapter, fetch chapter text, include relevant verses
  const verseItems = displayItems.filter((i) => i.entityType === 'verse' || i.entityType === 'passage')
  if (verseItems.length > 0) {
    // Collect unique chapters needed
    const chaptersNeeded = new Map<string, { bookId: string; chapter: number; verses: number[] }>()
    for (const item of verseItems) {
      const parsed = parseVerseRef(item.entityId || item.title)
      if (!parsed) continue
      const key = `${parsed.bookId}:${parsed.chapter}`
      const existing = chaptersNeeded.get(key)
      if (existing) {
        existing.verses.push(parsed.verse)
      } else {
        chaptersNeeded.set(key, { bookId: parsed.bookId, chapter: parsed.chapter, verses: [parsed.verse] })
      }
    }

    // Fetch chapter text for each unique chapter
    for (const [, { bookId, chapter, verses }] of chaptersNeeded) {
      const bookName = BOOK_NAMES[bookId] ?? bookId
      const chapterVerses = await getChapterText('BSB', bookId, chapter)
      if (chapterVerses.length === 0) continue

      parts.push(`\n### Full Text: ${bookName} ${chapter}`)
      // Include the full chapter so the model has proper context
      for (const v of chapterVerses) {
        parts.push(`${v.number}. ${v.text}`)
      }
    }
  }

  // ── Fetch commentary text for commentary items ─────────────────────────
  const commentaryItems = displayItems.filter((i) => i.entityType === 'commentary')
  if (commentaryItems.length > 0) {
    parts.push('\n### Commentary Excerpts')
    for (const item of commentaryItems) {
      const commentaryId = parseInt(item.entityId || item.id.replace('commentary:', ''), 10)
      if (isNaN(commentaryId)) continue
      const entry = await prisma.commentaryEntry.findUnique({
        where: { id: commentaryId },
        include: { source: { select: { englishName: true } } },
      }).catch(() => null)
      if (entry) {
        const bookName = BOOK_NAMES[entry.bookId] ?? entry.bookId
        const verseRef = entry.verse ? `:${entry.verse}` : ''
        const excerpt = entry.text.length > 600 ? entry.text.slice(0, 600) + '...' : entry.text
        parts.push(`\n**${entry.source.englishName}** (${bookName} ${entry.chapter}${verseRef}): ${excerpt}`)
      }
    }
  }

  // ── Fetch scene cast details for scene-cast items ─────────────────────
  const sceneCastItems = displayItems.filter((i) => i.entityType === 'scene-cast')
  if (sceneCastItems.length > 0) {
    parts.push('\n### Scene Cast')
    for (const item of sceneCastItems) {
      const castId = parseInt(item.entityId || item.id.replace('scene-cast:', ''), 10)
      if (isNaN(castId)) continue
      const appearance = await prisma.characterAppearance.findUnique({
        where: { id: castId },
        include: { character: { select: { name: true, bioBrief: true, faithJourney: true } } },
      }).catch(() => null)
      if (appearance) {
        const bookName = BOOK_NAMES[appearance.bookId] ?? appearance.bookId
        const lines = [`**${appearance.character.name}** in ${bookName} ${appearance.chapter} (${appearance.role})`]
        if (appearance.emotionalState) lines.push(`  Emotional state: ${appearance.emotionalState}`)
        if (appearance.motivation) lines.push(`  Motivation: ${appearance.motivation}`)
        if (appearance.stakes) lines.push(`  Stakes: ${appearance.stakes}`)
        if (appearance.narrativeNote) lines.push(`  ${appearance.narrativeNote}`)
        if (appearance.character.bioBrief) lines.push(`  Bio: ${appearance.character.bioBrief}`)
        parts.push('\n' + lines.join('\n'))
      }
    }
  }

  return parts.join('\n')
}
