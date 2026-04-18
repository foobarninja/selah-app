import Database from 'better-sqlite3'
import { prisma } from '@/lib/db'
import { BOOK_NAMES } from '@/lib/constants'
import type {
  MoodTile,
  Devotional,
  DevotionalSummary,
  DevotionalHistory,
  SeriesSummary,
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

function getDb() {
  const override = process.env.SELAH_DB_PATH_OVERRIDE
  if (override) return new Database(override, { readonly: true })
  const dbUrl = process.env.DATABASE_URL ?? 'file:./data/selah.db'
  const dbPath = dbUrl.replace('file:', '')
  return new Database(dbPath, { readonly: true })
}

export async function searchDevotionals(opts: {
  query?: string
  tagId?: string
  bookId?: string
  audience?: string
  limit?: number
}): Promise<DevotionalSummary[]> {
  const db = getDb()
  try {
    const where: string[] = []
    const params: unknown[] = []

    if (opts.query && opts.query.trim().length >= 2) {
      const q = `%${opts.query.trim()}%`
      where.push('(d.title LIKE ? OR d.context_brief LIKE ? OR d.modern_moment LIKE ?)')
      params.push(q, q, q)
    }
    if (opts.tagId) {
      where.push('EXISTS (SELECT 1 FROM devotional_tag_map m WHERE m.devotional_id = d.id AND m.tag_id = ?)')
      params.push(opts.tagId)
    }
    if (opts.bookId) {
      where.push('d.book_id = ?')
      params.push(opts.bookId)
    }
    if (opts.audience) {
      if (opts.audience === 'tween') {
        where.push('EXISTS (SELECT 1 FROM devotional_tag_map m WHERE m.devotional_id = d.id AND m.tag_id = ?)')
        params.push('tween')
      } else {
        where.push('d.audience = ?')
        params.push(opts.audience)
      }
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''
    const limit = opts.limit ?? 50

    const rows = db.prepare(`
      SELECT d.id, d.title, d.book_id, d.chapter, d.verse_start, d.verse_end,
             d.audience, d.estimated_minutes, d.season,
             (SELECT t.name FROM devotional_tag_map m JOIN devotional_tags t ON t.id = m.tag_id WHERE m.devotional_id = d.id LIMIT 1) AS situation
      FROM devotionals d
      ${whereClause}
      ORDER BY d.title
      LIMIT ?
    `).all(...params, limit) as Array<{
      id: string; title: string; book_id: string; chapter: number;
      verse_start: number; verse_end: number; audience: string;
      estimated_minutes: number; season: string | null; situation: string | null
    }>

    return rows.map((d) => ({
      id: d.id,
      title: d.title,
      passageRef: `${BOOK_NAMES[d.book_id] ?? d.book_id} ${d.chapter}:${d.verse_start}-${d.verse_end}`,
      audienceLevel: d.audience as DevotionalSummary['audienceLevel'],
      estimatedMinutes: d.estimated_minutes,
      seasonalSet: (d.season ?? 'ordinary') as DevotionalSummary['seasonalSet'],
      situation: d.situation ?? '',
    }))
  } finally {
    db.close()
  }
}

export async function searchSeries(opts: {
  query?: string
  tagId?: string
  bookId?: string
  audience?: string
  limit?: number
}): Promise<SeriesSummary[]> {
  const db = getDb()
  try {
    // ── Stage 1: find matching series ids (title + filter pre-pass) ──
    const where: string[] = []
    const params: unknown[] = []

    if (opts.query && opts.query.trim().length >= 2) {
      const q = `%${opts.query.trim()}%`
      // Match series title/description OR any child's title/context_brief/modern_moment.
      where.push(`(
        s.title LIKE ? OR s.description LIKE ?
        OR EXISTS (
          SELECT 1 FROM devotionals cd WHERE cd.series_id = s.id
          AND (cd.title LIKE ? OR cd.context_brief LIKE ? OR cd.modern_moment LIKE ?)
        )
      )`)
      params.push(q, q, q, q, q)
    }
    if (opts.audience) {
      if (opts.audience === 'tween') {
        where.push(`(
          s.audience = 'tween'
          OR EXISTS (SELECT 1 FROM devotionals cd JOIN devotional_tag_map m ON m.devotional_id = cd.id
                     WHERE cd.series_id = s.id AND m.tag_id = 'tween')
        )`)
      } else {
        where.push(`s.audience = ?`)
        params.push(opts.audience)
      }
    }
    if (opts.bookId) {
      where.push(`EXISTS (SELECT 1 FROM devotionals cd WHERE cd.series_id = s.id AND cd.book_id = ?)`)
      params.push(opts.bookId)
    }
    if (opts.tagId) {
      where.push(`EXISTS (
        SELECT 1 FROM devotionals cd JOIN devotional_tag_map m ON m.devotional_id = cd.id
        WHERE cd.series_id = s.id AND m.tag_id = ?
      )`)
      params.push(opts.tagId)
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''
    const limit = opts.limit ?? 50

    const seriesRows = db.prepare(`
      SELECT s.id, s.title, s.description, s.audience, s.season
      FROM devotional_series s
      ${whereClause}
      ORDER BY s.created_at DESC
      LIMIT ?
    `).all(...params, limit) as Array<{
      id: string; title: string; description: string; audience: string; season: string | null
    }>

    if (seriesRows.length === 0) return []

    // ── Stage 2: per-series enrich (partCount, totalMinutes, tags, bridgePart) ──
    const result: SeriesSummary[] = []

    for (const s of seriesRows) {
      const countRow = db.prepare(`SELECT COUNT(*) n, COALESCE(SUM(estimated_minutes),0) mins FROM devotionals WHERE series_id = ?`).get(s.id) as { n: number; mins: number }

      const tagRows = db.prepare(`
        SELECT DISTINCT t.name
        FROM devotional_tag_map m
        JOIN devotionals d ON d.id = m.devotional_id
        JOIN devotional_tags t ON t.id = m.tag_id
        WHERE d.series_id = ?
        ORDER BY t.name
      `).all(s.id) as Array<{ name: string }>

      // ── Bridge logic: determine which (if any) child caused the match. ──
      let bridgePart: SeriesSummary['bridgePart'] = null

      // Does the series itself match the text query? If so, no bridge — series is the match.
      const seriesSelfMatches =
        !opts.query || opts.query.trim().length < 2 ||
        s.title.toLowerCase().includes(opts.query.trim().toLowerCase()) ||
        s.description.toLowerCase().includes(opts.query.trim().toLowerCase())

      const needsBridge = Boolean(opts.bookId || opts.tagId || (opts.query && opts.query.trim().length >= 2 && !seriesSelfMatches))

      if (needsBridge) {
        const bridgeWhere: string[] = ['cd.series_id = ?']
        const bridgeParams: unknown[] = [s.id]

        if (opts.bookId) {
          bridgeWhere.push('cd.book_id = ?')
          bridgeParams.push(opts.bookId)
        }
        if (opts.tagId) {
          bridgeWhere.push(`EXISTS (SELECT 1 FROM devotional_tag_map m WHERE m.devotional_id = cd.id AND m.tag_id = ?)`)
          bridgeParams.push(opts.tagId)
        }
        if (opts.query && opts.query.trim().length >= 2 && !seriesSelfMatches) {
          const q = `%${opts.query.trim()}%`
          bridgeWhere.push(`(cd.title LIKE ? OR cd.context_brief LIKE ? OR cd.modern_moment LIKE ?)`)
          bridgeParams.push(q, q, q)
        }

        const child = db.prepare(`
          SELECT cd.id, cd.series_order, cd.title, cd.book_id, cd.chapter, cd.verse_start, cd.verse_end
          FROM devotionals cd
          WHERE ${bridgeWhere.join(' AND ')}
          ORDER BY cd.series_order ASC NULLS LAST
          LIMIT 1
        `).get(...bridgeParams) as {
          id: string; series_order: number; title: string; book_id: string;
          chapter: number; verse_start: number; verse_end: number
        } | undefined

        if (child) {
          const bookName = BOOK_NAMES[child.book_id] ?? child.book_id
          bridgePart = {
            seriesOrder: child.series_order,
            title: child.title,
            passageRef: `${bookName} ${child.chapter}:${child.verse_start}-${child.verse_end}`,
            devotionalId: child.id,
          }
        }
      }

      result.push({
        id: s.id,
        title: s.title,
        description: s.description,
        audience: s.audience,
        season: s.season,
        partCount: countRow.n,
        totalEstimatedMinutes: countRow.mins,
        tags: tagRows.map((r) => r.name),
        bridgePart,
      })
    }

    return result
  } finally {
    db.close()
  }
}

export async function getDevotionalBooks(): Promise<Array<{ id: string; name: string }>> {
  const books = await prisma.book.findMany({
    where: { devotionals: { some: {} } },
    select: { id: true, name: true },
    orderBy: { bookOrder: 'asc' },
  })
  return books.map((b) => ({ id: b.id, name: b.name }))
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
    bookId: dev.bookId,
    chapter: dev.chapter,
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
