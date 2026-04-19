import { describe, it, expect } from 'vitest'
import { compareSemver, stripVPrefix } from '../../scripts/ops/check-app-update'

describe('stripVPrefix', () => {
  it('strips leading v', () => {
    expect(stripVPrefix('v1.2.3')).toBe('1.2.3')
  })
  it('strips leading V', () => {
    expect(stripVPrefix('V1.2.3')).toBe('1.2.3')
  })
  it('leaves bare versions alone', () => {
    expect(stripVPrefix('1.2.3')).toBe('1.2.3')
  })
})

describe('compareSemver', () => {
  it('equal versions return 0', () => {
    expect(compareSemver('1.2.3', '1.2.3')).toBe(0)
  })
  it('older major returns -1', () => {
    expect(compareSemver('1.9.9', '2.0.0')).toBe(-1)
  })
  it('newer major returns 1', () => {
    expect(compareSemver('2.0.0', '1.9.9')).toBe(1)
  })
  it('older minor returns -1', () => {
    expect(compareSemver('1.2.9', '1.3.0')).toBe(-1)
  })
  it('older patch returns -1', () => {
    expect(compareSemver('1.2.3', '1.2.4')).toBe(-1)
  })
  it('prerelease is less than release at same version', () => {
    expect(compareSemver('1.2.0-beta', '1.2.0')).toBe(-1)
    expect(compareSemver('1.2.0', '1.2.0-rc.1')).toBe(1)
  })
  it('two prereleases at same version compare equal (we do not rank prerelease suffixes)', () => {
    expect(compareSemver('1.2.0-beta', '1.2.0-rc.1')).toBe(0)
  })
  it('malformed versions sort as 0.0.0', () => {
    expect(compareSemver('not-a-version', '0.0.0')).toBe(0)
  })
})
