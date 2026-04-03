'use client'

import { useRouter } from 'next/navigation'
import { WordStudyProfile } from '@/components/word-study'
import sampleData from './sample-data.json'
import type { WordStudyProps } from '@/components/word-study/types'

export default function WordStudyPage() {
  const router = useRouter()

  const data = sampleData as unknown as {
    arrivedFrom: WordStudyProps['arrivedFrom']
    entry: WordStudyProps['entry']
    translationClusters: WordStudyProps['translationClusters']
    curatedOccurrences: WordStudyProps['curatedOccurrences']
    frequencySegments: WordStudyProps['frequencySegments']
    relatedWords: WordStudyProps['relatedWords']
    narrativeConnections: WordStudyProps['narrativeConnections']
    searchQuery: string
  }

  return (
    <div className="h-full">
      <WordStudyProfile
        arrivedFrom={data.arrivedFrom}
        entry={data.entry}
        translationClusters={data.translationClusters}
        curatedOccurrences={data.curatedOccurrences}
        frequencySegments={data.frequencySegments}
        relatedWords={data.relatedWords}
        narrativeConnections={data.narrativeConnections}
        searchQuery={data.searchQuery}
        onBack={() => {
          console.log('[WordStudy] Back to reader')
          router.push('/reader')
        }}
        onSearch={(query) => {
          console.log('[WordStudy] Search:', query)
        }}
        onNavigatePassage={(ref) => {
          console.log('[WordStudy] Navigate to passage:', ref)
          router.push('/reader')
        }}
        onOpenEntry={(code) => {
          console.log('[WordStudy] Open entry:', code)
        }}
        onOpenNarrativeUnit={(ref) => {
          console.log('[WordStudy] Open narrative unit:', ref)
          router.push('/reader')
        }}
      />
    </div>
  )
}
