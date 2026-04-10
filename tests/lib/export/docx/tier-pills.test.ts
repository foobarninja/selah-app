import { describe, it, expect } from 'vitest'
import { TextRun } from 'docx'
import { buildTierLabelRun, detectTierInText } from '@/lib/export/docx/tier-pills'

describe('buildTierLabelRun', () => {
  it('returns a TextRun with the tier color', () => {
    const run = buildTierLabelRun('Canon')
    expect(run).toBeInstanceOf(TextRun)
  })

  it('produces a run for each tier without throwing', () => {
    expect(() => buildTierLabelRun('Canon')).not.toThrow()
    expect(() => buildTierLabelRun('Scholarship')).not.toThrow()
    expect(() => buildTierLabelRun('Historical')).not.toThrow()
    expect(() => buildTierLabelRun('AI-Assisted')).not.toThrow()
    expect(() => buildTierLabelRun('Conjecture')).not.toThrow()
  })
})

describe('detectTierInText', () => {
  it('detects (Canon) at end of sentence', () => {
    expect(detectTierInText('In the beginning... (Canon)')).toBe('Canon')
  })

  it('detects (Scholarship)', () => {
    expect(detectTierInText('As Matthew Henry notes (Scholarship)')).toBe('Scholarship')
  })

  it('detects (Historical)', () => {
    expect(detectTierInText('The road descended 3400 feet (Historical)')).toBe('Historical')
  })

  it('detects (AI-Assisted)', () => {
    expect(detectTierInText('This is synthesis (AI-Assisted)')).toBe('AI-Assisted')
  })

  it('detects (Conjecture)', () => {
    expect(detectTierInText('Perhaps the author meant (Conjecture)')).toBe('Conjecture')
  })

  it('returns null when no tier label present', () => {
    expect(detectTierInText('Just a plain sentence.')).toBeNull()
  })
})
