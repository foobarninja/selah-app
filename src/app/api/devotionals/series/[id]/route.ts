import { NextRequest, NextResponse } from 'next/server'
import { getSeriesById } from '@/lib/daily-bread/queries'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const series = await getSeriesById(id)
  if (!series) {
    return NextResponse.json({ error: 'Series not found' }, { status: 404 })
  }
  return NextResponse.json(series)
}
