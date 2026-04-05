import { notFound } from 'next/navigation'
import {
  getStrongsEntry,
  getTranslationClusters,
  getCuratedOccurrences,
  getFrequencySegments,
  getRelatedWords,
  getNarrativeConnections,
} from '@/lib/word-study/queries'
import WordStudyClient from './WordStudyClient'

interface Props {
  params: Promise<{ number: string }>
}

export default async function WordStudyDetailPage({ params }: Props) {
  const { number } = await params
  const strongsNumber = number.toUpperCase()

  const entry = await getStrongsEntry(strongsNumber)
  if (!entry) notFound()

  const [clusters, occurrences, frequency, related, narratives] = await Promise.all([
    getTranslationClusters(strongsNumber),
    getCuratedOccurrences(strongsNumber, 20),
    getFrequencySegments(strongsNumber),
    getRelatedWords(strongsNumber),
    getNarrativeConnections(strongsNumber),
  ])

  return (
    <WordStudyClient
      entry={entry}
      translationClusters={clusters}
      curatedOccurrences={occurrences}
      frequencySegments={frequency}
      relatedWords={related}
      narrativeConnections={narratives}
      searchQuery=""
    />
  )
}
