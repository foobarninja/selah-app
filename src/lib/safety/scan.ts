// src/lib/safety/scan.ts
//
// Deterministic keyword scan over user messages. Returns the highest-
// severity match from the taxonomy, or null. Runs synchronously,
// takes microseconds, no model inference. This is the safety floor —
// works even if the model marker layer silently breaks.

import { KEYWORD_TAXONOMY } from './keyword-taxonomy'
import type { FlagLevel } from './types'
import { FLAG_LEVEL_ORDER } from './types'

function stripPunctuation(text: string): string {
  return text.replace(/[.,!?;:"'()[\]{}]/g, '')
}

function normalize(text: string): string {
  return ' ' + text.toLowerCase().replace(/\s+/g, ' ').trim() + ' '
}

// Pre-normalize taxonomy patterns through the same strip+normalize
// pipeline so apostrophe variants in the authoring-friendly taxonomy
// (e.g. "don't want to wake up") still match stripped user input
// (e.g. "dont want to wake up"). Keeps the taxonomy file readable
// without sacrificing matching correctness.
const NORMALIZED_TAXONOMY: readonly {
  level: FlagLevel
  patterns: readonly string[]
}[] = KEYWORD_TAXONOMY.map((category) => ({
  level: category.level,
  patterns: category.patterns.map((p) =>
    normalize(stripPunctuation(p)).trim(),
  ),
}))

export function scanMessage(text: string): FlagLevel | null {
  if (!text || !text.trim()) return null
  const normalized = normalize(stripPunctuation(text))

  let best: FlagLevel | null = null
  let bestScore = 0

  for (const category of NORMALIZED_TAXONOMY) {
    const score = FLAG_LEVEL_ORDER[category.level]
    if (score <= bestScore) continue
    for (const pattern of category.patterns) {
      const padded = ` ${pattern} `
      if (normalized.includes(padded)) {
        best = category.level
        bestScore = score
        break
      }
    }
  }
  return best
}
