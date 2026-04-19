import { NextRequest, NextResponse } from 'next/server'
import { getBookmarks, createBookmark } from '@/lib/journal/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET() {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const bookmarks = await getBookmarks(userId)
  return NextResponse.json(bookmarks)
}

export async function POST(request: NextRequest) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { bookId, chapter, verse } = await request.json()
  const id = await createBookmark(userId, bookId, chapter, verse)
  return NextResponse.json({ id }, { status: 201 })
}
