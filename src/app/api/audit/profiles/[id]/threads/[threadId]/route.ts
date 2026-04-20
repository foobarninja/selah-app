import { NextRequest, NextResponse } from 'next/server'
import { getThreadForAudit } from '@/lib/audit/queries'
import { getProfile } from '@/lib/profiles/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string; threadId: string }> }) {
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

  const { id, threadId } = await params
  const target = await getProfile(id)
  if (!target || !target.childLock) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const policy = target.auditPolicy === 'full' ? 'full' : 'flagged-only'
  const thread = await getThreadForAudit(id, parseInt(threadId, 10), policy)
  if (!thread) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json({ thread, policy })
}
