import { NextRequest, NextResponse } from 'next/server'
import { getTonightDevotional, getDevotionalByMood } from '@/lib/daily-bread/queries'

export async function GET(request: NextRequest) {
  const mood = request.nextUrl.searchParams.get('mood')

  const devotional = mood
    ? await getDevotionalByMood(mood)
    : await getTonightDevotional()

  if (!devotional) {
    return NextResponse.json({ error: 'No devotional available' }, { status: 404 })
  }

  return NextResponse.json(devotional)
}
