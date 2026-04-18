// src/components/daily-bread/DevotionalBrowse.tsx
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X, Clock } from 'lucide-react'
import { SeriesCard } from './SeriesCard'
import type { DevotionalSummary, MoodTile, DevotionalBook, AudienceLevel, SeriesSummary } from './types'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

const audiences: AudienceLevel[] = ['family', 'tween' as AudienceLevel, 'teens', 'adults']

interface Props {
  initialData: DevotionalSummary[]
  initialSeries?: SeriesSummary[]
  moodTiles: MoodTile[]
  books: DevotionalBook[]
  onOpenDevotional?: (id: string) => void
  onOpenSeries?: (id: string) => void
}

export function DevotionalBrowse({ initialData, initialSeries, moodTiles, books, onOpenDevotional, onOpenSeries }: Props) {
  const [query, setQuery] = useState('')
  const [tagId, setTagId] = useState('')
  const [bookId, setBookId] = useState('')
  const [audience, setAudience] = useState('')
  const [devotionalResults, setDevotionalResults] = useState<DevotionalSummary[]>(initialData)
  const [seriesResults, setSeriesResults] = useState<SeriesSummary[]>(initialSeries ?? [])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const hasFilters = query.length > 0 || tagId.length > 0 || bookId.length > 0 || audience.length > 0

  const fetchResults = useCallback(async (q: string, tag: string, book: string, aud: string) => {
    if (!q && !tag && !book && !aud) {
      setDevotionalResults(initialData)
      setSeriesResults(initialSeries ?? [])
      return
    }
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (q) params.set('q', q)
      if (tag) params.set('tag', tag)
      if (book) params.set('book', book)
      if (aud) params.set('audience', aud)
      const resp = await fetch(`/api/devotionals/search?${params.toString()}`)
      const data = await resp.json()
      setDevotionalResults(data.devotionals ?? [])
      setSeriesResults(data.series ?? [])
    } catch (e) {
      console.error('[DevotionalBrowse] search failed:', e)
    } finally {
      setLoading(false)
    }
  }, [initialData, initialSeries])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchResults(query, tagId, bookId, audience)
    }, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, tagId, bookId, audience, fetchResults])

  const clearAll = () => { setQuery(''); setTagId(''); setBookId(''); setAudience('') }

  const showSeriesSection = seriesResults.length > 0

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={14} strokeWidth={1.5} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--selah-text-3, #6E695F)' }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search devotionals..."
          style={{
            width: '100%', padding: '10px 12px 10px 34px', borderRadius: '8px',
            backgroundColor: 'var(--selah-bg-surface, #1C1917)',
            border: '1px solid var(--selah-border-color, #3D3835)',
            color: 'var(--selah-text-1, #E8E2D9)',
            fontFamily: font.body, fontSize: '14px', outline: 'none',
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={tagId}
          onChange={(e) => setTagId(e.target.value)}
          style={{
            padding: '6px 10px', borderRadius: '6px', fontSize: '12px',
            backgroundColor: 'var(--selah-bg-surface, #1C1917)',
            border: '1px solid var(--selah-border-color, #3D3835)',
            color: tagId ? 'var(--selah-text-1, #E8E2D9)' : 'var(--selah-text-3, #6E695F)',
            fontFamily: font.body, cursor: 'pointer',
          }}
        >
          <option value="">All moods</option>
          {moodTiles.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>

        <select
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          style={{
            padding: '6px 10px', borderRadius: '6px', fontSize: '12px',
            backgroundColor: 'var(--selah-bg-surface, #1C1917)',
            border: '1px solid var(--selah-border-color, #3D3835)',
            color: bookId ? 'var(--selah-text-1, #E8E2D9)' : 'var(--selah-text-3, #6E695F)',
            fontFamily: font.body, cursor: 'pointer',
          }}
        >
          <option value="">All books</option>
          {books.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>

        <div className="flex gap-1">
          {audiences.map((aud) => (
            <button
              key={aud}
              onClick={() => setAudience(audience === aud ? '' : aud)}
              style={{
                padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 500,
                fontFamily: font.body, cursor: 'pointer', border: 'none',
                backgroundColor: audience === aud ? 'var(--selah-gold-500, #C6A23C)' : 'var(--selah-bg-surface, #1C1917)',
                color: audience === aud ? '#fff' : 'var(--selah-text-3, #6E695F)',
              }}
            >
              {aud}
            </button>
          ))}
        </div>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1"
            style={{
              padding: '4px 10px', borderRadius: '12px', fontSize: '11px',
              fontFamily: font.body, cursor: 'pointer', border: 'none',
              backgroundColor: 'var(--selah-terra-800, #5C2D21)',
              color: 'var(--selah-text-1, #E8E2D9)',
            }}
          >
            <X size={10} strokeWidth={2} /> Clear
          </button>
        )}
      </div>

      <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>
        {loading ? 'Searching...' : `${devotionalResults.length} devotional${devotionalResults.length === 1 ? '' : 's'}${showSeriesSection ? ` · ${seriesResults.length} series` : ''}`}
      </p>

      {showSeriesSection && (
        <>
          <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-teal-400, #4A9E88)', marginTop: '16px', marginBottom: '8px' }}>
            Series
          </p>
          <div className="space-y-3">
            {seriesResults.map((s) => (
              <SeriesCard
                key={s.id}
                series={s}
                onOpenSeries={(id) => onOpenSeries?.(id)}
                onOpenPart={(id) => onOpenDevotional?.(id)}
              />
            ))}
          </div>
          <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-text-3, #6E695F)', marginTop: '20px', marginBottom: '8px' }}>
            All Devotionals
          </p>
        </>
      )}

      <div className="space-y-3">
        {devotionalResults.length === 0 && !loading && (
          <div className="text-center py-12">
            <p style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 400, color: 'var(--selah-text-2, #A39E93)', marginBottom: '8px' }}>No devotionals match your filters</p>
            <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-3, #6E695F)' }}>Try adjusting your search or clearing filters.</p>
          </div>
        )}
        {devotionalResults.map((dev) => (
          <button
            key={dev.id}
            onClick={() => onOpenDevotional?.(dev.id)}
            className="w-full text-left rounded-lg transition-colors duration-150"
            style={{
              padding: '14px 16px',
              backgroundColor: 'var(--selah-bg-surface, #1C1917)',
              border: '1px solid var(--selah-border-color, #3D3835)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-gold-300, #E8C767)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-border-color, #3D3835)' }}
          >
            <p style={{ fontFamily: font.display, fontSize: '16px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '4px' }}>{dev.title}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>{dev.passageRef}</span>
              <span style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, padding: '1px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-50, #FBF3E0)', color: 'var(--selah-gold-700, #7A5C1F)' }}>{dev.audienceLevel}</span>
              <span className="flex items-center gap-1" style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}><Clock size={10} strokeWidth={1.5} />{dev.estimatedMinutes} min</span>
              {dev.situation && <span style={{ fontFamily: font.body, fontSize: '10px', padding: '1px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-bg-elevated, #292524)', color: 'var(--selah-text-3, #6E695F)' }}>{dev.situation}</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
