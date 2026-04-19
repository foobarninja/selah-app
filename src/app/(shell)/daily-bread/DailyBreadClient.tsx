'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
  isAIConfigured: boolean
}

export default function DailyBreadClient({
  moodTiles,
  browseDevotionals,
  browseSeries,
  history,
  tonightDevotional,
  devotionalBooks,
  isAIConfigured,
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

  // Back from reading returns to Browse — where users typically came from.
  // History is a tab they opt into explicitly.
  const handleBackFromReading = useCallback(() => {
    setSelectedDevotional(null)
    setActiveTab('browse')
    router.refresh()
  }, [router])

  const seasonalCard: SeasonalCard = {
    isActive: false,
    season: 'ordinary',
    week: 0,
    message: '',
    devotionalId: '',
  }

  const searchParams = useSearchParams()
  useEffect(() => {
    const id = searchParams.get('devotional')
    if (id) {
      selectById(id)
      // Clean the URL so reloads don't re-trigger the fetch indefinitely.
      router.replace('/daily-bread')
    }
  }, [searchParams, selectById, router])

  if (selectedDevotional) {
    return (
      <DailyBreadReading
        devotional={selectedDevotional}
        currentAudienceLevel={audienceLevel}
        isAIConfigured={isAIConfigured}
        onBack={handleBackFromReading}
        onComplete={onComplete}
        onOverrideAudience={setAudienceLevel}
        onNavigatePassage={(bookId, chapter) => router.push(`/reader/${bookId}/${chapter}`)}
        onOpenSeries={(id) => router.push(`/daily-bread/series/${id}`)}
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
