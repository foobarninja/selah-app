import { describe, it, expect } from 'vitest'
import { extractSafetyMarker } from '@/lib/safety/marker'

describe('extractSafetyMarker', () => {
  it('extracts CRITICAL marker and strips it from output', () => {
    const input = '[SAFETY:CRITICAL]\n\nI hear you saying you want to hurt yourself. Please tell your mom or dad today.'
    const { level, stripped } = extractSafetyMarker(input)
    expect(level).toBe('critical')
    expect(stripped).toBe('I hear you saying you want to hurt yourself. Please tell your mom or dad today.')
  })

  it('extracts CONCERNING marker and strips it from output', () => {
    const input = '[SAFETY:CONCERNING]\n\nThat sounds heavy. Talking to a grown-up about it can really help.'
    const { level, stripped } = extractSafetyMarker(input)
    expect(level).toBe('concerning')
    expect(stripped).toBe('That sounds heavy. Talking to a grown-up about it can really help.')
  })

  it('handles marker without blank line after', () => {
    const input = '[SAFETY:CRITICAL]\nHello there.'
    const { level, stripped } = extractSafetyMarker(input)
    expect(level).toBe('critical')
    expect(stripped).toBe('Hello there.')
  })

  it('returns null level and original text when no marker present', () => {
    const input = 'Paul wrote this from a Roman prison, weeks from execution.'
    const { level, stripped } = extractSafetyMarker(input)
    expect(level).toBeNull()
    expect(stripped).toBe(input)
  })

  it('ignores markers that are not on the first line', () => {
    const input = 'Paul wrote this.\n[SAFETY:CRITICAL]\nTrailing.'
    const { level, stripped } = extractSafetyMarker(input)
    expect(level).toBeNull()
    expect(stripped).toBe(input)
  })

  it('ignores case-varied markers (must be exact)', () => {
    const input = '[safety:critical]\n\nBody.'
    const { level, stripped } = extractSafetyMarker(input)
    expect(level).toBeNull()
    expect(stripped).toBe(input)
  })

  it('ignores malformed markers', () => {
    expect(extractSafetyMarker('[SAFETY]\n\nBody.').level).toBeNull()
    expect(extractSafetyMarker('[SAFETY:CRIT]\n\nBody.').level).toBeNull()
    expect(extractSafetyMarker('SAFETY:CRITICAL\n\nBody.').level).toBeNull()
  })

  it('handles empty or null input', () => {
    expect(extractSafetyMarker('').level).toBeNull()
    expect(extractSafetyMarker('').stripped).toBe('')
  })
})
