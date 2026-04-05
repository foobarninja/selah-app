import { NextResponse } from 'next/server'
import { getSceneCast } from '@/lib/reader/queries'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ bookId: string; chapter: string; verseStart: string }> },
) {
  const { bookId, chapter: chapterStr, verseStart: verseStr } = await params
  const chapter = parseInt(chapterStr, 10)
  const verseStart = parseInt(verseStr, 10)
  if (isNaN(chapter) || isNaN(verseStart)) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
  }

  const sceneCast = await getSceneCast(bookId.toUpperCase(), chapter, verseStart, verseStart + 50)
  return NextResponse.json(sceneCast)
}
