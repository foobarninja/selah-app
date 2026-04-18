// src/app/(shell)/daily-bread/series/[id]/SeriesDetailClient.tsx
'use client'

import { useRouter } from 'next/navigation'
import { SeriesDetail } from '@/components/daily-bread/SeriesDetail'
import type { SeriesDetail as SeriesDetailShape } from '@/components/daily-bread/types'

export default function SeriesDetailClient({ series }: { series: SeriesDetailShape }) {
  const router = useRouter()
  return (
    <SeriesDetail
      series={series}
      onBack={() => router.push('/daily-bread')}
      onOpenPart={(devotionalId) => router.push(`/daily-bread?devotional=${encodeURIComponent(devotionalId)}`)}
    />
  )
}
