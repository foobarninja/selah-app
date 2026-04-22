// src/lib/version/compare.ts
//
// Semver utilities shared between the startup version-check script (logs
// to docker logs) and the runtime version-check API route (surfaces a
// banner in the UI). Both need the same comparison semantics.

export function stripVPrefix(tag: string): string {
  return tag.startsWith('v') || tag.startsWith('V') ? tag.slice(1) : tag
}

/**
 * Compare two semver strings. Returns -1 if a < b, 0 if equal, 1 if a > b.
 * Prerelease suffixes are treated conservatively: any prerelease is less
 * than its release counterpart (1.2.0-beta < 1.2.0), and two prereleases
 * at the same version compare equal (we don't rank -rc against -beta for
 * update-nudge purposes).
 */
export function compareSemver(a: string, b: string): -1 | 0 | 1 {
  const pa = parseSemver(a)
  const pb = parseSemver(b)
  for (let i = 0; i < 3; i++) {
    if (pa.parts[i] < pb.parts[i]) return -1
    if (pa.parts[i] > pb.parts[i]) return 1
  }
  if (pa.pre && !pb.pre) return -1
  if (!pa.pre && pb.pre) return 1
  return 0
}

function parseSemver(v: string): { parts: [number, number, number]; pre: string } {
  const match = /^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/.exec(v)
  if (!match) return { parts: [0, 0, 0], pre: '' }
  return {
    parts: [Number(match[1]), Number(match[2]), Number(match[3])],
    pre: match[4] ?? '',
  }
}
