import { NextResponse } from 'next/server'
import { completeDevotional } from '@/lib/daily-bread/queries'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const body = await request.json()
  const { rating = 0, familyNotes = '' } = body

  await completeDevotional(id, rating, familyNotes)

  return NextResponse.json({ success: true })
}
