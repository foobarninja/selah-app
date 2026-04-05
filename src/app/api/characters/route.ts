import { NextRequest, NextResponse } from 'next/server'
import { getCharacters } from '@/lib/characters/queries'

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('q') ?? undefined
  const era = request.nextUrl.searchParams.get('era') ?? undefined
  const limit = parseInt(request.nextUrl.searchParams.get('limit') ?? '100', 10)

  const characters = await getCharacters({ search, era, limit })
  return NextResponse.json(characters)
}
