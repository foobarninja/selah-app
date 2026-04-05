import { Suspense } from 'react'
import { getDailyBread, getRecentHistory, getRecentNotes } from '@/lib/home/queries'
import HomeClient from './HomeClient'

export default async function HomePage() {
  const [dailyBread, history, recentNotes] = await Promise.all([
    getDailyBread(),
    getRecentHistory(6),
    getRecentNotes(4),
  ])

  return (
    <Suspense>
      <HomeClient
        dailyBread={dailyBread}
        history={history}
        recentNotes={recentNotes}
      />
    </Suspense>
  )
}
