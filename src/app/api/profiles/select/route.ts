import { NextRequest, NextResponse } from 'next/server'
import { getProfile } from '@/lib/profiles/queries'
import { verifyPin } from '@/lib/profiles/pin'
import { attachActiveProfileCookie } from '@/lib/profiles/active-profile'

export async function POST(request: NextRequest) {
  const { id, pin } = (await request.json().catch(() => ({}))) as { id?: string; pin?: string }
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const p = await getProfile(id)
  if (!p) return NextResponse.json({ error: 'not found' }, { status: 404 })
  if (p.pinHash) {
    if (!pin || !(await verifyPin(pin, p.pinHash))) {
      return NextResponse.json({ error: 'invalid PIN' }, { status: 401 })
    }
  }
  return attachActiveProfileCookie(NextResponse.json({ ok: true }), id)
}
