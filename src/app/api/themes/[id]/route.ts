import { NextResponse } from 'next/server'
import { getThemeProfile } from '@/lib/themes/queries'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const profile = await getThemeProfile(id)

  if (!profile) {
    return NextResponse.json({ error: 'Theme not found' }, { status: 404 })
  }

  return NextResponse.json(profile)
}
