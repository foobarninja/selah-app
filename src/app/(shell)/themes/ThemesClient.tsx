'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeBrowser } from '@/components/themes'
import type { CategoryGroup, ThreadPrompt } from '@/components/themes/types'

function pickPrompt(categoryGroups: CategoryGroup[], index: number): ThreadPrompt {
  const allThemes = categoryGroups.flatMap((g) => g.themes)
  const t = allThemes[index]
  return {
    themeId: t?.id ?? '',
    name: t?.name ?? '',
    hook: t?.modernFraming?.substring(0, 100) ?? '',
    category: (categoryGroups.find((g) => g.themes.includes(t))?.id as 'virtue') ?? 'doctrine',
  }
}

export default function ThemesClient({ categoryGroups }: { categoryGroups: CategoryGroup[] }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  // SSR-safe: initialize with a deterministic prompt (first theme) so server and
  // client render the same HTML during hydration. The effect below randomizes
  // post-mount, which avoids the Math.random() hydration mismatch.
  const [threadPrompt, setThreadPrompt] = useState<ThreadPrompt>(() => pickPrompt(categoryGroups, 0))

  useEffect(() => {
    const total = categoryGroups.flatMap((g) => g.themes).length
    if (total > 0) setThreadPrompt(pickPrompt(categoryGroups, Math.floor(Math.random() * total)))
  }, [categoryGroups])

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

  return (
    <ThemeBrowser
      threadPrompt={threadPrompt}
      categories={filtered}
      activeFilters={[]}
      searchQuery={searchQuery}
      onSearch={setSearchQuery}
      onOpenProfile={(id) => router.push(`/themes/${id}`)}
      onRefreshThread={() => {
        const total = categoryGroups.flatMap((g) => g.themes).length
        if (total > 0) setThreadPrompt(pickPrompt(categoryGroups, Math.floor(Math.random() * total)))
      }}
    />
  )
}
