import { NextRequest, NextResponse } from 'next/server'
import { listFlaggedThreads } from '@/lib/audit/queries'
import { getProfile } from '@/lib/profiles/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
  const target = await getProfile(id)
  if (!target) return NextResponse.json({ error: 'not found' }, { status: 404 })
  if (!target.childLock) return NextResponse.json({ error: 'profile is not audit-eligible' }, { status: 400 })

  const threads = await listFlaggedThreads(id)
  return NextResponse.json({
    profile: {
      id: target.id,
      name: target.name,
      avatarColor: target.avatarColor,
      auditPolicy: target.auditPolicy,
    },
    threads,
  })
}
