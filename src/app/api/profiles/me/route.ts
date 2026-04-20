import { NextResponse } from 'next/server'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'
import { getProfile } from '@/lib/profiles/queries'

export async function GET() {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }
  const p = await getProfile(userId)
  if (!p) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json({
    profile: {
      id: p.id,
      name: p.name,
      avatarColor: p.avatarColor,
      hasPin: p.pinHash !== null,
      isDefault: p.isDefault,
      childLock: p.childLock,
      lockedProvider: p.lockedProvider,
      lockedModel: p.lockedModel,
      auditPolicy: p.auditPolicy,
    },
  })
}
