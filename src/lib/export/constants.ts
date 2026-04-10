/**
 * Export constants — shared DOCX/Markdown brand values.
 *
 * Source tier hex values come from the implementation guide Phase 2.5.
 * They match the UI tier pills; changing them without syncing to
 * `SourceTierPill.tsx` will cause visual drift between screen and export.
 *
 * DOCX sizes are in half-points (docx library convention):
 *   48 = 24pt, 28 = 14pt, 22 = 11pt, 20 = 10pt, 18 = 9pt.
 */

export type SourceTier = 'Canon' | 'Scholarship' | 'Historical' | 'AI-Assisted' | 'Conjecture'

export interface TierColor {
  /** Background fill for pill (light) */
  bg: string
  /** Text color for label */
  text: string
  /** Accent dot/border color */
  dot: string
}

export const TIER_COLORS = {
  Canon:          { bg: 'FBF3E0', text: '7A5C1F', dot: 'C6A23C' },
  Scholarship:    { bg: 'EFF8F6', text: '2B6B5A', dot: '4A9E88' },
  Historical:     { bg: 'F5F5ED', text: '5A5D3C', dot: '8A8E64' },
  'AI-Assisted':  { bg: 'EEF2F7', text: '4A6380', dot: '6B91B5' },
  Conjecture:     { bg: 'FAF0E6', text: '8B6B3E', dot: 'C9A96E' },
} as const satisfies Record<SourceTier, TierColor>

export const DOCX_SIZES = {
  title: 48,      // 24pt
  h1: 32,         // 16pt
  h2: 28,         // 14pt
  h3: 24,         // 12pt
  body: 22,       // 11pt
  meta: 20,       // 10pt
  footnote: 18,   // 9pt
} as const

export const DOCX_COLORS = {
  body: '000000',
  muted: '888888',
  dim: '666666',
  bodyDark: '444444',           // darker body text variant for emphasis
  sectionLabel: '555555',       // commentary/section label gray
  refBrown: '996633',
  footnote: '999999',
  accentGreen: '336644',
  sectionBorder: 'CCCCCC',
} as const

export const FONT_NAMES = {
  heading: 'Cormorant Garamond',
  body: 'Source Sans 3',
  mono: 'JetBrains Mono',
} as const
