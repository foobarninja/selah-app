import { getChapterText, getPassageContext } from '@/lib/reader/queries'
import { BOOK_NAMES } from '@/lib/constants'
import { prisma } from '@/lib/db'
import type { ReaderContext } from '../../types'

export async function extractReaderContext(ctx: ReaderContext): Promise<string> {
  const { bookId, chapter, verse, translationId = 'BSB' } = ctx
  const bookName = BOOK_NAMES[bookId] ?? bookId

  const [verses, passageCtx, narrativeUnit, strongsMappings, footnotes] = await Promise.all([
    getChapterText(translationId, bookId, chapter),
    getPassageContext(bookId, chapter, 1, 999),
    // Narrative unit for this chapter
    prisma.narrativeUnit.findFirst({
      where: {
        bookId,
        chapterStart: { lte: chapter },
        OR: [{ chapterEnd: { gte: chapter } }, { chapterEnd: null }],
      },
      orderBy: [{ chapterStart: 'desc' }, { verseStart: 'desc' }],
    }),
    // Strong's Hebrew/Greek words mapped to this chapter
    prisma.strongsVerseMap.findMany({
      where: { bookId, chapter },
      include: { entry: true },
      orderBy: [{ verse: 'asc' }, { wordPosition: 'asc' }],
    }),
    // Footnotes for this chapter
    prisma.footnote.findMany({
      where: { bookId, chapter },
      orderBy: { verse: 'asc' },
    }),
  ])

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

  const parts: string[] = []

  // ── Passage header ────────────────────────────────────────────────────────
  parts.push(`## Passage: ${bookName} ${chapter}`)

  // ── Narrative context — the richest layer of curated analysis ────────────
  if (narrativeUnit) {
    parts.push(`\n### Narrative Context: "${narrativeUnit.title}"`)
    if (narrativeUnit.summary) parts.push(narrativeUnit.summary)
    if (narrativeUnit.significance) parts.push(`\n**Theological Significance:** ${narrativeUnit.significance}`)
    if (narrativeUnit.relationalNote) parts.push(`\n**Relational Dynamics:** ${narrativeUnit.relationalNote}`)
    if (narrativeUnit.conceptualNote) parts.push(`\n**Conceptual Background:** ${narrativeUnit.conceptualNote}`)
    if (narrativeUnit.keyQuestions) {
      try {
        const questions = JSON.parse(narrativeUnit.keyQuestions) as string[]
        parts.push(`\n**Key Questions for Study:**`)
        for (const q of questions) parts.push(`- ${q}`)
      } catch { /* skip malformed JSON */ }
    }
  }

  // ── Full chapter text ─────────────────────────────────────────────────────
  if (verses.length > 0) {
    parts.push(`\n### Full Text: ${bookName} ${chapter}`)
    for (const v of verses) {
      parts.push(`${v.number}. ${v.text}`)
    }
  }

  // ── Adjacent chapters (narrative context + resolution) ────────────────────
  if (adjacentChapters.length > 0) {
    for (const adj of adjacentChapters) {
      parts.push(`\n### Full Text: ${bookName} ${adj.chapter}`)
      for (const v of adj.verses) {
        parts.push(`${v.number}. ${v.text}`)
      }
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

    parts.push('\n### Characters Present')
    for (const c of sceneCast) {
      const lines: string[] = [`**${c.name}** (${c.role})`]
      if (c.emotion) lines.push(`  Emotional state: ${c.emotion}`)
      if (c.motivation) lines.push(`  Motivation: ${c.motivation}`)
      if (c.stakes) lines.push(`  Stakes: ${c.stakes}`)

      const profile = profileMap.get(c.characterId)
      if (profile) {
        if (profile.bioBrief) lines.push(`  Bio: ${profile.bioBrief}`)
        if (profile.era) lines.push(`  Era: ${profile.era}`)
        if (profile.faithJourney) lines.push(`  Faith journey: ${profile.faithJourney.slice(0, 300)}`)
        if (profile.relationshipsA.length > 0) {
          const rels = profile.relationshipsA.map((r: { relationship: string; charB: { name: string } }) => `${r.relationship}: ${r.charB.name}`).join(', ')
          lines.push(`  Key relationships: ${rels}`)
        }
      }
      parts.push(lines.join('\n'))
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

    parts.push('\n### Themes')
    for (const t of themes) {
      const detail = themeMap.get(t.themeId)
      const def = detail?.definition ? ` — ${detail.definition}` : ''
      const note = t.annotation ? ` (${t.annotation})` : ''
      parts.push(`- **${t.name}**${def}${note}`)
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
      parts.push('\n### Key Hebrew/Greek Words')
      for (const e of topEntries) {
        const def = e.definition.length > 150 ? e.definition.slice(0, 150) + '...' : e.definition
        parts.push(`- **${e.word}** (${e.transliteration}, ${e.number}) v.${e.verse}: ${def}`)
      }
    }
  }

  // ── Cross-references (top 15 by relevance) ────────────────────────────────
  const topRefs = crossReferences.slice(0, 15)
  if (topRefs.length > 0) {
    parts.push('\n### Cross-References')
    for (const ref of topRefs) {
      const snippet = ref.snippet ? ` — "${ref.snippet}"` : ''
      parts.push(`- ${ref.targetPassage}${snippet}`)
    }
  }

  // ── Commentary (curated + top extended, capped at ~8K chars) ──────────────
  if (commentaries.length > 0) {
    const curated = commentaries.filter((c) => c.displayTier === 'curated')
    const extended = commentaries.filter((c) => c.displayTier !== 'curated').slice(0, 10)
    const selected = [...curated, ...extended]

    parts.push('\n### Commentary')
    let commentaryChars = 0
    const MAX_COMMENTARY_CHARS = 8000
    for (const c of selected) {
      const excerpt = c.excerpt.length > 600 ? c.excerpt.slice(0, 600) + '...' : c.excerpt
      if (commentaryChars + excerpt.length > MAX_COMMENTARY_CHARS) break
      parts.push(`**${c.author}** (${c.verseRange}): ${excerpt}`)
      commentaryChars += excerpt.length
    }
  }

  // ── Footnotes ─────────────────────────────────────────────────────────────
  if (footnotes.length > 0) {
    parts.push('\n### Translation Footnotes')
    for (const fn of footnotes) {
      parts.push(`- v.${fn.verse}: ${fn.noteText}`)
    }
  }

  return parts.join('\n')
}
