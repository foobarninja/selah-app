import { NextRequest, NextResponse } from 'next/server'
import { assembleMaterial } from '@/lib/study-builder/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const topic = request.nextUrl.searchParams.get('topic') || ''
  if (!topic || topic.trim().length < 2) {
    return NextResponse.json([])
  }
  const sections = await assembleMaterial(userId, topic)
  return NextResponse.json(sections)
}
