import { getStrongsEntry, getTranslationClusters } from '@/lib/word-study/queries'
import type { WordStudyContext } from '../../types'

const MAX_RENDERINGS = 8

export async function extractWordStudyContext(ctx: WordStudyContext): Promise<string> {
  const { strongsNumber } = ctx

  const [entry, clusters] = await Promise.all([
    getStrongsEntry(strongsNumber),
    getTranslationClusters(strongsNumber),
  ])

  if (!entry) return ''

  const parts: string[] = []

  // ── Header ────────────────────────────────────────────────────────────────
  const langLabel = entry.language === 'hebrew' ? 'Hebrew' : 'Greek'
  parts.push(`## Word Study: ${entry.strongsNumber} (${langLabel})`)
  parts.push(`**${entry.originalScript}** (${entry.transliteration})`)

  if (entry.pronunciation) {
    parts.push(`Pronunciation: ${entry.pronunciation}`)
  }

  // ── Definition ────────────────────────────────────────────────────────────
  if (entry.shortGloss) {
    parts.push(`\n### Short Gloss\n${entry.shortGloss}`)
  }

  if (entry.fullDefinition) {
    const def = entry.fullDefinition.length > 600
      ? entry.fullDefinition.slice(0, 600) + '...'
      : entry.fullDefinition
    parts.push(`\n### Full Definition\n${def}`)
  }

  // ── Morphology / derivation ───────────────────────────────────────────────
  if (entry.morphology) {
    parts.push(`\n### Morphology / Derivation\n${entry.morphology}`)
  }

  // ── Occurrence count ──────────────────────────────────────────────────────
  parts.push(`\n**Total occurrences in the Bible:** ${entry.totalOccurrences}`)

  // ── Translation renderings ────────────────────────────────────────────────
  if (clusters.length > 0) {
    parts.push('\n### English Renderings (by frequency)')
    const topClusters = clusters.slice(0, MAX_RENDERINGS)
    const renderings = topClusters.map((c) => `"${c.rendering}" (${c.count}×)`).join(', ')
    parts.push(renderings)
  }

  return parts.join('\n')
}
