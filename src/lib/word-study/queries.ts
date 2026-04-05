import { prisma } from '@/lib/db'
import { BOOK_NAMES, BOOK_ORDER } from '@/lib/constants'
import type {
  StrongsEntry,
  TranslationCluster,
  ConcordanceEntry,
  FrequencySegment,
  RelatedWord,
  NarrativeConnection,
  Language,
} from '@/components/word-study/types'

export async function getStrongsEntry(number: string): Promise<StrongsEntry | null> {
  const entry = await prisma.strongsEntry.findUnique({ where: { number } })
  if (!entry) return null

  const totalOccurrences = await prisma.strongsVerseMap.count({
    where: { strongsNumber: number },
  })

  return {
    strongsNumber: entry.number,
    language: entry.language as Language,
    originalScript: entry.word,
    transliteration: entry.transliteration ?? '',
    pronunciation: entry.pronunciation ?? '',
    shortGloss: entry.shortDefinition ?? '',
    fullDefinition: entry.definition,
    morphology: entry.derivation ?? '',
    totalOccurrences,
  }
}

export async function getTranslationClusters(strongsNumber: string): Promise<TranslationCluster[]> {
  // Group by translated_word to see how different translations render this word
  const maps = await prisma.strongsVerseMap.findMany({
    where: { strongsNumber },
    select: { translatedWord: true },
  })

  const counts = new Map<string, number>()
  for (const m of maps) {
    const word = m.translatedWord?.toLowerCase().replace(/[^\w\s]/g, '').trim() ?? ''
    if (!word) continue
    counts.set(word, (counts.get(word) ?? 0) + 1)
  }

  const clusters = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([rendering, count]) => ({
      rendering,
      count,
      translations: ['BSB'],
    }))

  return clusters
}

export async function getCuratedOccurrences(
  strongsNumber: string,
  limit = 20,
): Promise<ConcordanceEntry[]> {
  const maps = await prisma.strongsVerseMap.findMany({
    where: { strongsNumber },
    orderBy: [{ bookId: 'asc' }, { chapter: 'asc' }, { verse: 'asc' }],
    take: limit,
    select: {
      id: true, bookId: true, chapter: true, verse: true, translatedWord: true,
    },
  })

  if (maps.length === 0) return []

  // Batch fetch BSB verse text
  const verseKeys = maps.map((m) => ({
    bookId: m.bookId,
    chapter: m.chapter,
    verse: m.verse,
  }))

  const verses = await prisma.verse.findMany({
    where: {
      translationId: 'BSB',
      OR: verseKeys,
    },
    select: { bookId: true, chapter: true, verse: true, text: true },
  })

  const textMap = new Map<string, string>()
  for (const v of verses) {
    textMap.set(`${v.bookId}-${v.chapter}-${v.verse}`, v.text)
  }

  return maps.map((m) => {
    const bookName = BOOK_NAMES[m.bookId] ?? m.bookId
    const text = textMap.get(`${m.bookId}-${m.chapter}-${m.verse}`) ?? ''
    const word = m.translatedWord ?? ''

    // Highlight the word in text with **bold** markers
    let verseText = text
    if (word) {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      verseText = text.replace(new RegExp(`(${escaped})`, 'i'), '**$1**')
    }

    return {
      id: String(m.id),
      verseRef: `${bookName} ${m.chapter}:${m.verse}`,
      verseText,
      rendering: word,
    }
  })
}

export async function getFrequencySegments(strongsNumber: string): Promise<FrequencySegment[]> {
  const rows = await prisma.strongsVerseMap.groupBy({
    by: ['bookId'],
    where: { strongsNumber },
    _count: true,
  })

  const countMap = new Map(rows.map((r) => [r.bookId, r._count]))

  return BOOK_ORDER.map((bookId) => ({
    book: bookId,
    count: countMap.get(bookId) ?? 0,
  }))
}

export async function getRelatedWords(strongsNumber: string): Promise<RelatedWord[]> {
  const entry = await prisma.strongsEntry.findUnique({
    where: { number: strongsNumber },
    select: { relatedNumbers: true },
  })

  if (!entry?.relatedNumbers) return []

  // Parse related numbers (comma or semicolon separated)
  const numbers = entry.relatedNumbers
    .split(/[,;]\s*/)
    .map((n) => n.trim())
    .filter((n) => /^[HG]\d+$/.test(n))
    .slice(0, 10)

  if (numbers.length === 0) return []

  const related = await prisma.strongsEntry.findMany({
    where: { number: { in: numbers } },
    select: { number: true, word: true, transliteration: true, shortDefinition: true },
  })

  return related.map((r) => ({
    strongsNumber: r.number,
    originalScript: r.word,
    transliteration: r.transliteration ?? '',
    shortGloss: r.shortDefinition ?? '',
  }))
}

export async function getNarrativeConnections(strongsNumber: string): Promise<NarrativeConnection[]> {
  // Find narrative units that contain verses with this Strong's number
  const verseMaps = await prisma.strongsVerseMap.findMany({
    where: { strongsNumber },
    select: { bookId: true, chapter: true, verse: true },
    take: 50,
  })

  const unitMap = new Map<string, { title: string; themes: string[] }>()

  for (const vm of verseMaps) {
    const units = await prisma.narrativeUnit.findMany({
      where: {
        bookId: vm.bookId,
        chapterStart: { lte: vm.chapter },
        OR: [{ chapterEnd: { gte: vm.chapter } }, { chapterEnd: null }],
      },
      select: { id: true, title: true, conceptualNote: true },
      take: 1,
    })

    for (const u of units) {
      if (!unitMap.has(u.id)) {
        unitMap.set(u.id, {
          title: u.title,
          themes: u.conceptualNote ? [u.conceptualNote.substring(0, 50)] : [],
        })
      }
    }

    if (unitMap.size >= 5) break
  }

  return Array.from(unitMap.entries()).map(([id, val]) => ({
    narrativeUnitRef: id,
    title: val.title,
    themes: val.themes,
  }))
}

export async function searchStrongs(query: string, limit = 20): Promise<Array<{
  number: string
  language: string
  word: string
  transliteration: string | null
  shortDefinition: string | null
}>> {
  return prisma.strongsEntry.findMany({
    where: {
      OR: [
        { shortDefinition: { contains: query } },
        { word: { contains: query } },
        { transliteration: { contains: query } },
        { number: query.toUpperCase() },
      ],
    },
    select: {
      number: true, language: true, word: true,
      transliteration: true, shortDefinition: true,
    },
    take: limit,
    orderBy: { number: 'asc' },
  })
}
