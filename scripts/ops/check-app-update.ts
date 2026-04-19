// scripts/ops/check-app-update.ts
//
// Startup-time check: is there a newer tagged release of Selah on GitHub
// than the version baked into this image? Log-only, fail-open; never
// blocks boot. Mirrors scripts/ops/check-seed-update.ts in shape so the
// two coexist predictably.
//
// Skipped entirely when:
//   - APP_VERSION is "0.0.0-dev" (local dev / contributor build)
//   - The GitHub releases API fetch fails or times out

const RELEASES_URL =
  'https://api.github.com/repos/foobarninja/selah-app/releases/latest'
const TIMEOUT_MS = 5_000

interface GitHubRelease {
  tag_name: string
  html_url: string
  name?: string
}

async function main() {
  const current = process.env.APP_VERSION ?? '0.0.0-dev'

  if (current === '0.0.0-dev') {
    console.log('[app-check] dev build — skipping version check')
    return
  }

  const latest = await fetchLatestRelease()
  if (!latest) return // already logged

  const latestVersion = stripVPrefix(latest.tag_name)

  const cmp = compareSemver(current, latestVersion)
  if (cmp >= 0) {
    console.log(`[app-check] app v${current} is current`)
    return
  }

  console.log(`[app-check] update available: v${current} -> v${latestVersion}`)
  console.log(`[app-check] release notes: ${latest.html_url}`)
  console.log(`[app-check] to update: docker compose pull && docker compose up -d`)
}

async function fetchLatestRelease(): Promise<GitHubRelease | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(RELEASES_URL, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (res.status === 404) {
      // No releases yet — common for a project's very first deploy.
      return null
    }
    if (!res.ok) {
      console.log(`[app-check] GitHub releases unavailable (HTTP ${res.status}); skipping`)
      return null
    }
    return (await res.json()) as GitHubRelease
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.log(`[app-check] GitHub releases fetch failed (${msg}); skipping`)
    return null
  } finally {
    clearTimeout(timer)
  }
}

export function stripVPrefix(tag: string): string {
  return tag.startsWith('v') || tag.startsWith('V') ? tag.slice(1) : tag
}

/**
 * Compare two semver strings. Returns -1 if a < b, 0 if equal, 1 if a > b.
 * Handles prerelease suffixes conservatively: any prerelease is treated as
 * less than its release counterpart (1.2.0-beta < 1.2.0) but equal-to
 * itself across other prereleases (1.2.0-beta vs 1.2.0-rc.1 → equal, since
 * we don't care about prerelease ordering for update nudges).
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

main().catch((err) => {
  console.log(`[app-check] unexpected error: ${err instanceof Error ? err.message : String(err)}`)
  process.exit(0)
})
