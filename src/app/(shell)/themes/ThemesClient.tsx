'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeBrowser } from '@/components/themes'
import type { CategoryGroup, ThreadPrompt } from '@/components/themes/types'

export default function ThemesClient({ categoryGroups }: { categoryGroups: CategoryGroup[] }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = searchQuery
    ? categoryGroups
        .map((g) => ({
          ...g,
          themes: g.themes.filter(
            (t) =>
              t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.modernFraming.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((g) => g.themes.length > 0)
    : categoryGroups

  // Pick a random theme for the thread prompt
  const threadPrompt: ThreadPrompt = useMemo(() => {
    const allThemes = categoryGroups.flatMap((g) => g.themes)
    const t = allThemes[Math.floor(Math.random() * allThemes.length)]
    return {
      themeId: t?.id ?? '',
      name: t?.name ?? '',
      hook: t?.modernFraming?.substring(0, 100) ?? '',
      category: categoryGroups.find((g) => g.themes.includes(t))?.id as 'virtue' ?? 'doctrine',
    }
  }, [categoryGroups])

  return (
    <ThemeBrowser
      threadPrompt={threadPrompt}
      categories={filtered}
      activeFilters={[]}
      searchQuery={searchQuery}
      onSearch={setSearchQuery}
      onOpenProfile={(id) => router.push(`/themes/${id}`)}
      onRefreshThread={() => {}}
    />
  )
}
