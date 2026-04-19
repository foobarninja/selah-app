// src/lib/profiles/active-profile.ts
//
// Resolves the active profile from the selah-profile-id HTTP-only cookie.
// Used by server components and API routes to scope user-local queries.

import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'

export const PROFILE_COOKIE_NAME = 'selah-profile-id'

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
  store.set({
    name: PROFILE_COOKIE_NAME,
    value: id,
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  })
}

export async function clearActiveProfileCookie(): Promise<void> {
  const store = await cookies()
  store.delete(PROFILE_COOKIE_NAME)
}
