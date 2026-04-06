import { getChapterText, getPassageContext } from '@/lib/reader/queries'
import { BOOK_NAMES } from '@/lib/constants'
import type { ReaderContext } from '../../types'

const MAX_COMMENTARY_EXCERPTS = 3
const MAX_CROSS_REFS = 5

export async function extractReaderContext(ctx: ReaderContext): Promise<string> {
  const { bookId, chapter, verse, translationId = 'BSB' } = ctx
  const bookName = BOOK_NAMES[bookId] ?? bookId

  const [verses, passageCtx] = await Promise.all([
    getChapterText(translationId, bookId, chapter),
    getPassageContext(bookId, chapter, 1, 999),
  ])

  const parts: string[] = []

  // ── Passage header ────────────────────────────────────────────────────────
  parts.push(`## Passage: ${bookName} ${chapter}`)

  // ── Full chapter text — the model MUST have the actual words to quote from
  if (verses.length > 0) {
    parts.push('\n### Full Text')
    for (const v of verses) {
      parts.push(`${v.number}. ${v.text}`)
    }
  }

  // ── Characters ────────────────────────────────────────────────────────────
  const { sceneCast, themes, crossReferences, commentaries } = passageCtx
  if (sceneCast.length > 0) {
    parts.push('\n### Characters Present')
    for (const c of sceneCast) {
      const details: string[] = [`**${c.name}** (${c.role})`]
      if (c.emotion) details.push(`emotional state: ${c.emotion}`)
      if (c.motivation) details.push(`motivation: ${c.motivation}`)
      if (c.stakes) details.push(`stakes: ${c.stakes}`)
      parts.push(details.join(' — '))
    }
  }

  // ── Themes ────────────────────────────────────────────────────────────────
  if (themes.length > 0) {
    parts.push('\n### Themes')
    for (const t of themes) {
      const note = t.annotation ? `: ${t.annotation}` : ''
      parts.push(`- ${t.name}${note}`)
    }
  }

  // ── Cross-references ──────────────────────────────────────────────────────
  const topRefs = crossReferences.slice(0, MAX_CROSS_REFS)
  if (topRefs.length > 0) {
    parts.push('\n### Cross-References')
    for (const ref of topRefs) {
      const snippet = ref.snippet ? ` — "${ref.snippet}"` : ''
      parts.push(`- ${ref.targetPassage}${snippet}`)
    }
  }

  // ── Commentary excerpts ───────────────────────────────────────────────────
  const curatedCommentary = commentaries
    .filter((c) => c.displayTier === 'curated')
    .slice(0, MAX_COMMENTARY_EXCERPTS)

  if (curatedCommentary.length > 0) {
    parts.push('\n### Commentary')
    for (const c of curatedCommentary) {
      const excerpt = c.excerpt.length > 300 ? c.excerpt.slice(0, 300) + '...' : c.excerpt
      parts.push(`**${c.author}** (${c.verseRange}): ${excerpt}`)
    }
  }

  return parts.join('\n')
}
