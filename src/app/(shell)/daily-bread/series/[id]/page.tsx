// src/app/(shell)/daily-bread/series/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getSeriesById } from '@/lib/daily-bread/queries'
import { PageTransition } from '@/components/ui/PageTransition'
import SeriesDetailClient from './SeriesDetailClient'

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const series = await getSeriesById(id)
  if (!series) notFound()
  return (
    <PageTransition>
      <SeriesDetailClient series={series} />
    </PageTransition>
  )
}
