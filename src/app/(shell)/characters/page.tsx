'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CharacterBrowser, CharacterProfileView } from '@/components/characters'
import sampleData from './sample-data.json'
import type { CharacterProfile } from '@/components/characters/types'

export default function CharactersPage() {
  const router = useRouter()
  const [selectedProfile, setSelectedProfile] = useState<CharacterProfile | null>(null)

  const data = sampleData as unknown as {
    discoverCard: Parameters<typeof CharacterBrowser>[0]['discoverCard']
    characters: Parameters<typeof CharacterBrowser>[0]['characters']
    filters: Parameters<typeof CharacterBrowser>[0]['filters']
    activeFilters: string[]
    searchQuery: string
    selectedProfile: CharacterProfile
  }

  // Show profile view when a character is selected
  if (selectedProfile) {
    return (
      <CharacterProfileView
        profile={selectedProfile}
        onBack={() => setSelectedProfile(null)}
        onNavigatePassage={(ref) => {
          console.log('[Characters] Navigate to passage:', ref)
          router.push(`/reader`)
        }}
        onOpenCharacter={(id) => {
          console.log('[Characters] Open character:', id)
          // In Phase 1, switch to the sample profile if it matches
          if (id === data.selectedProfile.id) {
            setSelectedProfile(data.selectedProfile)
          }
        }}
        onOpenTheme={(id) => {
          console.log('[Characters] Open theme:', id)
          router.push(`/themes?id=${id}`)
        }}
      />
    )
  }

  return (
    <CharacterBrowser
      discoverCard={data.discoverCard}
      characters={data.characters}
      filters={data.filters}
      activeFilters={data.activeFilters}
      searchQuery={data.searchQuery}
      onOpenProfile={(id) => {
        console.log('[Characters] Open profile:', id)
        // In Phase 1, use the sample profile for the Samaritan woman
        if (id === data.selectedProfile.id) {
          setSelectedProfile(data.selectedProfile)
        } else {
          // For other characters, show the sample profile with a note
          setSelectedProfile(data.selectedProfile)
        }
      }}
      onSearch={(query) => {
        console.log('[Characters] Search:', query)
      }}
      onToggleFilter={(category, value) => {
        console.log('[Characters] Toggle filter:', category, value)
      }}
      onClearFilters={() => {
        console.log('[Characters] Clear filters')
      }}
      onRefreshDiscover={() => {
        console.log('[Characters] Refresh discover card')
      }}
    />
  )
}
