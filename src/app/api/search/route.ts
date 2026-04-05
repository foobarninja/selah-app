import { NextRequest, NextResponse } from 'next/server'
import { universalSearch } from '@/lib/search/queries'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') ?? ''
  const limit = parseInt(request.nextUrl.searchParams.get('limit') ?? '10', 10)

  const results = await universalSearch(q, limit)
  return NextResponse.json(results)
}
