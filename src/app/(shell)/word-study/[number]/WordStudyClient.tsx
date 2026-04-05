'use client'

import { useRouter } from 'next/navigation'
import { WordStudyProfile } from '@/components/word-study'
import type { WordStudyProps } from '@/components/word-study/types'

type Props = Omit<WordStudyProps, 'onSearch' | 'onNavigatePassage' | 'onOpenEntry' | 'onOpenNarrativeUnit'>

export default function WordStudyClient(props: Props) {
  const router = useRouter()

  return (
    <WordStudyProfile
      {...props}
      onBack={() => router.back()}
      onSearch={(q) => {
        if (/^[HG]\d+$/i.test(q)) {
          router.push(`/word-study/${q.toUpperCase()}`)
        }
      }}
      onNavigatePassage={(ref) => {
        router.push(`/reader?passage=${encodeURIComponent(ref)}`)
      }}
      onOpenEntry={(number) => router.push(`/word-study/${number}`)}
      onOpenNarrativeUnit={(id) => {
        console.log('[WordStudy] Open narrative:', id)
      }}
    />
  )
}
