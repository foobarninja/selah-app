import { getChapterText, getPassageContext } from '@/lib/reader/queries'
import { BOOK_NAMES } from '@/lib/constants'
import { prisma } from '@/lib/db'
import type { ReaderContext, ContextSection } from '../../types'

export async function extractReaderContext(ctx: ReaderContext): Promise<ContextSection[]> {
  const { bookId, chapter, verse, translationId = 'BSB' } = ctx
  const bookName = BOOK_NAMES[bookId] ?? bookId

  // Run queries individually so failures in enrichment don't break core data
  const [verses, passageCtx] = await Promise.all([
    getChapterText(translationId, bookId, chapter),
    getPassageContext(bookId, chapter, 1, 999),
  ])

  const narrativeUnit = await prisma.narrativeUnit.findFirst({
    where: {
      bookId,
      chapterStart: { lte: chapter },
      OR: [{ chapterEnd: { gte: chapter } }, { chapterEnd: null }],
    },
    orderBy: [{ chapterStart: 'desc' }, { verseStart: 'desc' }],
  }).catch(() => null)

  const strongsMappings = await prisma.strongsVerseMap.findMany({
    where: { bookId, chapter },
    include: { entry: true },
    orderBy: [{ verse: 'asc' }, { wordPosition: 'asc' }],
  }).catch(() => [])

  const footnotes = await prisma.footnote.findMany({
    where: { bookId, chapter },
    orderBy: { verse: 'asc' },
  }).catch(() => [])

  // ── Adjacent chapter text when narrative spans multiple chapters ─────────
  // If the narrative unit extends beyond this chapter, fetch surrounding chapters
  // so the model has the resolution text (e.g., Job 42 when reading Job 38)
  const adjacentChapters: Array<{ chapter: number; verses: Array<{ number: number; text: string }> }> = []
  if (narrativeUnit) {
    const chaptersToFetch: number[] = []
    const nuStart = narrativeUnit.chapterStart
    const nuEnd = narrativeUnit.chapterEnd ?? narrativeUnit.chapterStart

    // Fetch other chapters in this narrative unit (up to 4 additional)
    for (let c = nuStart; c <= nuEnd && chaptersToFetch.length < 4; c++) {
      if (c !== chapter) chaptersToFetch.push(c)
    }

    // Also fetch the resolution chapter (one past the narrative unit end)
    const resolutionChapter = nuEnd + 1
    if (resolutionChapter !== chapter && !chaptersToFetch.includes(resolutionChapter)) {
      chaptersToFetch.push(resolutionChapter)
    }

    const adjacentResults = await Promise.all(
      chaptersToFetch.map(async (c) => {
        const v = await getChapterText(translationId, bookId, c)
        return { chapter: c, verses: v }
      })
    )
    for (const r of adjacentResults) {
      if (r.verses.length > 0) adjacentChapters.push(r)
    }
  }

  const sections: ContextSection[] = []

  // ── Passage header + Narrative context ────────────────────────────────────
  {
    const lines: string[] = []
    lines.push(`## Passage: ${bookName} ${chapter}`)
    if (narrativeUnit) {
      lines.push(`\n### Narrative Context: "${narrativeUnit.title}"`)
      if (narrativeUnit.summary) lines.push(narrativeUnit.summary)
      if (narrativeUnit.significance) lines.push(`\n**Theological Significance:** ${narrativeUnit.significance}`)
      if (narrativeUnit.relationalNote) lines.push(`\n**Relational Dynamics:** ${narrativeUnit.relationalNote}`)
      if (narrativeUnit.conceptualNote) lines.push(`\n**Conceptual Background:** ${narrativeUnit.conceptualNote}`)
      if (narrativeUnit.keyQuestions) {
        try {
          const questions = JSON.parse(narrativeUnit.keyQuestions) as string[]
          lines.push(`\n**Key Questions for Study:**`)
          for (const q of questions) lines.push(`- ${q}`)
        } catch { /* skip malformed JSON */ }
      }
    }
    const content = lines.join('\n')
    if (content) {
      sections.push({ id: 'narrative', label: 'Narrative Context', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
    }
  }

  // ── Full chapter text ─────────────────────────────────────────────────────
  if (verses.length > 0) {
    const lines: string[] = []
    lines.push(`\n### Full Text: ${bookName} ${chapter}`)
    for (const v of verses) {
      lines.push(`${v.number}. ${v.text}`)
    }
    const content = lines.join('\n')
    if (content) {
      sections.push({ id: 'chapter-text', label: 'Chapter Text', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
    }
  }

  // ── Adjacent chapters (narrative context + resolution) ────────────────────
  if (adjacentChapters.length > 0) {
    const lines: string[] = []
    for (const adj of adjacentChapters) {
      lines.push(`\n### Full Text: ${bookName} ${adj.chapter}`)
      for (const v of adj.verses) {
        lines.push(`${v.number}. ${v.text}`)
      }
    }
    const content = lines.join('\n')
    if (content) {
      sections.push({ id: 'adjacent-text', label: 'Adjacent Chapters', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
    }
  }

  // ── Characters with mini-profiles ─────────────────────────────────────────
  const { sceneCast, themes, crossReferences, commentaries } = passageCtx

  if (sceneCast.length > 0) {
    // Get full character profiles for scene cast
    const charIds = [...new Set(sceneCast.map((c) => c.characterId))]
    const charProfiles = await prisma.character.findMany({
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
    const profileMap = new Map(charProfiles.map((p) => [p.id, p]))

    const lines: string[] = []
    lines.push('\n### Characters Present')
    for (const c of sceneCast) {
      const charLines: string[] = [`**${c.name}** (${c.role})`]
      if (c.emotion) charLines.push(`  Emotional state: ${c.emotion}`)
      if (c.motivation) charLines.push(`  Motivation: ${c.motivation}`)
      if (c.stakes) charLines.push(`  Stakes: ${c.stakes}`)

      const profile = profileMap.get(c.characterId)
      if (profile) {
        if (profile.bioBrief) charLines.push(`  Bio: ${profile.bioBrief}`)
        if (profile.era) charLines.push(`  Era: ${profile.era}`)
        if (profile.faithJourney) charLines.push(`  Faith journey: ${profile.faithJourney.slice(0, 300)}`)
        if (profile.relationshipsA.length > 0) {
          const rels = profile.relationshipsA.map((r: { relationship: string; charB: { name: string } }) => `${r.relationship}: ${r.charB.name}`).join(', ')
          charLines.push(`  Key relationships: ${rels}`)
        }
      }
      lines.push(charLines.join('\n'))
    }
    const content = lines.join('\n')
    if (content) {
      sections.push({ id: 'characters', label: 'Characters', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
    }
  }

  // ── Themes with definitions ───────────────────────────────────────────────
  if (themes.length > 0) {
    const themeIds = themes.map((t) => t.themeId)
    const themeDetails = await prisma.theme.findMany({
      where: { id: { in: themeIds } },
      select: { id: true, name: true, definition: true, category: true },
    })
    const themeMap = new Map(themeDetails.map((t) => [t.id, t]))

    const lines: string[] = []
    lines.push('\n### Themes')
    for (const t of themes) {
      const detail = themeMap.get(t.themeId)
      const def = detail?.definition ? ` — ${detail.definition}` : ''
      const note = t.annotation ? ` (${t.annotation})` : ''
      lines.push(`- **${t.name}**${def}${note}`)
    }
    const content = lines.join('\n')
    if (content) {
      sections.push({ id: 'themes', label: 'Themes', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
    }
  }

  // ── Key Hebrew/Greek words ────────────────────────────────────────────────
  if (strongsMappings.length > 0) {
    // Deduplicate by strongs number — show each word once
    const seen = new Set<string>()
    const uniqueEntries: Array<{ number: string; word: string; transliteration: string; definition: string; verse: number }> = []
    for (const m of strongsMappings) {
      if (!seen.has(m.strongsNumber)) {
        seen.add(m.strongsNumber)
        uniqueEntries.push({
          number: m.strongsNumber,
          word: m.entry.word,
          transliteration: m.entry.transliteration ?? '',
          definition: m.entry.definition ?? m.entry.shortDefinition ?? '',
          verse: m.verse,
        })
      }
    }

    // Cap at 20 entries — theologically significant words first
    const topEntries = uniqueEntries.slice(0, 20)
    if (topEntries.length > 0) {
      const lines: string[] = []
      lines.push('\n### Key Hebrew/Greek Words')
      for (const e of topEntries) {
        const def = e.definition.length > 150 ? e.definition.slice(0, 150) + '...' : e.definition
        lines.push(`- **${e.word}** (${e.transliteration}, ${e.number}) v.${e.verse}: ${def}`)
      }
      const content = lines.join('\n')
      if (content) {
        sections.push({ id: 'strongs', label: "Strong's Hebrew/Greek", content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
      }
    }
  }

  // ── Cross-references (top 15 by relevance) ────────────────────────────────
  const topRefs = crossReferences.slice(0, 15)
  if (topRefs.length > 0) {
    const lines: string[] = []
    lines.push('\n### Cross-References')
    for (const ref of topRefs) {
      const snippet = ref.snippet ? ` — "${ref.snippet}"` : ''
      lines.push(`- ${ref.targetPassage}${snippet}`)
    }
    const content = lines.join('\n')
    if (content) {
      sections.push({ id: 'cross-refs', label: 'Cross-References', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
    }
  }

  // ── Commentary (curated + top extended, capped at ~8K chars) ──────────────
  if (commentaries.length > 0) {
    const curated = commentaries.filter((c) => c.displayTier === 'curated')
    const extended = commentaries.filter((c) => c.displayTier !== 'curated').slice(0, 10)
    const selected = [...curated, ...extended]

    const lines: string[] = []
    lines.push('\n### Commentary')
    let commentaryChars = 0
    const MAX_COMMENTARY_CHARS = 8000
    for (const c of selected) {
      const excerpt = c.excerpt.length > 600 ? c.excerpt.slice(0, 600) + '...' : c.excerpt
      if (commentaryChars + excerpt.length > MAX_COMMENTARY_CHARS) break
      lines.push(`**${c.author}** (${c.verseRange}): ${excerpt}`)
      commentaryChars += excerpt.length
    }
    const content = lines.join('\n')
    if (content) {
      sections.push({ id: 'commentary', label: 'Commentary', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
    }
  }

  // ── Footnotes ─────────────────────────────────────────────────────────────
  if (footnotes.length > 0) {
    const lines: string[] = []
    lines.push('\n### Translation Footnotes')
    for (const fn of footnotes) {
      lines.push(`- v.${fn.verse}: ${fn.noteText}`)
    }
    const content = lines.join('\n')
    if (content) {
      sections.push({ id: 'footnotes', label: 'Footnotes', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: false })
    }
  }

  return sections
}
