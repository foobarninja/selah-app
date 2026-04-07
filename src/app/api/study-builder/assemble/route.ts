import { NextRequest, NextResponse } from 'next/server'
import { assembleMaterial } from '@/lib/study-builder/queries'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const topic = request.nextUrl.searchParams.get('topic') || ''
  if (!topic || topic.trim().length < 2) {
    return NextResponse.json([])
  }
  const sections = await assembleMaterial(topic)
  return NextResponse.json(sections)
}
