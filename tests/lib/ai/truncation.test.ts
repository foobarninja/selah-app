import { describe, it, expect } from 'vitest'
import {
  isTruncated,
  truncationNotice,
  normalizeOpenAIFinish,
  normalizeAnthropicFinish,
  normalizeGoogleFinish,
  normalizeOllamaFinish,
} from '@/lib/ai/truncation'

describe('isTruncated', () => {
  it('flags a max-tokens cap', () => {
    expect(isTruncated('length')).toBe(true)
  })

  it('flags a dropped stream (null = ran out without a finish signal)', () => {
    expect(isTruncated(null)).toBe(true)
  })

  it('does not flag a clean stop', () => {
    expect(isTruncated('stop')).toBe(false)
  })

  it('does not flag when the adapter does not report (undefined)', () => {
    expect(isTruncated(undefined)).toBe(false)
  })
})

describe('truncationNotice', () => {
  it('returns null for a clean stop', () => {
    expect(truncationNotice('stop')).toBeNull()
  })

  it('returns null when unreported', () => {
    expect(truncationNotice(undefined)).toBeNull()
  })

  it('mentions max length for a length cap', () => {
    expect(truncationNotice('length')).toMatch(/maximum length/i)
  })

  it('mentions a dropped connection for null', () => {
    expect(truncationNotice(null)).toMatch(/connection/i)
  })
})

describe('normalizeOpenAIFinish', () => {
  it('passes stop and length through', () => {
    expect(normalizeOpenAIFinish('stop')).toBe('stop')
    expect(normalizeOpenAIFinish('length')).toBe('length')
  })
  it('collapses absent/unknown to null (dropped)', () => {
    expect(normalizeOpenAIFinish(undefined)).toBeNull()
    expect(normalizeOpenAIFinish(null)).toBeNull()
    expect(normalizeOpenAIFinish('content_filter')).toBeNull()
  })
})

describe('normalizeAnthropicFinish', () => {
  it('maps max_tokens to length', () => {
    expect(normalizeAnthropicFinish('max_tokens')).toBe('length')
  })
  it('maps end_turn and stop_sequence to stop', () => {
    expect(normalizeAnthropicFinish('end_turn')).toBe('stop')
    expect(normalizeAnthropicFinish('stop_sequence')).toBe('stop')
  })
  it('collapses unknown to null', () => {
    expect(normalizeAnthropicFinish(null)).toBeNull()
  })
})

describe('normalizeGoogleFinish', () => {
  it('maps MAX_TOKENS to length and STOP to stop', () => {
    expect(normalizeGoogleFinish('MAX_TOKENS')).toBe('length')
    expect(normalizeGoogleFinish('STOP')).toBe('stop')
  })
  it('collapses unknown to null', () => {
    expect(normalizeGoogleFinish('SAFETY')).toBeNull()
  })
})

describe('normalizeOllamaFinish', () => {
  it('maps length and stop', () => {
    expect(normalizeOllamaFinish('length')).toBe('length')
    expect(normalizeOllamaFinish('stop')).toBe('stop')
  })
  it('collapses unknown to null', () => {
    expect(normalizeOllamaFinish(undefined)).toBeNull()
  })
})
