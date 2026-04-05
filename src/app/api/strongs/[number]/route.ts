import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ number: string }> },
) {
  const { number } = await params

  const entry = await prisma.strongsEntry.findUnique({
    where: { number },
  })

  if (!entry) {
    return NextResponse.json({ error: 'Strong\'s entry not found' }, { status: 404 })
  }

  // Get verse occurrences (paginated, first 50)
  const occurrences = await prisma.strongsVerseMap.findMany({
    where: { strongsNumber: number },
    take: 50,
    orderBy: [{ bookId: 'asc' }, { chapter: 'asc' }, { verse: 'asc' }],
    select: {
      bookId: true,
      chapter: true,
      verse: true,
      translatedWord: true,
    },
  })

  return NextResponse.json({ entry, occurrences })
}
