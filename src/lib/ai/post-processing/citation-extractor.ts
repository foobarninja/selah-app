import type { Citation } from '../types'
import type { SourceTier } from '@/components/reader/types'
import { parseScriptureRefs, parseStrongsRefs } from './reference-parser'
import { findEntityMentions } from './entity-matcher'

/**
 * Extract all citations from a completed AI response.
 * Combines Scripture references, Strong's numbers, and entity (character/theme) mentions.
 * Returns non-overlapping citations sorted by position.
 */
export async function extractCitations(text: string): Promise<Citation[]> {
  const [scriptureRefs, strongsRefs, entityMentions] = await Promise.all([
    Promise.resolve(parseScriptureRefs(text)),
    Promise.resolve(parseStrongsRefs(text)),
    findEntityMentions(text),
  ])

  const citations: Citation[] = []

  for (const ref of scriptureRefs) {
    const verseSlug = ref.verseStart ? `/${ref.verseStart}` : ''
    citations.push({
      text: ref.text,
      tier: 1 as SourceTier,
      type: 'verse',
      link: `/reader/${ref.bookId}/${ref.chapter}${verseSlug}`,
      startIndex: ref.startIndex,
      endIndex: ref.endIndex,
    })
  }

  for (const ref of strongsRefs) {
    citations.push({
      text: ref.text,
      tier: 2 as SourceTier,
      type: 'strongs',
      link: `/word-study/${ref.number}`,
      startIndex: ref.startIndex,
      endIndex: ref.endIndex,
    })
  }

  for (const entity of entityMentions) {
    citations.push({
      text: entity.text,
      tier: 2 as SourceTier,
      type: entity.type,
      link: entity.type === 'character'
        ? `/characters/${entity.entityId}`
        : `/themes/${entity.entityId}`,
      startIndex: entity.startIndex,
      endIndex: entity.endIndex,
    })
  }

  // Sort by position, remove overlaps (keep higher-priority: verse > strongs > entity)
  citations.sort((a, b) => a.startIndex - b.startIndex)
  const deduped: Citation[] = []
  for (const cit of citations) {
    const prev = deduped[deduped.length - 1]
    if (prev && cit.startIndex < prev.endIndex) continue // skip overlap
    deduped.push(cit)
  }

  return deduped
}
