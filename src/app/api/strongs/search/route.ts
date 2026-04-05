import { NextRequest, NextResponse } from 'next/server'
import { searchStrongs } from '@/lib/word-study/queries'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') ?? ''
  if (!q || q.length < 2) {
    return NextResponse.json([])
  }

  const results = await searchStrongs(q)
  return NextResponse.json(results)
}
