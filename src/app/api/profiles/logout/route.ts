import { NextRequest, NextResponse } from 'next/server'
import { PROFILE_COOKIE_NAME } from '@/lib/profiles/active-profile'

// POST /api/profiles/logout
//
// Clears the active-profile cookie. The client is expected to hard-navigate
// to /profiles after the response so middleware picks up the now-missing
// cookie. We overwrite with an expired cookie that mirrors the attributes
// the setter uses (httpOnly, sameSite, secure-from-scheme) so no attribute
// drift between set and clear leaves a partial cookie behind.
export async function POST(request: NextRequest) {
  const res = NextResponse.json({ ok: true })
  const scheme = request.nextUrl.protocol
  const forwardedProto = request.headers.get('x-forwarded-proto')
  const secure =
    scheme === 'https:' ||
    (forwardedProto && forwardedProto.split(',')[0].trim().toLowerCase() === 'https')
  res.cookies.set({
    name: PROFILE_COOKIE_NAME,
    value: '',
    path: '/',
    maxAge: 0,
    httpOnly: true,
    sameSite: 'strict',
    secure: Boolean(secure),
  })
  return res
}
