import { NextRequest, NextResponse } from 'next/server'
import { listProfiles, createProfile } from '@/lib/profiles/queries'
import { isValidPinFormat } from '@/lib/profiles/pin'

const MAX_PROFILES = 10

export async function GET() {
  const profiles = await listProfiles()
  // Don't leak pinHash to clients — just whether a PIN is set.
  return NextResponse.json({
    profiles: profiles.map((p) => ({
      id: p.id,
      name: p.name,
      avatarColor: p.avatarColor,
      hasPin: p.pinHash !== null,
      isDefault: p.isDefault,
    })),
  })
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { name?: string; avatarColor?: string; pin?: string | null }
  if (!body.name || !body.name.trim()) {
    return NextResponse.json({ error: 'name required' }, { status: 400 })
  }
  if (!body.avatarColor) {
    return NextResponse.json({ error: 'avatarColor required' }, { status: 400 })
  }
  if (body.pin != null && !isValidPinFormat(body.pin)) {
    return NextResponse.json({ error: 'PIN must be 4 digits' }, { status: 400 })
  }

  const existing = await listProfiles()
  if (existing.length >= MAX_PROFILES) {
    return NextResponse.json({ error: `Max ${MAX_PROFILES} profiles reached` }, { status: 409 })
  }

  const p = await createProfile({
    name: body.name,
    avatarColor: body.avatarColor,
    pin: body.pin ?? null,
  })
  return NextResponse.json({
    profile: {
      id: p.id,
      name: p.name,
      avatarColor: p.avatarColor,
      hasPin: p.pinHash !== null,
      isDefault: p.isDefault,
    },
  })
}
