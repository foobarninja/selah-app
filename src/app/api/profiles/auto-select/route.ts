import { NextResponse } from 'next/server'
import { listProfiles } from '@/lib/profiles/queries'
import { attachActiveProfileCookie } from '@/lib/profiles/active-profile'

// GET /api/profiles/auto-select
//
// Single-profile, no-PIN installs don't need to see the picker every boot.
// The picker page redirects here; we set the cookie on the redirect response
// and bounce home. Setting the cookie via next/headers' cookies() before a
// NextResponse.redirect() does not reliably propagate, so we attach to the
// response object directly.
// If the install doesn't match the single-profile-no-PIN shape, we bounce back
// to /profiles and the picker renders normally.
export async function GET(request: Request) {
  const profiles = await listProfiles()
  const origin = new URL(request.url).origin

  if (profiles.length === 1 && !profiles[0].pinHash) {
    return attachActiveProfileCookie(
      NextResponse.redirect(new URL('/', origin)),
      profiles[0].id,
      request,
    )
  }

  return NextResponse.redirect(new URL('/profiles', origin))
}
