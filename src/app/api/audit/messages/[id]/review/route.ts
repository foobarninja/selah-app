import { NextRequest, NextResponse } from 'next/server'
import { markMessageReviewed } from '@/lib/audit/queries'
import { getProfile } from '@/lib/profiles/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function POST(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  let activeId: string
  try {
    activeId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }
  const active = await getProfile(activeId)
  if (!active || !active.pinHash || active.childLock) {
    return NextResponse.json({ error: 'audit access restricted to adult profiles' }, { status: 403 })
  }
  const { id } = await params
  await markMessageReviewed(parseInt(id, 10))
  return NextResponse.json({ ok: true })
}
