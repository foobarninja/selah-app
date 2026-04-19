import { describe, it, expect } from 'vitest'
import { hashPin, verifyPin, isValidPinFormat } from '@/lib/profiles/pin'

describe('isValidPinFormat', () => {
  it('accepts 4 digits', () => {
    expect(isValidPinFormat('1234')).toBe(true)
    expect(isValidPinFormat('0000')).toBe(true)
  })
  it('rejects non-4-digit strings', () => {
    expect(isValidPinFormat('123')).toBe(false)
    expect(isValidPinFormat('12345')).toBe(false)
    expect(isValidPinFormat('')).toBe(false)
    expect(isValidPinFormat('12ab')).toBe(false)
    expect(isValidPinFormat('12 4')).toBe(false)
  })
})

describe('hashPin + verifyPin', () => {
  it('hashes a PIN and verifies against it', async () => {
    const hash = await hashPin('1234')
    expect(hash).not.toBe('1234')
    expect(hash.length).toBeGreaterThan(30)
    expect(await verifyPin('1234', hash)).toBe(true)
  })

  it('rejects the wrong PIN', async () => {
    const hash = await hashPin('1234')
    expect(await verifyPin('0000', hash)).toBe(false)
    expect(await verifyPin('12345', hash)).toBe(false)
    expect(await verifyPin('', hash)).toBe(false)
  })

  it('two hashes of the same PIN differ (salted)', async () => {
    const a = await hashPin('1234')
    const b = await hashPin('1234')
    expect(a).not.toBe(b)
    expect(await verifyPin('1234', a)).toBe(true)
    expect(await verifyPin('1234', b)).toBe(true)
  })

  it('hashPin throws on invalid PIN format', async () => {
    await expect(hashPin('12')).rejects.toThrow(/4 digits/i)
    await expect(hashPin('abcd')).rejects.toThrow(/4 digits/i)
  })
})
