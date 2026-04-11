import { Suspense } from 'react'
import { getDailyBread, getRecentHistory, getRecentNotes } from '@/lib/home/queries'
import { isFirstLaunch } from '@/lib/settings/queries'
import HomeClient from './HomeClient'
import { PageTransition } from '@/components/ui/PageTransition'

export default async function HomePage() {
  const [dailyBread, history, recentNotes, firstLaunch] = await Promise.all([
    getDailyBread(),
    getRecentHistory(6),
    getRecentNotes(4),
    isFirstLaunch(),
  ])

  return (
    <PageTransition>
      <Suspense>
        <HomeClient
          dailyBread={dailyBread}
          history={history}
          recentNotes={recentNotes}
          isFirstLaunch={firstLaunch}
        />
      </Suspense>
    </PageTransition>
  )
}
