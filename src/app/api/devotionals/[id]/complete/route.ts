import { NextResponse } from 'next/server'
import { completeDevotional } from '@/lib/daily-bread/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const { rating = 0, familyNotes = '' } = body

  await completeDevotional(userId, id, rating, familyNotes)

  return NextResponse.json({ success: true })
}
