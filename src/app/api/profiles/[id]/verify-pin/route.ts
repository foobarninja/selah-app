import { NextRequest, NextResponse } from 'next/server'
import { getProfile } from '@/lib/profiles/queries'
import { verifyPin } from '@/lib/profiles/pin'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const { pin } = (await request.json().catch(() => ({}))) as { pin?: string }
  const p = await getProfile(id)
  if (!p) return NextResponse.json({ error: 'not found' }, { status: 404 })
  if (!p.pinHash) return NextResponse.json({ ok: true }) // no PIN set → trivially passes
  if (!pin || !(await verifyPin(pin, p.pinHash))) {
    return NextResponse.json({ error: 'invalid PIN' }, { status: 401 })
  }
  return NextResponse.json({ ok: true })
}
