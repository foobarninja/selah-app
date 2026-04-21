import { NextResponse } from 'next/server'
import { PROFILE_COOKIE_NAME } from '@/lib/profiles/active-profile'

// POST /api/profiles/logout
//
// Clears the active-profile cookie. The client is expected to navigate to
// /profiles after the response so the middleware gate picks up the now-missing
// cookie and shows the picker. We clear by overwriting with an expired cookie
// on the response; relying on cookies().delete() from next/headers isn't
// always honored when the route returns a JSON response.
export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: PROFILE_COOKIE_NAME,
    value: '',
    path: '/',
    maxAge: 0,
  })
  return res
}
