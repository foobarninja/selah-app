import { NextResponse } from 'next/server'
import { getCrossRefs } from '@/lib/reader/queries'

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

  const refs = await getCrossRefs(bookId.toUpperCase(), chapter, verse, verse)
  return NextResponse.json(refs)
}
