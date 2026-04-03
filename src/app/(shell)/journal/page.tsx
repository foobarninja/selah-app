'use client'

import { useRouter } from 'next/navigation'
import { JournalView } from '@/components/journal'
import sampleData from './sample-data.json'
import type { JournalProps, AnchorType } from '@/components/journal/types'

export default function JournalPage() {
  const router = useRouter()

  const data = sampleData as unknown as {
    entries: JournalProps['entries']
    collections: JournalProps['collections']
    bookmarks: JournalProps['bookmarks']
    availableUserTags: string[]
    activeTab: JournalProps['activeTab']
    activeFilters: string[]
    searchQuery: string
  }

  const anchorRoutes: Record<string, string> = {
    verse: '/reader',
    character: '/characters',
    theme: '/themes',
    'narrative-unit': '/reader',
  }

  return (
    <JournalView
      entries={data.entries}
      collections={data.collections}
      bookmarks={data.bookmarks}
      availableUserTags={data.availableUserTags}
      activeTab={data.activeTab}
      activeFilters={data.activeFilters}
      searchQuery={data.searchQuery}
      onChangeTab={(tab) => console.log('[Journal] Tab:', tab)}
      onSearch={(q) => console.log('[Journal] Search:', q)}
      onToggleFilter={(f) => console.log('[Journal] Toggle filter:', f)}
      onClearFilters={() => console.log('[Journal] Clear filters')}
      onOpenEntry={(id) => console.log('[Journal] Open entry:', id)}
      onCreateNote={() => console.log('[Journal] Create note')}
      onNavigateAnchor={(type, id) => {
        console.log('[Journal] Navigate anchor:', type, id)
        router.push(anchorRoutes[type] || '/reader')
      }}
      onOpenCollection={(id) => console.log('[Journal] Open collection:', id)}
      onNavigateBookmark={(ref) => {
        console.log('[Journal] Navigate bookmark:', ref)
        router.push('/reader')
      }}
      onRemoveBookmark={(id) => console.log('[Journal] Remove bookmark:', id)}
    />
  )
}
