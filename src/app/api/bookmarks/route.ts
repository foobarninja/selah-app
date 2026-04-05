import { NextRequest, NextResponse } from 'next/server'
import { getBookmarks, createBookmark } from '@/lib/journal/queries'

export async function GET() {
  const bookmarks = await getBookmarks()
  return NextResponse.json(bookmarks)
}

export async function POST(request: NextRequest) {
  const { bookId, chapter, verse } = await request.json()
  const id = await createBookmark(bookId, chapter, verse)
  return NextResponse.json({ id }, { status: 201 })
}
