import { prisma } from '@/lib/db'

export async function recordReading(bookId: string, chapter: number) {
  await prisma.readingHistory.create({
    data: {
      bookId,
      chapter,
      visitedAt: new Date().toISOString(),
    },
  })
}

export async function getLastReading(): Promise<{ bookId: string; chapter: number } | null> {
  const entry = await prisma.readingHistory.findFirst({
    orderBy: { visitedAt: 'desc' },
    select: { bookId: true, chapter: true },
  })
  return entry
}
