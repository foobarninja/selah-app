'use client'

import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { CharacterBrowser } from '@/components/characters'
import type { CharacterSummary, Filters, DiscoverCard } from '@/components/characters/types'

interface Props {
  characters: CharacterSummary[]
  filters: Filters
}

export default function CharactersClient({ characters, filters }: Props) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [discoverIdx, setDiscoverIdx] = useState(0)

  const filtered = characters.filter((c) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      if (!c.name.toLowerCase().includes(q) && !c.bioBrief.toLowerCase().includes(q)) {
        return false
      }
    }
    if (activeFilters.length > 0) {
      return activeFilters.some((f) => {
        const [cat, val] = f.split(':')
        if (cat === 'era') return c.era === val
        if (cat === 'testament') return c.testament === val
        if (cat === 'roleType') return c.roleType === val
        if (cat === 'socialStatus') return c.socialStatus === val
        return false
      })
    }
    return true
  })

  const discoverCard: DiscoverCard = useMemo(() => {
    const c = characters[discoverIdx % characters.length]
    return {
      characterId: c?.id ?? '',
      name: c?.name ?? '',
      hook: c?.bioBrief?.substring(0, 80) ?? '',
      era: c?.era ?? 'patriarchal',
      bioBrief: c?.bioBrief ?? '',
    }
  }, [characters, discoverIdx])

  const onToggleFilter = useCallback((category: string, value: string) => {
    const key = `${category}:${value}`
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    )
  }, [])

  return (
    <CharacterBrowser
      discoverCard={discoverCard}
      characters={filtered}
      filters={filters}
      activeFilters={activeFilters}
      searchQuery={searchQuery}
      onOpenProfile={(id) => router.push(`/characters/${id}`)}
      onSearch={setSearchQuery}
      onToggleFilter={onToggleFilter}
      onClearFilters={() => setActiveFilters([])}
      onRefreshDiscover={() => setDiscoverIdx((i) => i + 1)}
    />
  )
}
