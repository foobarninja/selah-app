'use client'

import { useRouter } from 'next/navigation'
import { ThemeProfileView } from '@/components/themes'
import type { ThemeProfile } from '@/components/themes/types'

export default function ThemeProfileClient({ profile }: { profile: ThemeProfile }) {
  const router = useRouter()

  return (
    <ThemeProfileView
      profile={profile}
      onBack={() => router.back()}
      onNavigatePassage={(ref) => {
        router.push(`/reader?passage=${encodeURIComponent(ref)}`)
      }}
      onNavigateBook={(bookId, chapter) => {
        router.push(`/reader/${bookId}/${chapter}`)
      }}
      onOpenCharacter={(id) => router.push(`/characters/${id}`)}
      onOpenRelatedTheme={(id) => router.push(`/themes/${id}`)}
    />
  )
}
