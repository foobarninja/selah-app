import { notFound } from 'next/navigation'
import { BOOK_NAMES, BOOK_CHAPTERS } from '@/lib/constants'
import { getChapterText, getNarrativeContext, getPassageContext, getTranslations } from '@/lib/reader/queries'
import { getDisplaySettings, getStudyPreferences, getTranslationConfig } from '@/lib/settings/queries'
import { recordReading } from '@/lib/reader/history'
import { surfaceNotes } from '@/lib/resurfacing'
import ReaderClient from './ReaderClient'

interface Props {
  params: Promise<{ book: string; chapter: string }>
  searchParams: Promise<{ t?: string }>
}

export default async function ReaderPage({ params, searchParams }: Props) {
  const { book, chapter: chapterStr } = await params
  const { t: translationParam } = await searchParams
  const bookId = book.toUpperCase()
  const chapter = parseInt(chapterStr, 10)

  if (!BOOK_NAMES[bookId] || isNaN(chapter) || chapter < 1) {
    notFound()
  }

  const maxChapters = BOOK_CHAPTERS[bookId] ?? 1
  if (chapter > maxChapters) {
    notFound()
  }

  const [narrativeCtx, translations, displaySettings, translationConfig, studyPrefs] = await Promise.all([
    getNarrativeContext(bookId, chapter),
    getTranslations(),
    getDisplaySettings(),
    getTranslationConfig(),
    getStudyPreferences(),
  ])

  const parallelIds = translationConfig.parallelIds

  // Use requested translation or default to BSB
  const activeTranslation = translationParam && translations.some((t) => t.id === translationParam)
    ? translationParam
    : 'BSB'

  const { passage, prevUnit, nextUnit } = narrativeCtx
  const verseEnd = passage.verseEnd === 999 ? 200 : passage.verseEnd

  const vis = studyPrefs.sourceTierVisibility
  const visibleTiers = new Set<number>()
  if (vis.canon) visibleTiers.add(1)
  if (vis.scholarship) visibleTiers.add(2)
  if (vis.historical) visibleTiers.add(3)
  if (vis.aiAssisted) visibleTiers.add(4)
  if (vis.conjecture) visibleTiers.add(5)

  const [verses, context, resurfacedEntries] = await Promise.all([
    getChapterText(activeTranslation, bookId, chapter, parallelIds),
    getPassageContext(bookId, chapter, passage.verseStart, verseEnd, visibleTiers),
    surfaceNotes(bookId, chapter, passage.verseStart, verseEnd),
  ])

  if (verses.length > 0) {
    passage.verseEnd = verses[verses.length - 1].number
  }

  recordReading(bookId, chapter).catch(() => {})

  return (
    <ReaderClient
      passage={passage}
      verses={verses}
      activeTranslation={activeTranslation}
      availableTranslations={translations}
      sceneCast={context.sceneCast}
      themes={context.themes}
      climateContexts={context.climateContexts}
      crossReferences={context.crossReferences}
      commentaries={context.commentaries}
      resurfacedEntries={resurfacedEntries}
      lensTags={context.lensTags}
      prevUnit={prevUnit}
      nextUnit={nextUnit}
      bookId={bookId}
      maxChapters={maxChapters}
      showStrongs={displaySettings.showStrongs}
      showCrossReferences={displaySettings.showCrossReferences}
      showFootnotes={displaySettings.showFootnotes}
      showExtendedCommentary={studyPrefs.commentaryDisplay === 'curated-extended'}
    />
  )
}
