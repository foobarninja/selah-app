'use client'

import { useRouter } from 'next/navigation'
import { HomeView } from '@/components/home'
import sampleData from './sample-data.json'
import type { HomeProps, EntityType } from '@/components/home/types'

export default function HomePage() {
  const router = useRouter()

  const data = sampleData as unknown as {
    searchResults: HomeProps['searchResults']
    dailyBread: HomeProps['dailyBread']
    history: HomeProps['history']
    recentNotes: HomeProps['recentNotes']
    welcomeMessage: string
    isFirstLaunch: boolean
    searchQuery: string
  }

  const routeMap: Record<string, string> = {
    passage: '/reader',
    character: '/characters',
    theme: '/themes',
    strongs: '/word-study',
    sermon: '/study-builder',
  }

  return (
    <HomeView
      searchResults={data.searchResults}
      searchQuery={data.searchQuery}
      dailyBread={data.dailyBread}
      history={data.history}
      recentNotes={data.recentNotes}
      welcomeMessage={data.welcomeMessage}
      isFirstLaunch={data.isFirstLaunch}
      onSearch={(query) => {
        console.log('[Home] Search:', query)
      }}
      onNavigatePassage={(ref) => {
        console.log('[Home] Navigate passage:', ref)
        router.push('/reader')
      }}
      onOpenCharacter={(id) => {
        console.log('[Home] Open character:', id)
        router.push(`/characters?id=${id}`)
      }}
      onOpenTheme={(id) => {
        console.log('[Home] Open theme:', id)
        router.push(`/themes?id=${id}`)
      }}
      onOpenStrongs={(code) => {
        console.log('[Home] Open Strong\'s:', code)
        router.push(`/word-study?code=${code}`)
      }}
      onBeginDailyBread={() => {
        console.log('[Home] Begin Daily Bread')
        router.push('/daily-bread')
      }}
      onRevisitDailyBread={() => {
        console.log('[Home] Revisit Daily Bread')
        router.push('/daily-bread')
      }}
      onDismissDailyBread={() => {
        console.log('[Home] Dismiss Daily Bread')
      }}
      onOpenHistoryItem={(id, type) => {
        console.log('[Home] Open history item:', id, type)
        router.push(routeMap[type] || '/')
      }}
      onOpenNote={(noteId) => {
        console.log('[Home] Open note:', noteId)
        router.push(`/journal?entry=${noteId}`)
      }}
    />
  )
}
