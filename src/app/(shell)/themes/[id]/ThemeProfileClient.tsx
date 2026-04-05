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
      onOpenCharacter={(id) => router.push(`/characters/${id}`)}
      onOpenRelatedTheme={(id) => router.push(`/themes/${id}`)}
    />
  )
}
