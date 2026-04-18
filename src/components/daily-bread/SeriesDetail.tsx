// src/components/daily-bread/SeriesDetail.tsx
'use client'

import { ArrowLeft, Check, Circle, Clock } from 'lucide-react'
import type { SeriesDetail as SeriesDetailShape } from './types'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

interface Props {
  series: SeriesDetailShape
  onBack: () => void
  onOpenPart: (devotionalId: string) => void
}

export function SeriesDetail({ series, onBack, onOpenPart }: Props) {
  // CTA logic: lowest-seriesOrder uncompleted part.
  const firstUncompleted = series.parts.find((p) => p.completedAt === null) ?? null
  const allCompleted = firstUncompleted === null && series.parts.length > 0

  let ctaLabel: string
  let ctaTargetId: string | null = null
  if (series.parts.length === 0) {
    ctaLabel = 'No parts available'
    ctaTargetId = null
  } else if (allCompleted) {
    ctaLabel = `Restart: Part ${series.parts[0].seriesOrder} \u2192`
    ctaTargetId = series.parts[0].id
  } else if (firstUncompleted!.seriesOrder === series.parts[0].seriesOrder && series.parts.every((p) => p.completedAt === null)) {
    ctaLabel = `Start Part ${firstUncompleted!.seriesOrder} \u2192`
    ctaTargetId = firstUncompleted!.id
  } else {
    ctaLabel = `Continue: Part ${firstUncompleted!.seriesOrder} \u2192`
    ctaTargetId = firstUncompleted!.id
  }

  return (
    <div className="h-full overflow-y-auto" style={{ padding: '40px 32px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6"
          style={{
            fontFamily: font.body, fontSize: '13px', fontWeight: 500,
            color: 'var(--selah-text-3, #6E695F)',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >
          <ArrowLeft size={16} strokeWidth={1.5} /> Back to Daily Bread
        </button>

        <h1 style={{ fontFamily: font.display, fontWeight: 300, fontSize: '32px', lineHeight: 1.3, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '6px' }}>
          {series.title}
        </h1>
        <p style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500, color: 'var(--selah-teal-400, #4A9E88)', marginBottom: '16px' }}>
          A {series.partCount}-part arc &middot; ~{series.totalEstimatedMinutes} minutes total
        </p>
        <p style={{ fontFamily: font.body, fontSize: '16px', lineHeight: 1.6, color: 'var(--selah-text-2, #A39E93)', marginBottom: '20px' }}>
          {series.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <span style={{ fontFamily: font.body, fontSize: '11px', padding: '2px 10px', borderRadius: '10px', backgroundColor: 'var(--selah-gold-50, #FBF3E0)', color: 'var(--selah-gold-700, #7A5C1F)' }}>
            {series.audience}
          </span>
          {series.tags.map((t) => (
            <span key={t} style={{ fontFamily: font.body, fontSize: '11px', padding: '2px 10px', borderRadius: '10px', backgroundColor: 'var(--selah-bg-elevated, #292524)', color: 'var(--selah-text-3, #6E695F)' }}>
              {t}
            </span>
          ))}
        </div>

        {ctaTargetId && (
          <button
            onClick={() => onOpenPart(ctaTargetId!)}
            className="transition-colors duration-150"
            style={{
              fontFamily: font.body, fontSize: '15px', fontWeight: 600,
              padding: '12px 28px', borderRadius: '10px',
              backgroundColor: 'var(--selah-teal-400, #4A9E88)',
              color: '#fff', border: 'none', cursor: 'pointer',
              marginBottom: '32px',
            }}
          >
            {ctaLabel}
          </button>
        )}

        <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-text-3, #6E695F)', marginBottom: '12px' }}>
          Parts
        </p>
        <div className="space-y-1">
          {series.parts.map((p) => (
            <button
              key={p.id}
              onClick={() => onOpenPart(p.id)}
              className="w-full text-left flex items-center gap-4 rounded-md transition-colors duration-100"
              style={{
                padding: '12px 14px',
                background: 'none', border: 'none', cursor: 'pointer',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
              title={p.completedAt ? `Completed ${new Date(p.completedAt).toLocaleDateString()}` : 'Not yet read'}
            >
              {p.completedAt
                ? <Check size={16} strokeWidth={2} style={{ color: 'var(--selah-gold-500, #C6A23C)', flexShrink: 0 }} />
                : <Circle size={16} strokeWidth={1.5} style={{ color: 'var(--selah-text-3, #6E695F)', flexShrink: 0 }} />}
              <span style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)', width: '56px', flexShrink: 0 }}>
                Part {p.seriesOrder}
              </span>
              <span style={{ fontFamily: font.display, fontSize: '16px', color: 'var(--selah-text-1, #E8E2D9)', flex: 1 }}>
                {p.title}
              </span>
              <span style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>
                {p.passageRef}
              </span>
              <span className="flex items-center gap-1" style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)', width: '48px', justifyContent: 'flex-end', flexShrink: 0 }}>
                <Clock size={11} strokeWidth={1.5} /> {p.estimatedMinutes} min
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
