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

import { compareSemver, stripVPrefix } from '../../src/lib/version/compare'

// Re-export so the existing test suite (tests/scripts/check-app-update.test.ts)
// continues to import these from this module. New call sites should import
// directly from @/lib/version/compare.
export { compareSemver, stripVPrefix }

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

main().catch((err) => {
  console.log(`[app-check] unexpected error: ${err instanceof Error ? err.message : String(err)}`)
  process.exit(0)
})
