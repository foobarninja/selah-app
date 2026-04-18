'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { DailyBreadLanding, DailyBreadReading } from '@/components/daily-bread'
import type {
  Devotional,
  DevotionalSummary,
  DevotionalHistory,
  DevotionalBook,
  MoodTile,
  AudienceLevel,
  DailyBreadTab,
  SeasonalCard,
  SeriesSummary,
} from '@/components/daily-bread/types'

interface Props {
  moodTiles: MoodTile[]
  browseDevotionals: DevotionalSummary[]
  browseSeries: SeriesSummary[]
  history: DevotionalHistory[]
  tonightDevotional: Devotional | null
  devotionalBooks: DevotionalBook[]
}

export default function DailyBreadClient({
  moodTiles,
  browseDevotionals,
  browseSeries,
  history,
  tonightDevotional,
  devotionalBooks,
}: Props) {
  const router = useRouter()
  const [selectedDevotional, setSelectedDevotional] = useState<Devotional | null>(null)
  const [audienceLevel, setAudienceLevel] = useState<AudienceLevel>('family')
  const [activeTab, setActiveTab] = useState<DailyBreadTab>('tonight')

  const selectByMood = useCallback(async (moodId: string) => {
    try {
      const resp = await fetch(`/api/devotionals/tonight?mood=${encodeURIComponent(moodId)}`)
      const data = await resp.json()
      if (data && data.id) setSelectedDevotional(data)
    } catch (e) {
      console.error('[DailyBread] Failed to fetch by mood:', e)
    }
  }, [])

  const selectById = useCallback(async (id: string) => {
    try {
      const resp = await fetch(`/api/devotionals/${encodeURIComponent(id)}`)
      const data = await resp.json()
      if (data && data.id) setSelectedDevotional(data)
    } catch (e) {
      console.error('[DailyBread] Failed to fetch devotional:', e)
    }
  }, [])

  const onComplete = useCallback(async (notes: string, rating: number | null) => {
    if (!selectedDevotional) return
    try {
      await fetch(`/api/devotionals/${encodeURIComponent(selectedDevotional.id)}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: rating ?? 0, familyNotes: notes }),
      })
      // The DailyBreadReading component handles its own "completed" UI.
      // When the user eventually clicks back, refresh the page to get updated history.
    } catch (e) {
      console.error('[DailyBread] Failed to complete:', e)
    }
  }, [selectedDevotional])

  // When returning from reading view after completion, refresh to get updated history
  const handleBackFromReading = useCallback(() => {
    setSelectedDevotional(null)
    setActiveTab('history')
    router.refresh()
  }, [router])

  const seasonalCard: SeasonalCard = {
    isActive: false,
    season: 'ordinary',
    week: 0,
    message: '',
    devotionalId: '',
  }

  if (selectedDevotional) {
    return (
      <DailyBreadReading
        devotional={selectedDevotional}
        currentAudienceLevel={audienceLevel}
        onBack={handleBackFromReading}
        onComplete={onComplete}
        onOverrideAudience={setAudienceLevel}
        onNavigatePassage={(bookId, chapter) => router.push(`/reader/${bookId}/${chapter}`)}
      />
    )
  }

  return (
    <DailyBreadLanding
      moodTiles={moodTiles}
      seasonalCard={seasonalCard}
      currentAudienceLevel={audienceLevel}
      history={history}
      browseDevotionals={browseDevotionals}
      activeTab={activeTab}
      completionState={null}
      onSelectMood={selectByMood}
      onBeginSeasonal={() => {
        if (tonightDevotional) setSelectedDevotional(tonightDevotional)
      }}
      onChangeTab={setActiveTab}
      onOverrideAudience={setAudienceLevel}
      onOpenDevotional={selectById}
      devotionalBooks={devotionalBooks}
      browseSeries={browseSeries}
      onOpenSeries={(id) => router.push(`/daily-bread/series/${id}`)}
    />
  )
}
