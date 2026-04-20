import { NextResponse } from 'next/server'
import { listAuditableProfiles } from '@/lib/audit/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'
import { getProfile } from '@/lib/profiles/queries'

async function requireAdult(): Promise<{ id: string } | { error: NextResponse }> {
  try {
    const id = await requireActiveProfileId()
    const p = await getProfile(id)
    if (!p || !p.pinHash || p.childLock) {
      return { error: NextResponse.json({ error: 'audit access restricted to adult profiles' }, { status: 403 }) }
    }
    return { id }
  } catch {
    return { error: NextResponse.json({ error: 'no active profile' }, { status: 401 }) }
  }
}

export async function GET() {
  const gate = await requireAdult()
  if ('error' in gate) return gate.error
  const profiles = await listAuditableProfiles()
  return NextResponse.json({ profiles })
}
