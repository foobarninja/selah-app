import { NextResponse } from 'next/server'
import { compareSemver, stripVPrefix } from '@/lib/version/compare'

// GET /api/version/check
//
// Returns the running app's version vs the latest GitHub release. The banner
// in AppShell polls this on mount + once per hour to surface an unobtrusive
// "update available" nudge. Fail-open: any network error returns
// updateAvailable=false with a null latest, so a flaky GitHub connection
// never makes the UI nag about a version it can't confirm.
//
// Response is cached for 5 minutes via CDN-style Cache-Control so rapid
// page navigations don't hammer GitHub's 60 req/hour unauthenticated limit.

const RELEASES_URL =
  'https://api.github.com/repos/foobarninja/selah-app/releases/latest'
const TIMEOUT_MS = 5_000

interface GitHubRelease {
  tag_name: string
  html_url: string
}

interface VersionCheckResponse {
  current: string
  latest: string | null
  updateAvailable: boolean
  releaseUrl: string | null
  /** true when running a dev build (APP_VERSION=0.0.0-dev); client should skip nag. */
  isDev: boolean
}

export async function GET() {
  const current = process.env.APP_VERSION ?? '0.0.0-dev'
  const isDev = current === '0.0.0-dev'

  const payload: VersionCheckResponse = {
    current,
    latest: null,
    updateAvailable: false,
    releaseUrl: null,
    isDev,
  }

  if (isDev) {
    return jsonWithCache(payload)
  }

  const release = await fetchLatestRelease()
  if (!release) {
    return jsonWithCache(payload)
  }

  const latest = stripVPrefix(release.tag_name)
  const updateAvailable = compareSemver(current, latest) < 0

  return jsonWithCache({
    ...payload,
    latest,
    updateAvailable,
    releaseUrl: updateAvailable ? release.html_url : null,
  })
}

function jsonWithCache(body: VersionCheckResponse) {
  return NextResponse.json(body, {
    headers: {
      // 5 minutes of CDN-friendly caching. stale-while-revalidate covers
      // the case where GitHub is briefly unreachable during the next check.
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
    },
  })
}

async function fetchLatestRelease(): Promise<GitHubRelease | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(RELEASES_URL, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return null
    return (await res.json()) as GitHubRelease
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}
