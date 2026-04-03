'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DailyBreadLanding, DailyBreadReading } from '@/components/daily-bread'
import sampleData from './sample-data.json'
import type { Devotional, AudienceLevel } from '@/components/daily-bread/types'

export default function DailyBreadPage() {
  const router = useRouter()
  const [selectedDevotional, setSelectedDevotional] = useState<Devotional | null>(null)
  const [audienceLevel, setAudienceLevel] = useState<AudienceLevel>(
    sampleData.currentAudienceLevel as AudienceLevel
  )

  const data = sampleData as unknown as {
    moodTiles: Parameters<typeof DailyBreadLanding>[0]['moodTiles']
    seasonalCard: Parameters<typeof DailyBreadLanding>[0]['seasonalCard']
    selectedDevotional: Devotional
    history: Parameters<typeof DailyBreadLanding>[0]['history']
    browseDevotionals: Parameters<typeof DailyBreadLanding>[0]['browseDevotionals']
    activeTab: Parameters<typeof DailyBreadLanding>[0]['activeTab']
    completionState: null
  }

  if (selectedDevotional) {
    return (
      <DailyBreadReading
        devotional={selectedDevotional}
        currentAudienceLevel={audienceLevel}
        onBack={() => setSelectedDevotional(null)}
        onOverrideAudience={(level) => {
          console.log('[DailyBread] Override audience:', level)
          setAudienceLevel(level)
        }}
        onNavigatePassage={(ref) => {
          console.log('[DailyBread] Going deeper:', ref)
          router.push('/reader')
        }}
        onComplete={(notes, rating) => {
          console.log('[DailyBread] Complete:', { notes, rating })
          setSelectedDevotional(null)
        }}
        onDismissCloseOut={() => {
          console.log('[DailyBread] Dismiss close-out')
          setSelectedDevotional(null)
        }}
      />
    )
  }

  return (
    <DailyBreadLanding
      moodTiles={data.moodTiles}
      seasonalCard={data.seasonalCard}
      currentAudienceLevel={audienceLevel}
      history={data.history}
      browseDevotionals={data.browseDevotionals}
      activeTab={data.activeTab}
      completionState={null}
      onSelectMood={(moodId) => {
        console.log('[DailyBread] Select mood:', moodId)
        setSelectedDevotional(data.selectedDevotional)
      }}
      onBeginSeasonal={(id) => {
        console.log('[DailyBread] Begin seasonal:', id)
        setSelectedDevotional(data.selectedDevotional)
      }}
      onChangeTab={(tab) => {
        console.log('[DailyBread] Change tab:', tab)
      }}
      onOpenDevotional={(id) => {
        console.log('[DailyBread] Open devotional:', id)
        setSelectedDevotional(data.selectedDevotional)
      }}
    />
  )
}
