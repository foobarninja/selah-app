import { describe, it, expect } from 'vitest'
import { TIER_COLORS, DOCX_SIZES, DOCX_COLORS, FONT_NAMES } from '@/lib/export/constants'

describe('export constants', () => {
  it('exposes tier palette with hex colors for all five tiers', () => {
    expect(TIER_COLORS.Canon.text).toBe('7A5C1F')
    expect(TIER_COLORS.Scholarship.text).toBe('2B6B5A')
    expect(TIER_COLORS.Historical.text).toBe('5A5D3C')
    expect(TIER_COLORS['AI-Assisted'].text).toBe('4A6380')
    expect(TIER_COLORS.Conjecture.text).toBe('8B6B3E')
  })

  it('exposes DOCX size half-points', () => {
    // docx library uses half-points, so 48 = 24pt
    expect(DOCX_SIZES.title).toBe(48)
    expect(DOCX_SIZES.h2).toBe(28)
    expect(DOCX_SIZES.body).toBe(22)
    expect(DOCX_SIZES.meta).toBe(20)
    expect(DOCX_SIZES.footnote).toBe(18)
  })

  it('exposes muted/ref brand colors used by existing exports', () => {
    expect(DOCX_COLORS.muted).toBe('888888')
    expect(DOCX_COLORS.dim).toBe('666666')
    expect(DOCX_COLORS.refBrown).toBe('996633')
    expect(DOCX_COLORS.footnote).toBe('999999')
  })

  it('exposes font names', () => {
    expect(FONT_NAMES.heading).toContain('Cormorant')
    expect(FONT_NAMES.body).toContain('Source Sans')
  })
})
