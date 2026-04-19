import { NextResponse } from 'next/server'
import { listProfiles } from '@/lib/profiles/queries'
import { setActiveProfileCookie } from '@/lib/profiles/active-profile'

// GET /api/profiles/auto-select
//
// Single-profile, no-PIN installs don't need to see the picker every boot.
// The picker page redirects here; we set the cookie (only Route Handlers and
// Server Actions may mutate cookies — Server Components can't) and bounce home.
// If the install doesn't match that shape, we bounce back to /profiles and the
// picker renders normally.
export async function GET(request: Request) {
  const profiles = await listProfiles()
  const origin = new URL(request.url).origin

  if (profiles.length === 1 && !profiles[0].pinHash) {
    await setActiveProfileCookie(profiles[0].id)
    return NextResponse.redirect(new URL('/', origin))
  }

  return NextResponse.redirect(new URL('/profiles', origin))
}
