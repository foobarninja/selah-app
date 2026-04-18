// src/components/daily-bread/SeriesCard.tsx
'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Clock, Check, Circle } from 'lucide-react'
import type { SeriesSummary, SeriesPart } from './types'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

interface Props {
  series: SeriesSummary
  parts?: SeriesPart[] // Optional — fetched lazily on expand if not provided
  onOpenSeries: (seriesId: string) => void
  onOpenPart: (devotionalId: string) => void
}

export function SeriesCard({ series, parts, onOpenSeries, onOpenPart }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [loadedParts, setLoadedParts] = useState<SeriesPart[] | null>(parts ?? null)
  const [loading, setLoading] = useState(false)

  const toggleExpand = async () => {
    const next = !expanded
    setExpanded(next)
    if (next && loadedParts === null) {
      setLoading(true)
      try {
        const resp = await fetch(`/api/devotionals/series/${encodeURIComponent(series.id)}`)
        if (resp.ok) {
          const data = await resp.json()
          setLoadedParts(data.parts as SeriesPart[])
        }
      } catch (e) {
        console.error('[SeriesCard] failed to load parts:', e)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div
      className="rounded-xl transition-all duration-200"
      style={{
        backgroundColor: 'var(--selah-bg-surface, #1C1917)',
        border: '1px solid var(--selah-border-color, #3D3835)',
        borderLeft: '4px solid var(--selah-teal-400, #4A9E88)',
        padding: '18px 22px',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <button
          onClick={() => onOpenSeries(series.id)}
          className="text-left transition-colors duration-150"
          style={{
            fontFamily: font.display,
            fontSize: '20px',
            fontWeight: 500,
            color: 'var(--selah-text-1, #E8E2D9)',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            lineHeight: 1.3,
          }}
        >
          {series.title}
        </button>
        <span
          style={{
            fontFamily: font.body,
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            padding: '3px 10px',
            borderRadius: '10px',
            backgroundColor: 'var(--selah-teal-800, #1A4539)',
            color: 'var(--selah-teal-400, #4A9E88)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {series.partCount} parts &middot; ~{series.totalEstimatedMinutes} min
        </span>
      </div>

      <p
        className="line-clamp-2"
        style={{
          fontFamily: font.body,
          fontSize: '14px',
          color: 'var(--selah-text-2, #A39E93)',
          lineHeight: 1.5,
          marginTop: '6px',
        }}
      >
        {series.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        <span style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, padding: '1px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-50, #FBF3E0)', color: 'var(--selah-gold-700, #7A5C1F)' }}>
          {series.audience}
        </span>
        {series.tags.map((t) => (
          <span key={t} style={{ fontFamily: font.body, fontSize: '10px', padding: '1px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-bg-elevated, #292524)', color: 'var(--selah-text-3, #6E695F)' }}>
            {t}
          </span>
        ))}
      </div>

      {series.bridgePart && (
        <button
          onClick={() => onOpenPart(series.bridgePart!.devotionalId)}
          className="text-left"
          style={{
            marginTop: '10px',
            fontFamily: font.body,
            fontSize: '12px',
            color: 'var(--selah-teal-400, #4A9E88)',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          Includes Part {series.bridgePart.seriesOrder}: {series.bridgePart.title} &mdash; {series.bridgePart.passageRef}
        </button>
      )}

      <div className="flex justify-end mt-2">
        <button
          onClick={toggleExpand}
          aria-expanded={expanded}
          aria-label={expanded ? 'Hide parts' : 'Show parts'}
          className="flex items-center gap-1 transition-opacity duration-150 opacity-60 hover:opacity-100"
          style={{
            fontFamily: font.body,
            fontSize: '11px',
            color: 'var(--selah-text-3, #6E695F)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
          }}
        >
          {expanded ? 'Hide parts' : 'Show parts'}
          {expanded ? <ChevronUp size={12} strokeWidth={1.5} /> : <ChevronDown size={12} strokeWidth={1.5} />}
        </button>
      </div>

      {expanded && (
        <div className="mt-2" style={{ borderTop: '1px solid var(--selah-border-color, #3D3835)', paddingTop: '10px' }}>
          {loading && (
            <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>Loading parts…</p>
          )}
          {loadedParts && loadedParts.map((p) => (
            <button
              key={p.id}
              onClick={() => onOpenPart(p.id)}
              className="w-full text-left flex items-center gap-3 rounded-md transition-colors duration-100"
              style={{
                padding: '8px 6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
              title={p.completedAt ? `Completed ${new Date(p.completedAt).toLocaleDateString()}` : 'Not yet read'}
            >
              {p.completedAt
                ? <Check size={14} strokeWidth={2} style={{ color: 'var(--selah-gold-500, #C6A23C)', flexShrink: 0 }} />
                : <Circle size={14} strokeWidth={1.5} style={{ color: 'var(--selah-text-3, #6E695F)', flexShrink: 0 }} />}
              <span style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)', width: '48px', flexShrink: 0 }}>Part {p.seriesOrder}</span>
              <span style={{ fontFamily: font.display, fontSize: '14px', color: 'var(--selah-text-1, #E8E2D9)', flex: 1 }}>{p.title}</span>
              <span style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}>{p.passageRef}</span>
              <span className="flex items-center gap-1" style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)', width: '40px', justifyContent: 'flex-end', flexShrink: 0 }}>
                <Clock size={10} strokeWidth={1.5} />{p.estimatedMinutes} min
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
