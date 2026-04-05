import { NextResponse } from 'next/server'
import { getCharacterProfile } from '@/lib/characters/queries'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const profile = await getCharacterProfile(id)

  if (!profile) {
    return NextResponse.json({ error: 'Character not found' }, { status: 404 })
  }

  return NextResponse.json(profile)
}
