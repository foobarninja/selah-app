'use client'

import { useRouter } from 'next/navigation'
import { CharacterProfileView } from '@/components/characters'
import type { CharacterProfile } from '@/components/characters/types'

export default function CharacterProfileClient({ profile }: { profile: CharacterProfile }) {
  const router = useRouter()

  return (
    <CharacterProfileView
      profile={profile}
      onBack={() => router.back()}
      onNavigatePassage={(ref) => {
        // Parse "Genesis 1:1-5" → /reader/GEN/1
        const match = ref.match(/^(\w[\w\s]+?)\s+(\d+)/)
        if (match) {
          const bookName = match[1]
          const chapter = match[2]
          // Reverse lookup book ID from name
          router.push(`/reader?passage=${encodeURIComponent(ref)}`)
        }
      }}
      onOpenCharacter={(id) => router.push(`/characters/${id}`)}
      onOpenTheme={(id) => router.push(`/themes/${id}`)}
    />
  )
}
