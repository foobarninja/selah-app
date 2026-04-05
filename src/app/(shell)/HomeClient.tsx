'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { HomeView } from '@/components/home'
import type { HomeProps, SearchResults } from '@/components/home/types'

interface Props {
  dailyBread: HomeProps['dailyBread']
  history: HomeProps['history']
  recentNotes: HomeProps['recentNotes']
}

const emptyResults: SearchResults = {
  passages: [],
  characters: [],
  themes: [],
  strongs: [],
}

export default function HomeClient({ dailyBread, history, recentNotes }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState<SearchResults>(emptyResults)

  // Restore search results from URL param on mount
  useEffect(() => {
    if (initialQuery) {
      onSearch(initialQuery)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSearch = useCallback(async (query: string) => {
    setSearchQuery(query)
    // Persist search query in URL so back navigation restores it
    const url = query ? `/?q=${encodeURIComponent(query)}` : '/'
    window.history.replaceState(null, '', url)
    if (!query || query.length < 2) {
      setSearchResults(emptyResults)
      return
    }
    try {
      const resp = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`)
      const data = await resp.json()
      setSearchResults({
        passages: (data.verses ?? []).map((v: { bookId: string; bookName: string; chapter: number; verse: number; text: string }) => ({
          id: `${v.bookId}-${v.chapter}-${v.verse}`,
          ref: `${v.bookName} ${v.chapter}:${v.verse}`,
          title: v.text?.substring(0, 80) ?? '',
          preview: v.text?.substring(0, 80) ?? '',
          _route: `${v.bookId}/${v.chapter}`,
        })),
        characters: (data.characters ?? []).map((c: { id: string; name: string; bioBrief: string }) => ({
          id: c.id,
          name: c.name,
          bioBrief: c.bioBrief?.substring(0, 60) ?? '',
        })),
        themes: (data.themes ?? []).map((t: { id: string; name: string; definition: string }) => ({
          id: t.id,
          name: t.name,
          modernFraming: t.definition?.substring(0, 60) ?? '',
        })),
        strongs: (data.strongs ?? []).map((s: { number: string; word: string; transliteration: string; shortDefinition: string }) => ({
          id: s.number,
          code: s.number,
          transliteration: s.transliteration ?? s.word,
          brief: s.shortDefinition ?? '',
        })),
      })
    } catch {
      setSearchResults(emptyResults)
    }
  }, [])

  return (
    <HomeView
      searchResults={searchResults}
      searchQuery={searchQuery}
      dailyBread={dailyBread}
      history={history}
      recentNotes={recentNotes}
      welcomeMessage="Welcome to Selah. Start anywhere — a passage, a question, a name you half-remember."
      isFirstLaunch={history.length === 0}
      onSearch={onSearch}
      onNavigatePassage={(ref) => {
        // ref is display format like "John 1:3" — find the matching result to get the route
        const match = searchResults.passages.find((p) => p.ref === ref) as { _route?: string } | undefined
        if (match?._route) {
          router.push(`/reader/${match._route}`)
        } else {
          router.push('/reader')
        }
      }}
      onOpenCharacter={(id) => router.push(`/characters/${id}`)}
      onOpenTheme={(id) => router.push(`/themes/${id}`)}
      onOpenStrongs={(code) => router.push(`/word-study/${code}`)}
      onBeginDailyBread={() => router.push('/daily-bread')}
      onRevisitDailyBread={() => router.push('/daily-bread')}
      onDismissDailyBread={() => {}}
      onOpenHistoryItem={(id, type) => {
        const routes: Record<string, string> = {
          passage: '/reader', character: '/characters',
          theme: '/themes', strongs: '/word-study', sermon: '/study-builder',
        }
        router.push(routes[type] ?? '/')
      }}
      onOpenNote={(noteId) => router.push(`/journal?entry=${noteId}`)}
    />
  )
}
