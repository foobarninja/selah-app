import { NextRequest, NextResponse } from 'next/server'
import { searchDevotionals, searchSeries } from '@/lib/daily-bread/queries'

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const query = sp.get('q') ?? undefined
  const tagId = sp.get('tag') ?? undefined
  const bookId = sp.get('book') ?? undefined
  const audience = sp.get('audience') ?? undefined
  const limit = parseInt(sp.get('limit') ?? '50', 10)

  const [devotionals, series] = await Promise.all([
    searchDevotionals({ query, tagId, bookId, audience, limit }),
    searchSeries({ query, tagId, bookId, audience, limit }),
  ])

  return NextResponse.json({ devotionals, series })
}
