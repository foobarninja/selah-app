import { prisma } from '@/lib/db'
import { BOOK_NAMES } from '@/lib/constants'
import type {
  MoodTile,
  Devotional,
  DevotionalSummary,
  DevotionalHistory,
} from '@/components/daily-bread/types'

export async function getMoodTiles(): Promise<MoodTile[]> {
  const tags = await prisma.devotionalTag.findMany({
    where: { parentTagId: null },
    orderBy: { sortOrder: 'asc' },
  })

  // Map tag categories to mood categories
  const categoryMap: Record<string, 'weight' | 'warmth' | 'stillness'> = {
    'life-situations': 'weight',
    'emotional-states': 'weight',
    'seasons': 'warmth',
    'family-moments': 'warmth',
    'spiritual-growth': 'stillness',
    'audiences': 'stillness',
  }

  return tags.map((t) => ({
    id: t.id,
    label: t.name,
    category: categoryMap[t.category] ?? 'weight',
  }))
}

export async function getDevotionalByMood(moodTagId: string): Promise<Devotional | null> {
  const tagMap = await prisma.devotionalTagMap.findFirst({
    where: { tagId: moodTagId },
    include: {
      devotional: {
        include: { book: true },
      },
    },
  })

  if (!tagMap) return null
  return mapDevotional(tagMap.devotional)
}

export async function getDevotionalById(id: string): Promise<Devotional | null> {
  const dev = await prisma.devotional.findUnique({
    where: { id },
    include: { book: true },
  })
  if (!dev) return null
  return mapDevotional(dev)
}

export async function getTonightDevotional(): Promise<Devotional | null> {
  // Pick an unused devotional
  const dev = await prisma.devotional.findFirst({
    where: { NOT: { history: { some: {} } } },
    include: { book: true },
    orderBy: { createdAt: 'asc' },
  })

  if (!dev) {
    // All used — pick random
    const count = await prisma.devotional.count()
    const skip = Math.floor(Math.random() * count)
    const random = await prisma.devotional.findFirst({
      skip,
      include: { book: true },
    })
    if (!random) return null
    return mapDevotional(random)
  }

  return mapDevotional(dev)
}

export async function getBrowseDevotionals(limit = 20): Promise<DevotionalSummary[]> {
  const devs = await prisma.devotional.findMany({
    take: limit,
    orderBy: { title: 'asc' },
    include: {
      book: true,
      tagMaps: { include: { tag: { select: { name: true } } }, take: 1 },
    },
  })

  return devs.map((d) => {
    const bookName = BOOK_NAMES[d.bookId] ?? d.bookId
    return {
      id: d.id,
      title: d.title,
      passageRef: `${bookName} ${d.chapter}:${d.verseStart}-${d.verseEnd}`,
      audienceLevel: d.audience as DevotionalSummary['audienceLevel'],
      estimatedMinutes: d.estimatedMinutes,
      seasonalSet: (d.season ?? 'ordinary') as DevotionalSummary['seasonalSet'],
      situation: d.tagMaps[0]?.tag.name ?? '',
    }
  })
}

export async function getDevotionalHistory(limit = 20): Promise<DevotionalHistory[]> {
  const entries = await prisma.devotionalHistory.findMany({
    orderBy: { completedAt: 'desc' },
    take: limit,
    include: { devotional: { select: { title: true, audience: true } } },
  })

  return entries.map((e) => ({
    id: String(e.id),
    date: e.completedAt,
    devotionalId: e.devotionalId,
    title: e.devotional.title,
    rating: e.rating ?? 0,
    familyNotes: e.familyNotes ?? '',
    audienceLevel: (e.devotional.audience ?? 'family') as DevotionalHistory['audienceLevel'],
  }))
}

export async function completeDevotional(
  devotionalId: string,
  rating: number,
  familyNotes: string,
): Promise<void> {
  await prisma.devotionalHistory.create({
    data: {
      devotionalId,
      completedAt: new Date().toISOString(),
      rating,
      familyNotes: familyNotes || null,
    },
  })
}

async function mapDevotional(dev: {
  id: string; title: string; bookId: string; chapter: number;
  verseStart: number; verseEnd: number; contextBrief: string;
  modernMoment: string; conversationStarters: string;
  goingDeeper: string | null; audience: string;
  estimatedMinutes: number; season: string | null;
  narrativeId: string | null;
}): Promise<Devotional> {
  const bookName = BOOK_NAMES[dev.bookId] ?? dev.bookId
  const passageRef = `${bookName} ${dev.chapter}:${dev.verseStart}-${dev.verseEnd}`

  // Fetch the actual passage text
  const verses = await prisma.verse.findMany({
    where: {
      translationId: 'BSB',
      bookId: dev.bookId,
      chapter: dev.chapter,
      verse: { gte: dev.verseStart, lte: dev.verseEnd },
    },
    orderBy: { verse: 'asc' },
  })
  const passageText = verses.map((v) => `${v.verse} ${v.text}`).join(' ')

  // Parse conversation starters (stored as JSON array)
  let starters: string[] = []
  try {
    starters = JSON.parse(dev.conversationStarters)
  } catch {
    starters = [dev.conversationStarters]
  }

  return {
    id: dev.id,
    title: dev.title,
    passageRef,
    audienceLevel: dev.audience as Devotional['audienceLevel'],
    estimatedMinutes: dev.estimatedMinutes,
    seasonalSet: (dev.season ?? 'ordinary') as Devotional['seasonalSet'],
    moodMatch: '',
    passage: passageText,
    contextBrief: dev.contextBrief,
    modernMoment: dev.modernMoment,
    conversationStarters: starters,
    goingDeeper: {
      narrativeUnitRef: dev.narrativeId ?? '',
      prompt: dev.goingDeeper ?? '',
    },
  }
}
