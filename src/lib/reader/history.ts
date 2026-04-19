import { prisma } from '@/lib/db'

export async function recordReading(userId: string, bookId: string, chapter: number) {
  await prisma.readingHistory.create({
    data: {
      userId,
      bookId,
      chapter,
      visitedAt: new Date().toISOString(),
    },
  })
}

export async function getLastReading(userId: string): Promise<{ bookId: string; chapter: number } | null> {
  const entry = await prisma.readingHistory.findFirst({
    where: { userId },
    orderBy: { visitedAt: 'desc' },
    select: { bookId: true, chapter: true },
  })
  return entry
}
