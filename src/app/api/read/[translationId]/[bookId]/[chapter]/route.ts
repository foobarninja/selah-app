import { NextResponse } from 'next/server'
import { getChapterText } from '@/lib/reader/queries'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ translationId: string; bookId: string; chapter: string }> },
) {
  const { translationId, bookId, chapter: chapterStr } = await params
  const chapter = parseInt(chapterStr, 10)
  if (isNaN(chapter)) {
    return NextResponse.json({ error: 'Invalid chapter' }, { status: 400 })
  }

  const verses = await getChapterText(translationId, bookId.toUpperCase(), chapter)
  return NextResponse.json(verses)
}
