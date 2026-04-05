import { NextResponse } from 'next/server'
import { getMoodTiles } from '@/lib/daily-bread/queries'

export async function GET() {
  const tiles = await getMoodTiles()
  return NextResponse.json(tiles)
}
