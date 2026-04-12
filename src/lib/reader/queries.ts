import { prisma } from '@/lib/db'
import {
  BOOK_NAMES,
  CURATED_COMMENTARY_SOURCES,
  STRONGS_SKIP_LIST,
  toSourceTier,
} from '@/lib/constants'
import type {
  Verse,
  Passage,
  StrongsAnnotation,
  Footnote,
  Translation,
  CharacterAppearance as UICharacterAppearance,
  ThemeAnnotation,
  ClimateContext as UIClimateContext,
  CrossReference as UICrossReference,
  Commentary as UICommentary,
  LensTag,
  CharacterRole,
} from '@/components/reader/types'

const MAX_STRONGS_PER_VERSE = 4
const MAX_CROSS_REFS = 15
const CROSS_REF_SNIPPET_LENGTH = 100

const ROLE_ORDER: CharacterRole[] = [
  'protagonist',
  'deuteragonist',
  'witness',
  'bystander',
  'referenced figure',
]

// ── Chapter text ──────────────────────────────────────────────────────────────

export async function getChapterText(
  translationId: string,
  bookId: string,
  chapter: number,
  parallelIds: string[] = [],
): Promise<Verse[]> {
  const [verses, strongsMaps, footnotes, parallelVerses, parallelTranslations] = await Promise.all([
    prisma.verse.findMany({
      where: { translationId, bookId, chapter },
      orderBy: { verse: 'asc' },
    }),
    prisma.strongsVerseMap.findMany({
      where: { bookId, chapter },
      include: { entry: true },
      orderBy: { wordPosition: 'asc' },
    }),
    prisma.footnote.findMany({
      where: { translationId, bookId, chapter },
    }),
    parallelIds.length > 0
      ? prisma.verse.findMany({
          where: { translationId: { in: parallelIds }, bookId, chapter },
          select: { translationId: true, verse: true, text: true },
          orderBy: { verse: 'asc' },
        })
      : Promise.resolve([]),
    parallelIds.length > 0
      ? prisma.translation.findMany({
          where: { id: { in: parallelIds } },
          select: { id: true, shortName: true },
        })
      : Promise.resolve([]),
  ])

  // Group Strong's by verse number
  const strongsByVerse = new Map<number, typeof strongsMaps>()
  for (const sm of strongsMaps) {
    const arr = strongsByVerse.get(sm.verse) ?? []
    arr.push(sm)
    strongsByVerse.set(sm.verse, arr)
  }

  // Group footnotes by verse number
  const footnotesByVerse = new Map<number, typeof footnotes>()
  for (const fn of footnotes) {
    const arr = footnotesByVerse.get(fn.verse) ?? []
    arr.push(fn)
    footnotesByVerse.set(fn.verse, arr)
  }

  // Build shortName lookup for parallel translations
  const shortNameById = new Map<string, string>()
  for (const t of parallelTranslations) {
    shortNameById.set(t.id, t.shortName)
  }

  // Group parallel verses by verse number, preserving parallelIds order
  const parallelByVerse = new Map<number, Array<{ translation: string; text: string }>>()
  for (const id of parallelIds) {
    const label = shortNameById.get(id) ?? id
    for (const pv of parallelVerses) {
      if (pv.translationId !== id) continue
      const arr = parallelByVerse.get(pv.verse) ?? []
      arr.push({ translation: label, text: pv.text })
      parallelByVerse.set(pv.verse, arr)
    }
  }

  return verses.map((v) => {
    const rawStrongs = strongsByVerse.get(v.verse) ?? []
    const strongs = filterStrongs(rawStrongs, v.text)

    const rawFootnotes = footnotesByVerse.get(v.verse) ?? []
    const fnotes: Footnote[] = rawFootnotes.map((fn, i) => ({
      id: String(fn.id),
      marker: fn.caller ?? String.fromCharCode(97 + i), // a, b, c...
      text: fn.noteText,
    }))

    return {
      number: v.verse,
      text: v.text,
      wordsOfJesus: Boolean(v.wordsOfJesus),
      strongs,
      footnotes: fnotes,
      parallelTexts: parallelByVerse.get(v.verse) ?? [],
    }
  })
}

function filterStrongs(
  maps: Array<{
    strongsNumber: string
    translatedWord: string | null
    entry: { word: string; transliteration: string | null; shortDefinition: string | null; definition: string }
  }>,
  verseText: string,
): StrongsAnnotation[] {
  const result: StrongsAnnotation[] = []
  const textLower = verseText.toLowerCase()

  for (const sm of maps) {
    if (result.length >= MAX_STRONGS_PER_VERSE) break
    if (STRONGS_SKIP_LIST.has(sm.strongsNumber)) continue

    const word = cleanWord(sm.translatedWord ?? '')
    if (!word || !textLower.includes(word.toLowerCase())) continue

    result.push({
      word,
      code: sm.strongsNumber,
      transliteration: sm.entry.transliteration ?? sm.entry.word,
      brief: sm.entry.shortDefinition ?? truncate(sm.entry.definition, 60),
    })
  }

  return result
}

function cleanWord(w: string): string {
  return w.replace(/^[^\w]+|[^\w]+$/g, '').trim()
}

function truncate(text: string, len: number): string {
  if (text.length <= len) return text
  return text.slice(0, len).replace(/\s+\S*$/, '') + '...'
}

// ── Narrative context ─────────────────────────────────────────────────────────

interface NarrativeContext {
  passage: Passage
  prevUnit: { bookId: string; chapter: number } | null
  nextUnit: { bookId: string; chapter: number } | null
}

export async function getNarrativeContext(
  bookId: string,
  chapter: number,
): Promise<NarrativeContext> {
  const bookName = BOOK_NAMES[bookId] ?? bookId
  const maxChapters = (await prisma.book.findUnique({
    where: { id: bookId },
    select: { numChapters: true },
  }))?.numChapters ?? 1

  // Find narrative unit(s) that overlap this chapter
  const units = await prisma.narrativeUnit.findMany({
    where: {
      bookId,
      chapterStart: { lte: chapter },
      OR: [{ chapterEnd: { gte: chapter } }, { chapterEnd: null }],
    },
    orderBy: [{ chapterStart: 'desc' }, { verseStart: 'desc' }],
  })

  // Prefer the unit that starts closest to (or on) the current chapter
  const unit = units[0]

  // Chapter-based navigation (simple, no loops)
  const prevChapter = chapter > 1 ? { bookId, chapter: chapter - 1 } : null
  const nextChapter = chapter < maxChapters ? { bookId, chapter: chapter + 1 } : null

  if (!unit) {
    return {
      passage: {
        id: `${bookId}-${chapter}`,
        book: bookName,
        chapter,
        verseStart: 1,
        verseEnd: 999,
        title: `${bookName} ${chapter}`,
        narrativeUnitId: '',
      },
      prevUnit: prevChapter,
      nextUnit: nextChapter,
    }
  }

  return {
    passage: {
      id: unit.id,
      book: bookName,
      chapter,
      verseStart: 1,
      verseEnd: 999, // always show full chapter, clamped later by actual verse count
      title: unit.title,
      narrativeUnitId: unit.id,
    },
    prevUnit: prevChapter,
    nextUnit: nextChapter,
  }
}

// ── Scene cast ────────────────────────────────────────────────────────────────

export async function getSceneCast(
  bookId: string,
  chapter: number,
  verseStart: number,
  verseEnd: number,
): Promise<UICharacterAppearance[]> {
  const appearances = await prisma.characterAppearance.findMany({
    where: {
      bookId,
      chapter,
      verseStart: { lte: verseEnd },
      OR: [{ verseEnd: { gte: verseStart } }, { verseEnd: null }],
    },
    include: { character: { select: { name: true } } },
    orderBy: { verseStart: 'asc' },
  })

  const result: UICharacterAppearance[] = appearances.map((a) => ({
    characterId: a.characterId,
    name: a.character.name,
    role: a.role as CharacterRole,
    emotion: a.emotionalState ?? '',
    motivation: a.motivation ?? '',
    stakes: a.stakes ?? '',
    modernParallel: a.modernParallel ?? '',
    sourceTier: toSourceTier(a.sourceTier),
  }))

  // Sort by role priority
  result.sort((a, b) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role))
  return result
}

// ── Themes ────────────────────────────────────────────────────────────────────

export async function getThemes(
  bookId: string,
  chapter: number,
  verseStart: number,
  verseEnd: number,
): Promise<ThemeAnnotation[]> {
  const passageThemes = await prisma.passageTheme.findMany({
    where: {
      bookId,
      chapter,
      verseStart: { lte: verseEnd },
      OR: [{ verseEnd: { gte: verseStart } }, { verseEnd: null }],
    },
    include: { theme: { select: { name: true } } },
  })

  return passageThemes.map((pt) => ({
    themeId: pt.themeId,
    name: pt.theme.name,
    annotation: pt.contextNote ?? '',
    sourceTier: toSourceTier(pt.sourceTier),
  }))
}

// ── Climate contexts ──────────────────────────────────────────────────────────

export async function getClimateContexts(
  bookId: string,
  chapter: number,
  verseStart: number,
  verseEnd: number,
): Promise<UIClimateContext[]> {
  const passageClimates = await prisma.passageClimate.findMany({
    where: {
      bookId,
      chapter,
      verseStart: { lte: verseEnd },
      OR: [{ verseEnd: { gte: verseStart } }, { verseEnd: null }],
    },
    include: { context: true },
  })

  return passageClimates.map((pc) => {
    // Use passage-specific note, supplemented by parent context if truncated
    let content = pc.contextNote ?? ''
    if (content.length < 500 || !content) {
      content = content || pc.context.geographic || ''
    } else {
      // context_note was likely truncated at 500 chars — append geographic detail
      const geo = pc.context.geographic ?? ''
      if (geo && !content.includes(geo.substring(0, 50))) {
        content = content + '\n\n' + geo
      }
    }
    return {
      id: pc.contextId,
      title: `${pc.context.name}, ${pc.context.era}`,
      content,
      sourceTier: toSourceTier(pc.context.sourceTier),
    }
  })
}

// ── Cross-references ──────────────────────────────────────────────────────────

export async function getCrossRefs(
  bookId: string,
  chapter: number,
  verseStart: number,
  verseEnd: number,
): Promise<UICrossReference[]> {
  const refs = await prisma.crossReference.findMany({
    where: {
      sourceBook: bookId,
      sourceChapter: chapter,
      sourceVerse: { gte: verseStart, lte: verseEnd },
    },
    orderBy: { score: 'desc' },
    take: MAX_CROSS_REFS,
  })

  if (refs.length === 0) return []

  // Batch-fetch BSB text for all target verses
  const targets = refs.map((r) => ({
    bookId: r.targetBook,
    chapter: r.targetChapter,
    verse: r.targetVerse,
  }))

  const targetVerses = await prisma.verse.findMany({
    where: {
      translationId: 'BSB',
      OR: targets.map((t) => ({
        bookId: t.bookId,
        chapter: t.chapter,
        verse: t.verse,
      })),
    },
    select: { bookId: true, chapter: true, verse: true, text: true },
  })

  const verseTextMap = new Map<string, string>()
  for (const tv of targetVerses) {
    verseTextMap.set(`${tv.bookId}-${tv.chapter}-${tv.verse}`, tv.text)
  }

  return refs.map((r) => {
    const targetName = BOOK_NAMES[r.targetBook] ?? r.targetBook
    const endVerse = r.targetEndVerse ? `-${r.targetEndVerse}` : ''
    const snippet = verseTextMap.get(`${r.targetBook}-${r.targetChapter}-${r.targetVerse}`) ?? ''

    return {
      id: String(r.id),
      targetPassage: `${targetName} ${r.targetChapter}:${r.targetVerse}${endVerse}`,
      snippet: truncate(snippet, CROSS_REF_SNIPPET_LENGTH),
      relevanceScore: r.score ?? 0,
      sourceTier: 2, // cross-references are scholarship tier
    }
  })
}

// ── Commentaries ──────────────────────────────────────────────────────────────

export async function getCommentaries(
  bookId: string,
  chapter: number,
  verseStart: number,
  verseEnd: number,
): Promise<UICommentary[]> {
  const entries = await prisma.commentaryEntry.findMany({
    where: {
      bookId,
      chapter,
      OR: [
        { verse: { gte: verseStart, lte: verseEnd } },
        { verse: null }, // chapter-level commentary
      ],
    },
    include: { source: { select: { id: true, englishName: true } } },
  })

  return entries.map((e) => ({
    id: String(e.id),
    author: e.source.englishName,
    excerpt: e.text,
    verseRange: e.verse ? `${chapter}:${e.verse}` : `${chapter}`,
    displayTier: CURATED_COMMENTARY_SOURCES.has(e.source.id) ? 'curated' as const : 'extended' as const,
    sourceTier: 2, // all commentary is scholarship tier
  }))
}

// ── Translations ──────────────────────────────────────────────────────────────

export async function getTranslations(): Promise<Translation[]> {
  const translations = await prisma.translation.findMany({
    where: { language: 'eng' },
    orderBy: { sortOrder: 'asc' },
    select: { id: true, englishName: true, shortName: true },
  })

  return translations.map((t) => ({
    id: t.id,
    name: t.englishName,
    abbreviation: t.shortName,
  }))
}

// ── Unified passage context ───────────────────────────────────────────────────

export interface PassageContextResult {
  sceneCast: UICharacterAppearance[]
  themes: ThemeAnnotation[]
  climateContexts: UIClimateContext[]
  crossReferences: UICrossReference[]
  commentaries: UICommentary[]
  lensTags: LensTag[]
}

export async function getPassageContext(
  bookId: string,
  chapter: number,
  verseStart: number,
  verseEnd: number,
): Promise<PassageContextResult> {
  const [sceneCast, themes, climateContexts, crossReferences, commentaries] =
    await Promise.all([
      getSceneCast(bookId, chapter, verseStart, verseEnd),
      getThemes(bookId, chapter, verseStart, verseEnd),
      getClimateContexts(bookId, chapter, verseStart, verseEnd),
      getCrossRefs(bookId, chapter, verseStart, verseEnd),
      getCommentaries(bookId, chapter, verseStart, verseEnd),
    ])

  const lensTags = buildLensTags(sceneCast, themes, climateContexts)

  return { sceneCast, themes, climateContexts, crossReferences, commentaries, lensTags }
}

function buildLensTags(
  sceneCast: UICharacterAppearance[],
  themes: ThemeAnnotation[],
  climateContexts: UIClimateContext[],
): LensTag[] {
  const tags: LensTag[] = []

  // Deduplicate by character/theme/climate ID
  const seenCharacters = new Set<string>()
  for (const c of sceneCast) {
    if (!seenCharacters.has(c.characterId)) {
      seenCharacters.add(c.characterId)
      tags.push({ label: c.name, lens: 'relational', entityId: c.characterId })
    }
  }

  const seenThemes = new Set<string>()
  for (const t of themes) {
    if (!seenThemes.has(t.themeId)) {
      seenThemes.add(t.themeId)
      tags.push({ label: t.name, lens: 'conceptual', entityId: t.themeId })
    }
  }

  const seenClimates = new Set<string>()
  for (const c of climateContexts) {
    if (!seenClimates.has(c.id)) {
      seenClimates.add(c.id)
      tags.push({ label: c.title, lens: 'climate', entityId: c.id })
    }
  }

  return tags
}
