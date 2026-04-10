import { TextRun } from 'docx'
import { TIER_COLORS, type SourceTier, DOCX_SIZES, FONT_NAMES } from '../constants'

/**
 * Build a TextRun rendering "(Tier)" with the brand hex color for that tier.
 *
 * The run is bold and meta-sized (matching on-screen tier pill emphasis).
 * Use this as an inline run inside a Paragraph to label claims in exports
 * the same way the on-screen pills do.
 */
export function buildTierLabelRun(tier: SourceTier): TextRun {
  const color = TIER_COLORS[tier].text
  return new TextRun({
    text: ` (${tier})`,
    bold: true,
    size: DOCX_SIZES.meta,
    color,
    font: FONT_NAMES.body,
  })
}

const TIER_REGEX = /\((Canon|Scholarship|Historical|AI-Assisted|Conjecture)\)/

/**
 * Detect an inline source tier label like "(Canon)" in a run of text.
 * Returns the tier or null. Used by the markdown renderer to split runs
 * on tier boundaries so labels can be styled with tier colors.
 */
export function detectTierInText(text: string): SourceTier | null {
  const match = text.match(TIER_REGEX)
  if (!match) return null
  return match[1] as SourceTier
}

export { TIER_REGEX }
