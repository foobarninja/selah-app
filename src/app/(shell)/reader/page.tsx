'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ReaderView } from '@/components/reader'
import sampleData from './sample-data.json'
import type { ReaderProps } from '@/components/reader/types'

export default function ReaderPage() {
  const router = useRouter()
  const [activeVerse, setActiveVerse] = useState<number | undefined>(
    sampleData.activeVerseNumber
  )

  const data = sampleData as unknown as {
    passage: ReaderProps['passage']
    verses: ReaderProps['verses']
    activeTranslation: string
    availableTranslations: ReaderProps['availableTranslations']
    parallelTranslations: string[]
    sceneCast: ReaderProps['sceneCast']
    themes: ReaderProps['themes']
    climateContexts: ReaderProps['climateContexts']
    crossReferences: ReaderProps['crossReferences']
    commentaries: ReaderProps['commentaries']
    resurfacedEntries: ReaderProps['resurfacedEntries']
    lensTags: ReaderProps['lensTags']
  }

  return (
    <div className="h-full">
      <ReaderView
        passage={data.passage}
        verses={data.verses}
        activeVerseNumber={activeVerse}
        activeTranslation={data.activeTranslation}
        availableTranslations={data.availableTranslations}
        parallelTranslations={data.parallelTranslations}
        sceneCast={data.sceneCast}
        themes={data.themes}
        climateContexts={data.climateContexts}
        crossReferences={data.crossReferences}
        commentaries={data.commentaries}
        resurfacedEntries={data.resurfacedEntries}
        lensTags={data.lensTags}
        onSelectVerse={(verseNumber) => setActiveVerse(verseNumber)}
        onNavigatePassage={(ref) => {
          console.log('[Reader] Navigate to passage:', ref)
        }}
        onPreviousUnit={() => {
          console.log('[Reader] Previous unit')
        }}
        onNextUnit={() => {
          console.log('[Reader] Next unit')
        }}
        onChangeTranslation={(id) => {
          console.log('[Reader] Change translation:', id)
        }}
        onOpenCharacterProfile={(id) => {
          console.log('[Reader] Open character profile:', id)
          router.push(`/characters?id=${id}`)
        }}
        onOpenThemeDetail={(id) => {
          console.log('[Reader] Open theme detail:', id)
          router.push(`/themes?id=${id}`)
        }}
        onOpenWordStudy={(code) => {
          console.log('[Reader] Open word study:', code)
          router.push(`/word-study?code=${code}`)
        }}
        onFollowCrossReference={(id) => {
          console.log('[Reader] Follow cross-reference:', id)
        }}
        onOpenJournalEntry={(id) => {
          console.log('[Reader] Open journal entry:', id)
          router.push(`/journal?entry=${id}`)
        }}
      />
    </div>
  )
}
