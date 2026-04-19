// src/lib/seed/manifest.ts
//
// Seed manifest — published alongside the .db.xz on Hugging Face.
// Format intentionally minimal; additive fields only going forward.

import { existsSync, readFileSync, writeFileSync } from 'fs'

export interface SeedManifest {
  /** Human-readable version, e.g. "2026.04.18". Lexicographic ordering. */
  seedVersion: string
  /** Bumped when the DB schema changes in a way that requires app-code
   *  awareness. The running app refuses to load a seed with a higher
   *  schemaVersion than it understands. */
  schemaVersion: number
  /** sha256 of the .xz artifact. Verified after download. */
  sha256: string
  /** Size in bytes of the .xz artifact. */
  sizeXz: number
  /** Size in bytes of the raw .db after decompression. */
  sizeRaw: number
  /** ISO 8601 timestamp. */
  releasedAt: string
  /** Canonical download URL for the .xz. */
  downloadUrl: string
  /** Optional release notes (markdown-safe plain text). */
  notes?: string
}

/** App's current understanding of the DB schema. Bump this when the
 *  Prisma schema changes in a way that's not forward-compatible with an
 *  older seed. Used for TWO checks:
 *    1. Upward: we refuse to auto-apply a remote seed whose schemaVersion
 *       exceeds this number (would break this older app).
 *    2. Downward: APP_MIN_SEED_SCHEMA below is the floor — if the local
 *       seed's schemaVersion is lower than this, the app warns loudly on
 *       boot because the app assumes columns/tables that don't exist yet. */
export const APP_SCHEMA_VERSION = 1

/** Minimum seed schemaVersion this app can run correctly against. When
 *  you add code that queries a new column/table, bump APP_SCHEMA_VERSION
 *  AND bump this to the same number — running against an older seed will
 *  produce Prisma errors. Pinned-seed operators see the warning and know
 *  to update. */
export const APP_MIN_SEED_SCHEMA = 1

/** URL where the live manifest is hosted. */
export const MANIFEST_URL =
  'https://huggingface.co/datasets/foooobear/selah-db/resolve/main/manifest.json'

/** Local file recording the seed version currently installed. */
export const LOCAL_VERSION_FILE = 'data/.seed-version'

export interface LocalSeedState {
  seedVersion: string
  schemaVersion: number
}

/** Read the local seed version marker. Returns null if missing. Tolerates
 *  the legacy plain-string format (used by the first shipping release of
 *  this feature) by assuming schemaVersion = 1. */
export function readLocalSeedState(path: string): LocalSeedState | null {
  if (!existsSync(path)) return null
  const raw = readFileSync(path, 'utf8').trim()
  if (raw.length === 0) return null
  if (raw.startsWith('{')) {
    try {
      const parsed = JSON.parse(raw) as Partial<LocalSeedState>
      if (typeof parsed.seedVersion !== 'string') return null
      const schemaVersion = typeof parsed.schemaVersion === 'number' ? parsed.schemaVersion : 1
      return { seedVersion: parsed.seedVersion, schemaVersion }
    } catch {
      return null
    }
  }
  // Legacy: bare version string.
  return { seedVersion: raw, schemaVersion: 1 }
}

export function writeLocalSeedState(path: string, state: LocalSeedState): void {
  writeFileSync(path, JSON.stringify(state, null, 2) + '\n', 'utf8')
}

export function compareSeedVersions(a: string, b: string): -1 | 0 | 1 {
  if (a === b) return 0
  return a < b ? -1 : 1
}
