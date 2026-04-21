// src/middleware.ts
//
// Redirects to /profiles when the selah-profile-id cookie is absent.
// Allows /profiles, /api/profiles/*, /_next, static assets, and the
// seed-update routes (they're triggered by the entrypoint, not users).
//
// The middleware runs on the edge — it CANNOT validate the cookie
// against the DB. It only checks that the cookie exists. Invalid
// cookies (e.g., pointing at a deleted profile) are caught later by
// getActiveProfileId returning null; that path is handled by server
// components and route handlers.

import { NextRequest, NextResponse } from 'next/server'

const PROFILE_COOKIE_NAME = 'selah-profile-id'

const ALLOW_PREFIXES = [
  '/profiles',
  '/_next',
  '/favicon',
  '/api/health',
]

// /api/profiles is partially open: the picker page needs GET (list) and
// POST /select + POST /logout + GET /auto-select to work without an active
// cookie. All other profile API surface (e.g. /api/profiles/[id]) is
// REQUIRED to be authenticated and falls through to the cookie gate below.
const PROFILE_API_OPEN_PATHS = new Set([
  '/api/profiles',
  '/api/profiles/select',
  '/api/profiles/logout',
  '/api/profiles/auto-select',
  '/api/profiles/me',
])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow listed prefixes + any file with an extension (static assets).
  if (ALLOW_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }
  if (PROFILE_API_OPEN_PATHS.has(pathname)) {
    return NextResponse.next()
  }
  if (/\.[a-zA-Z0-9]{2,5}$/.test(pathname)) {
    return NextResponse.next()
  }

  const cookie = request.cookies.get(PROFILE_COOKIE_NAME)
  if (!cookie) {
    const url = request.nextUrl.clone()
    url.pathname = '/profiles'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match everything except Next internals the `ALLOW_PREFIXES` list
    // would cover anyway. The prefix check inside the function is the
    // authoritative gate.
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
