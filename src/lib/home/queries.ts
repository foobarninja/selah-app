import { prisma } from '@/lib/db'
import { BOOK_NAMES } from '@/lib/constants'
import type {
  DailyBread,
  HistoryItem,
  RecentNote,
  DailyBreadStatus,
} from '@/components/home/types'

export async function getDailyBread(): Promise<DailyBread> {
  const today = new Date().toISOString().slice(0, 10)

  const completed = await prisma.devotionalHistory.findFirst({
    where: { completedAt: { startsWith: today } },
    include: { devotional: { select: { title: true } } },
    orderBy: { completedAt: 'desc' },
  })

  if (completed) {
    return {
      status: 'completed' as DailyBreadStatus,
      title: completed.devotional.title,
      audienceLevel: 'family',
      estimatedMinutes: 5,
      seasonalSet: 'ordinary',
      passageRef: '',
      completedMessage: completed.familyNotes || 'Today\'s bread was broken.',
    }
  }

  const devotional = await prisma.devotional.findFirst({
    where: { NOT: { history: { some: {} } } },
    include: { book: { select: { name: true } } },
    orderBy: { createdAt: 'asc' },
  })

  if (!devotional) {
    const count = await prisma.devotional.count()
    const skip = Math.floor(Math.random() * count)
    const random = await prisma.devotional.findFirst({
      skip,
      include: { book: { select: { name: true } } },
    })
    if (!random) {
      return {
        status: 'hidden' as DailyBreadStatus,
        title: '',
        audienceLevel: 'family',
        estimatedMinutes: 5,
        seasonalSet: 'ordinary',
        passageRef: '',
        completedMessage: null,
      }
    }
    const bookName = BOOK_NAMES[random.bookId] ?? random.bookId
    return {
      status: 'available' as DailyBreadStatus,
      title: random.title,
      audienceLevel: random.audience as 'family',
      estimatedMinutes: random.estimatedMinutes,
      seasonalSet: random.season ?? 'ordinary',
      passageRef: `${bookName} ${random.chapter}:${random.verseStart}-${random.verseEnd}`,
      completedMessage: null,
    }
  }

  const bookName = BOOK_NAMES[devotional.bookId] ?? devotional.bookId
  return {
    status: 'available' as DailyBreadStatus,
    title: devotional.title,
    audienceLevel: devotional.audience as 'family',
    estimatedMinutes: devotional.estimatedMinutes,
    seasonalSet: devotional.season ?? 'ordinary',
    passageRef: `${bookName} ${devotional.chapter}:${devotional.verseStart}-${devotional.verseEnd}`,
    completedMessage: null,
  }
}

export async function getRecentHistory(limit = 6): Promise<HistoryItem[]> {
  const entries = await prisma.readingHistory.findMany({
    orderBy: { visitedAt: 'desc' },
    take: limit,
    include: { book: { select: { name: true } } },
  })

  return entries.map((e) => {
    const bookName = BOOK_NAMES[e.bookId] ?? e.bookId
    return {
      id: String(e.id),
      type: 'passage' as const,
      title: `${bookName} ${e.chapter}`,
      context: bookName,
      timeAgo: timeAgo(e.visitedAt),
    }
  })
}

export async function getRecentNotes(limit = 4): Promise<RecentNote[]> {
  const notes = await prisma.userNote.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      anchors: {
        take: 3,
        select: { anchorType: true, bookId: true, chapter: true, verseStart: true, refId: true },
      },
    },
  })

  return notes.map((n) => ({
    id: String(n.id),
    noteType: n.noteType as RecentNote['noteType'],
    snippet: n.content.substring(0, 120),
    anchors: n.anchors.map((a) => {
      if (a.anchorType === 'verse' && a.bookId) {
        const bookName = BOOK_NAMES[a.bookId] ?? a.bookId
        return { type: 'verse' as const, label: `${bookName} ${a.chapter}:${a.verseStart}` }
      }
      return { type: a.anchorType as 'character' | 'theme', label: a.refId ?? '' }
    }),
    timeAgo: timeAgo(n.createdAt),
  }))
}

function timeAgo(dateStr: string): string {
  if (!dateStr) return ''
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return `${Math.floor(days / 7)}w ago`
}
