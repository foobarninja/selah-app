// src/lib/profiles/active-profile.ts
//
// Resolves the active profile from the selah-profile-id HTTP-only cookie.
// Used by server components and API routes to scope user-local queries.

import { cookies } from 'next/headers'
import type { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const PROFILE_COOKIE_NAME = 'selah-profile-id'

const COOKIE_ATTRS = {
  name: PROFILE_COOKIE_NAME,
  httpOnly: true,
  sameSite: 'strict' as const,
  path: '/',
}

// Derive the Secure cookie flag from the actual request scheme, not from
// NODE_ENV. Self-hosted LAN installs routinely run HTTP on a private IP
// (e.g. http://192.168.1.10:4610) — marking the cookie Secure there would
// cause browsers to withhold it on HTTP requests, breaking auth immediately
// after login. We honor X-Forwarded-Proto so HTTPS reverse-proxy setups
// still get Secure cookies.
function isHttpsRequest(scheme: string | null | undefined, forwardedProto: string | null): boolean {
  if (forwardedProto && forwardedProto.split(',')[0].trim().toLowerCase() === 'https') return true
  return scheme === 'https:' || scheme === 'https'
}

export async function getActiveProfileId(): Promise<string | null> {
  const store = await cookies()
  const id = store.get(PROFILE_COOKIE_NAME)?.value
  if (!id) return null
  const row = await prisma.userProfile.findUnique({
    where: { id },
    select: { id: true },
  })
  return row ? row.id : null
}

export async function requireActiveProfileId(): Promise<string> {
  const id = await getActiveProfileId()
  if (!id) throw new Error('no active profile')
  return id
}

export async function clearActiveProfileCookie(): Promise<void> {
  const store = await cookies()
  store.delete(PROFILE_COOKIE_NAME)
}

// Apply the active-profile cookie directly to a NextResponse. Use this from
// Route Handlers that return a redirect — NextResponse.redirect() does not
// always propagate mutations made via the next/headers cookie store, so the
// reliable pattern is to set the cookie on the response object itself.
export function attachActiveProfileCookie<T extends NextResponse>(
  response: T,
  id: string,
  request: NextRequest | Request,
): T {
  const scheme = 'nextUrl' in request ? request.nextUrl.protocol : new URL(request.url).protocol
  const forwardedProto = request.headers.get('x-forwarded-proto')
  const secure = isHttpsRequest(scheme, forwardedProto)
  response.cookies.set({ ...COOKIE_ATTRS, value: id, secure })
  return response
}
