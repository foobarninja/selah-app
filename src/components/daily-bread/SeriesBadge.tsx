// src/components/daily-bread/SeriesBadge.tsx
'use client'

import { ChevronLeft } from 'lucide-react'

const font = {
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

interface Props {
  seriesId: string
  seriesOrder: number
  seriesTitle: string
  partCount: number
  onOpenSeries: (seriesId: string) => void
}

export function SeriesBadge({ seriesId, seriesOrder, seriesTitle, partCount, onOpenSeries }: Props) {
  return (
    <button
      onClick={() => onOpenSeries(seriesId)}
      className="inline-flex items-center gap-2 transition-colors duration-150"
      style={{
        fontFamily: font.body,
        fontSize: '12px',
        fontWeight: 500,
        padding: '5px 12px 5px 8px',
        borderRadius: '14px',
        border: '1px solid var(--selah-teal-400, #4A9E88)',
        backgroundColor: 'var(--selah-teal-800, #1A4539)',
        color: 'var(--selah-teal-400, #4A9E88)',
        cursor: 'pointer',
        marginBottom: '16px',
      }}
      aria-label={`Open series ${seriesTitle}`}
    >
      <ChevronLeft size={12} strokeWidth={2} />
      Part {seriesOrder} of {partCount} &middot; {seriesTitle}
    </button>
  )
}
