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

  // ── Narrative context for passage items ─────────────────────────────
  const passageItems = displayItems.filter((i) => i.entityType === 'passage')
  if (passageItems.length > 0) {
    const narrativeIds = passageItems.map((i) => i.entityId).filter(Boolean)
    if (narrativeIds.length > 0) {
      const narratives = await prisma.narrativeUnit.findMany({
        where: { id: { in: narrativeIds } },
      })
      if (narratives.length > 0) {
        parts.push('\n### Narrative Context')
        for (const nu of narratives) {
          parts.push(`\n**"${nu.title}"**`)
          if (nu.summary) parts.push(nu.summary)
          if (nu.significance) parts.push(`\n**Theological Significance:** ${nu.significance}`)
          if (nu.relationalNote) parts.push(`\n**Relational Dynamics:** ${nu.relationalNote}`)
          if (nu.conceptualNote) parts.push(`\n**Conceptual Background:** ${nu.conceptualNote}`)
          if (nu.climateNote) parts.push(`\n**Climate/Cultural Context:** ${nu.climateNote}`)
          if (nu.keyQuestions) {
            try {
              const questions = JSON.parse(nu.keyQuestions) as string[]
              parts.push(`\n**Key Questions:**`)
              for (const q of questions) parts.push(`- ${q}`)
            } catch { /* skip malformed JSON */ }
          }
          if (nu.preachingAngles) {
            try {
              const angles = JSON.parse(nu.preachingAngles) as string[]
              parts.push(`\n**Preaching Angles:**`)
              for (const a of angles) parts.push(`- ${a}`)
            } catch { /* skip */ }
          }
        }
      }
    }
  }

  // ── Theme definitions ───────────────────────────────────────────────
  const themeItems = displayItems.filter((i) => i.entityType === 'theme')
  if (themeItems.length > 0) {
    const themeIds = themeItems.map((i) => i.entityId).filter(Boolean)
    if (themeIds.length > 0) {
      const themes = await prisma.theme.findMany({
        where: { id: { in: themeIds } },
        select: { id: true, name: true, definition: true, category: true, modernFraming: true },
      })
      if (themes.length > 0) {
        parts.push('\n### Theme Definitions')
        for (const t of themes) {
          parts.push(`\n**${t.name}** (${t.category ?? 'general'})`)
          if (t.definition) parts.push(`Definition: ${t.definition}`)
          if (t.modernFraming) parts.push(`Modern framing: ${t.modernFraming}`)
        }
      }
    }
  }

  // ── Character profiles ──────────────────────────────────────────────
  const characterItems = displayItems.filter((i) => i.entityType === 'character')
  if (characterItems.length > 0) {
    const charIds = characterItems.map((i) => i.entityId).filter(Boolean)
    if (charIds.length > 0) {
      const characters = await prisma.character.findMany({
        where: { id: { in: charIds } },
        select: {
          id: true, name: true, era: true, occupation: true,
          bioBrief: true, faithJourney: true, modernParallel: true,
          relationshipsA: {
            select: { relationship: true, charB: { select: { name: true } } },
            take: 8,
          },
        },
      })
      if (characters.length > 0) {
        parts.push('\n### Character Profiles')
        for (const c of characters) {
          const lines: string[] = [`\n**${c.name}**`]
          if (c.era) lines.push(`Era: ${c.era}`)
          if (c.occupation) lines.push(`Role: ${c.occupation}`)
          if (c.bioBrief) lines.push(`Bio: ${c.bioBrief}`)
          if (c.faithJourney) lines.push(`Faith journey: ${c.faithJourney.slice(0, 400)}`)
          if (c.modernParallel) lines.push(`Modern parallel: ${c.modernParallel}`)
          if (c.relationshipsA.length > 0) {
            const rels = c.relationshipsA.map((r: { relationship: string; charB: { name: string } }) => `${r.relationship}: ${r.charB.name}`).join(', ')
            lines.push(`Key relationships: ${rels}`)
          }
          parts.push(lines.join('\n  '))
        }
      }
    }
  }

  // ── Climate contexts ────────────────────────────────────────────────
  const climateItems = displayItems.filter((i) => i.entityType === 'climate')
  if (climateItems.length > 0) {
    const climateIds = climateItems.map((i) => i.entityId).filter(Boolean)
    if (climateIds.length > 0) {
      const climates = await prisma.climateContext.findMany({
        where: { id: { in: climateIds } },
      })
      if (climates.length > 0) {
        parts.push('\n### Historical & Cultural Climate')
        for (const c of climates) {
          parts.push(`\n**${c.name}** (${c.era}${c.dateRange ? `, ${c.dateRange}` : ''})`)
          if (c.geographic) parts.push(`\n*Geographic setting:* ${c.geographic}`)
          if (c.political) parts.push(`\n*Political landscape:* ${c.political}`)
          if (c.economic) parts.push(`\n*Economic conditions:* ${c.economic}`)
          if (c.social) parts.push(`\n*Social structures:* ${c.social}`)
          if (c.religious) parts.push(`\n*Religious environment:* ${c.religious}`)
          if (c.dailyLife) parts.push(`\n*Daily life:* ${c.dailyLife}`)
          if (c.modernParallel) parts.push(`\n*Modern parallel:* ${c.modernParallel}`)
        }
      }
    }
  }

  // ── Cross-reference target text ─────────────────────────────────────
  const crossRefItems = displayItems.filter((i) => i.entityType === 'cross-reference')
  if (crossRefItems.length > 0) {
    parts.push('\n### Cross-Reference Texts')
    for (const item of crossRefItems) {
      const crId = parseInt(item.entityId || item.id.replace('cross-reference:', ''), 10)
      if (isNaN(crId)) continue
      const cr = await prisma.crossReference.findUnique({
        where: { id: crId },
      }).catch(() => null)
      if (!cr) continue

      const targetBookName = BOOK_NAMES[cr.targetBook] ?? cr.targetBook
      const endVerse = cr.targetEndVerse ? `-${cr.targetEndVerse}` : ''
      const ref = `${targetBookName} ${cr.targetChapter}:${cr.targetVerse}${endVerse}`

      // Fetch the target verse text
      const targetVerses = await getChapterText('BSB', cr.targetBook, cr.targetChapter)
      const start = cr.targetVerse
      const end = cr.targetEndVerse ?? cr.targetVerse
      const relevantVerses = targetVerses.filter((v) => v.number >= start && v.number <= end)

      if (relevantVerses.length > 0) {
        parts.push(`\n**${ref}:**`)
        for (const v of relevantVerses) {
          parts.push(`${v.number}. ${v.text}`)
        }
      }
    }
  }

  return parts.join('\n')
}
