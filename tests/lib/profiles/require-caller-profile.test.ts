import { describe, it, expect } from 'vitest'
import { canModifyProfile } from '@/lib/profiles/require-caller-profile'

type P = {
  id: string
  pinHash: string | null
  childLock: boolean
}

describe('canModifyProfile', () => {
  const adultWithPin: P = { id: 'adult-1', pinHash: 'hash', childLock: false }
  const adultNoPin: P = { id: 'adult-2', pinHash: null, childLock: false }
  const kid: P = { id: 'kid-1', pinHash: null, childLock: true }

  it('allows the caller to modify their own profile', () => {
    expect(canModifyProfile(adultWithPin, adultWithPin)).toBe(true)
    expect(canModifyProfile(kid, kid)).toBe(true)
  })

  it('allows an adult with PIN to modify another profile', () => {
    expect(canModifyProfile(adultWithPin, kid)).toBe(true)
    expect(canModifyProfile(adultWithPin, adultNoPin)).toBe(true)
  })

  it('forbids a childLock profile from modifying anyone else', () => {
    expect(canModifyProfile(kid, adultWithPin)).toBe(false)
    expect(canModifyProfile(kid, adultNoPin)).toBe(false)
  })

  it('forbids an adult without PIN from modifying someone else', () => {
    // No-PIN profile is publicly selectable → not a trust root.
    expect(canModifyProfile(adultNoPin, adultWithPin)).toBe(false)
    expect(canModifyProfile(adultNoPin, kid)).toBe(false)
  })
})
