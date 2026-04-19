import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import {
  readLocalSeedState,
  writeLocalSeedState,
  compareSeedVersions,
} from '@/lib/seed/manifest'

describe('manifest helpers', () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'selah-manifest-'))
  })
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  describe('readLocalSeedState', () => {
    it('returns null when the file does not exist', () => {
      expect(readLocalSeedState(join(dir, 'missing'))).toBeNull()
    })

    it('returns null on empty file', () => {
      const p = join(dir, '.seed-version')
      writeFileSync(p, '', 'utf8')
      expect(readLocalSeedState(p)).toBeNull()
    })

    it('parses modern JSON format', () => {
      const p = join(dir, '.seed-version')
      writeFileSync(p, JSON.stringify({ seedVersion: '2026.04.19', schemaVersion: 2 }))
      expect(readLocalSeedState(p)).toEqual({ seedVersion: '2026.04.19', schemaVersion: 2 })
    })

    it('defaults schemaVersion to 1 when JSON omits it', () => {
      const p = join(dir, '.seed-version')
      writeFileSync(p, JSON.stringify({ seedVersion: '2026.04.19' }))
      expect(readLocalSeedState(p)).toEqual({ seedVersion: '2026.04.19', schemaVersion: 1 })
    })

    it('tolerates legacy bare-string format by assuming schemaVersion=1', () => {
      const p = join(dir, '.seed-version')
      writeFileSync(p, '2026.04.19\n', 'utf8')
      expect(readLocalSeedState(p)).toEqual({ seedVersion: '2026.04.19', schemaVersion: 1 })
    })

    it('returns null on malformed JSON', () => {
      const p = join(dir, '.seed-version')
      writeFileSync(p, '{ not valid json', 'utf8')
      expect(readLocalSeedState(p)).toBeNull()
    })
  })

  describe('writeLocalSeedState', () => {
    it('writes JSON that readLocalSeedState can roundtrip', () => {
      const p = join(dir, '.seed-version')
      writeLocalSeedState(p, { seedVersion: '2026.05.01', schemaVersion: 3 })
      expect(readLocalSeedState(p)).toEqual({ seedVersion: '2026.05.01', schemaVersion: 3 })
    })
  })

  describe('compareSeedVersions', () => {
    it('orders lexicographically with equal returning 0', () => {
      expect(compareSeedVersions('2026.04.19', '2026.04.19')).toBe(0)
      expect(compareSeedVersions('2026.04.19', '2026.05.01')).toBe(-1)
      expect(compareSeedVersions('2026.05.01', '2026.04.19')).toBe(1)
    })
  })
})
