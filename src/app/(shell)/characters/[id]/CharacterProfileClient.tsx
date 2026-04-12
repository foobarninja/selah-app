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
      onNavigatePassage={(bookId, chapter) => {
        router.push(`/reader/${bookId}/${chapter}`)
      }}
      onOpenCharacter={(id) => router.push(`/characters/${id}`)}
      onOpenTheme={(id) => router.push(`/themes/${id}`)}
    />
  )
}
