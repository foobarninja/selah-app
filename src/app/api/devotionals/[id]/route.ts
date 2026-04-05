import { NextResponse } from 'next/server'
import { getDevotionalById } from '@/lib/daily-bread/queries'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const devotional = await getDevotionalById(id)

  if (!devotional) {
    return NextResponse.json({ error: 'Devotional not found' }, { status: 404 })
  }

  return NextResponse.json(devotional)
}
