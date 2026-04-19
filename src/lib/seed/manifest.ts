// src/lib/seed/manifest.ts
//
// Seed manifest — published alongside the .db.xz on Hugging Face.
// Format intentionally minimal; additive fields only going forward.

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

/** App's current understanding of the DB schema. Bump when the app's
 *  Prisma schema changes in a way that's not forward-compatible with an
 *  older seed. */
export const APP_SCHEMA_VERSION = 1

/** URL where the live manifest is hosted. */
export const MANIFEST_URL =
  'https://huggingface.co/datasets/foooobear/selah-db/resolve/main/manifest.json'

/** Local file recording the seed version currently installed. */
export const LOCAL_VERSION_FILE = 'data/.seed-version'

export function compareSeedVersions(a: string, b: string): -1 | 0 | 1 {
  if (a === b) return 0
  return a < b ? -1 : 1
}
