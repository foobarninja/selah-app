import { NextResponse } from 'next/server'
import { surfaceNotes } from '@/lib/resurfacing'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ bookId: string; chapter: string; verse: string }> },
) {
  const { bookId, chapter: chapterStr, verse: verseStr } = await params
  const chapter = parseInt(chapterStr, 10)
  const verse = parseInt(verseStr, 10)
  if (isNaN(chapter) || isNaN(verse)) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
  }

  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'No active profile' }, { status: 401 })
  }

  const entries = await surfaceNotes(userId, bookId.toUpperCase(), chapter, verse, verse)
  return NextResponse.json(entries)
}
