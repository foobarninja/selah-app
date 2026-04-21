import { describe, it, expect } from 'vitest'
import { sanitizeProviderError } from '@/lib/ai/sanitize-error'

describe('sanitizeProviderError', () => {
  it('classifies 401 / Unauthorized as key error', () => {
    expect(sanitizeProviderError(new Error('Request failed: 401 Unauthorized'))).toBe(
      'Invalid API key. Check your settings.',
    )
    expect(sanitizeProviderError(new Error('invalid_api_key'))).toBe(
      'Invalid API key. Check your settings.',
    )
  })

  it('classifies 429 / rate as rate-limit', () => {
    expect(sanitizeProviderError(new Error('429 Too Many Requests'))).toBe(
      'Rate limited. Try again in a moment.',
    )
    expect(sanitizeProviderError(new Error('rate_limit_exceeded'))).toBe(
      'Rate limited. Try again in a moment.',
    )
  })

  it('classifies context-length errors', () => {
    expect(sanitizeProviderError(new Error('context_length_exceeded'))).toBe(
      'Message too long. Try a shorter question or start a new conversation.',
    )
  })

  it('redacts bearer tokens and api keys from unclassified errors', () => {
    const err = new Error('fetch failed for https://api.example.com with Authorization: Bearer sk-abc123def456')
    expect(sanitizeProviderError(err)).not.toMatch(/sk-abc123def456/)
    expect(sanitizeProviderError(err)).not.toMatch(/Bearer /)
  })

  it('returns a generic message for unknown errors', () => {
    expect(sanitizeProviderError(new Error('something obscure and long ' + 'x'.repeat(400)))).toBe(
      'The AI provider returned an error. Check your settings or try again.',
    )
  })

  it('handles non-Error inputs', () => {
    expect(sanitizeProviderError('raw string error')).toBe(
      'The AI provider returned an error. Check your settings or try again.',
    )
    expect(sanitizeProviderError(undefined)).toBe(
      'The AI provider returned an error. Check your settings or try again.',
    )
  })

  it('does not match embedded numeric sequences that contain 401 or 429', () => {
    // These are all unclassified — should get the generic message.
    expect(sanitizeProviderError(new Error('HTTP 4010'))).toBe(
      'The AI provider returned an error. Check your settings or try again.',
    )
    expect(sanitizeProviderError(new Error('request id 4012345'))).toBe(
      'The AI provider returned an error. Check your settings or try again.',
    )
    expect(sanitizeProviderError(new Error('wrote 4291 bytes'))).toBe(
      'The AI provider returned an error. Check your settings or try again.',
    )
  })

  it('still matches 401 / 429 when they appear as actual status codes', () => {
    expect(sanitizeProviderError(new Error('status: 401'))).toBe(
      'Invalid API key. Check your settings.',
    )
    expect(sanitizeProviderError(new Error('HTTP 429 received'))).toBe(
      'Rate limited. Try again in a moment.',
    )
  })
})
