'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeBrowser, ThemeProfileView } from '@/components/themes'
import sampleData from './sample-data.json'
import type { ThemeProfile } from '@/components/themes/types'

export default function ThemesPage() {
  const router = useRouter()
  const [selectedProfile, setSelectedProfile] = useState<ThemeProfile | null>(null)

  const data = sampleData as unknown as {
    threadPrompt: Parameters<typeof ThemeBrowser>[0]['threadPrompt']
    categories: Parameters<typeof ThemeBrowser>[0]['categories']
    activeFilters: string[]
    searchQuery: string
    selectedProfile: ThemeProfile
  }

  if (selectedProfile) {
    return (
      <ThemeProfileView
        profile={selectedProfile}
        onBack={() => setSelectedProfile(null)}
        onNavigatePassage={(ref) => {
          console.log('[Themes] Navigate to passage:', ref)
          router.push('/reader')
        }}
        onOpenCharacter={(id) => {
          console.log('[Themes] Open character:', id)
          router.push(`/characters?id=${id}`)
        }}
        onOpenRelatedTheme={(id) => {
          console.log('[Themes] Open related theme:', id)
          // In Phase 1, reuse the sample profile
          setSelectedProfile(data.selectedProfile)
        }}
      />
    )
  }

  return (
    <ThemeBrowser
      threadPrompt={data.threadPrompt}
      categories={data.categories}
      activeFilters={data.activeFilters}
      searchQuery={data.searchQuery}
      onOpenProfile={(id) => {
        console.log('[Themes] Open profile:', id)
        setSelectedProfile(data.selectedProfile)
      }}
      onSearch={(query) => {
        console.log('[Themes] Search:', query)
      }}
      onToggleFilter={(category, value) => {
        console.log('[Themes] Toggle filter:', category, value)
      }}
      onClearFilters={() => {
        console.log('[Themes] Clear filters')
      }}
      onRefreshThread={() => {
        console.log('[Themes] Refresh thread prompt')
      }}
    />
  )
}
