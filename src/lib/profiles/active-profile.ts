// src/lib/profiles/active-profile.ts
//
// Resolves the active profile from the selah-profile-id HTTP-only cookie.
// Used by server components and API routes to scope user-local queries.

import { cookies } from 'next/headers'
import type { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const PROFILE_COOKIE_NAME = 'selah-profile-id'

const COOKIE_ATTRS = {
  name: PROFILE_COOKIE_NAME,
  httpOnly: true,
  sameSite: 'strict' as const,
  path: '/',
}

function secureFlag(): boolean {
  return process.env.NODE_ENV === 'production'
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

export async function setActiveProfileCookie(id: string): Promise<void> {
  const store = await cookies()
  store.set({ ...COOKIE_ATTRS, value: id, secure: secureFlag() })
}

export async function clearActiveProfileCookie(): Promise<void> {
  const store = await cookies()
  store.delete(PROFILE_COOKIE_NAME)
}

// Apply the active-profile cookie directly to a NextResponse. Use this from
// Route Handlers that return a redirect — NextResponse.redirect() does not
// always propagate mutations made via the next/headers cookie store, so the
// reliable pattern is to set the cookie on the response object itself.
export function attachActiveProfileCookie<T extends NextResponse>(response: T, id: string): T {
  response.cookies.set({ ...COOKIE_ATTRS, value: id, secure: secureFlag() })
  return response
}
