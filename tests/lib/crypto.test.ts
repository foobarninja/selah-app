import { describe, it, expect, afterEach } from 'vitest'
import { encryptValue, decryptValue, isEncrypted } from '@/lib/crypto'

describe('crypto', () => {
  const originalSecret = process.env.ENCRYPTION_SECRET
  const originalDbUrl = process.env.DATABASE_URL

  afterEach(() => {
    if (originalSecret === undefined) delete process.env.ENCRYPTION_SECRET
    else process.env.ENCRYPTION_SECRET = originalSecret
    if (originalDbUrl === undefined) delete process.env.DATABASE_URL
    else process.env.DATABASE_URL = originalDbUrl
  })

  it('round-trips with ENCRYPTION_SECRET', () => {
    process.env.ENCRYPTION_SECRET = 'a-real-secret-with-enough-entropy-please'
    const ct = encryptValue('sk-test-1234567890')
    expect(isEncrypted(ct)).toBe(true)
    expect(decryptValue(ct)).toBe('sk-test-1234567890')
  })

  it('falls back to DATABASE_URL when ENCRYPTION_SECRET is unset', () => {
    delete process.env.ENCRYPTION_SECRET
    process.env.DATABASE_URL = 'file:./data/selah.db'
    const ct = encryptValue('hello')
    expect(decryptValue(ct)).toBe('hello')
  })

  it('values encrypted under DATABASE_URL cannot be decrypted under a new ENCRYPTION_SECRET', () => {
    // Rotating the key intentionally invalidates prior ciphertexts.
    // decryptValue's catch-all returns the ciphertext string rather than
    // throwing (documented migration fallback).
    delete process.env.ENCRYPTION_SECRET
    process.env.DATABASE_URL = 'file:./data/selah.db'
    const ct = encryptValue('hello')

    process.env.ENCRYPTION_SECRET = 'a-brand-new-high-entropy-secret'
    delete process.env.DATABASE_URL
    expect(decryptValue(ct)).toBe(ct)
  })

  it('isEncrypted distinguishes ciphertext from plaintext', () => {
    process.env.ENCRYPTION_SECRET = 'x'.repeat(40)
    expect(isEncrypted('not-json-plaintext')).toBe(false)
    expect(isEncrypted('{"random":"json"}')).toBe(false)
    const ct = encryptValue('payload')
    expect(isEncrypted(ct)).toBe(true)
  })
})
