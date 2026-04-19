import { describe, it, expect } from 'vitest'
import { toContextRef, parseContextRef, isCompanionContextRef } from '@/lib/ai/companion/context-ref'

describe('toContextRef', () => {
  it('namespaces a devotional id', () => {
    expect(toContextRef('romans-8-28')).toBe('devotional-companion:romans-8-28')
  })
  it('rejects empty ids', () => {
    expect(() => toContextRef('')).toThrow(/empty/i)
  })
})

describe('parseContextRef', () => {
  it('round-trips a companion contextRef', () => {
    expect(parseContextRef('devotional-companion:romans-8-28')).toEqual({ devotionalId: 'romans-8-28' })
  })
  it('returns null for a non-companion contextRef', () => {
    expect(parseContextRef('passage:gen:1')).toBeNull()
    expect(parseContextRef('character:moses')).toBeNull()
    expect(parseContextRef('')).toBeNull()
    expect(parseContextRef(null as unknown as string)).toBeNull()
  })
  it('handles devotional ids containing colons', () => {
    expect(parseContextRef('devotional-companion:foo:bar:baz')).toEqual({ devotionalId: 'foo:bar:baz' })
  })
})

describe('isCompanionContextRef', () => {
  it('identifies companion refs', () => {
    expect(isCompanionContextRef('devotional-companion:x')).toBe(true)
    expect(isCompanionContextRef('passage:gen:1')).toBe(false)
    expect(isCompanionContextRef(null)).toBe(false)
  })
})
