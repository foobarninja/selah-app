import { Suspense } from 'react'
import { getDailyBread, getRecentHistory, getRecentNotes } from '@/lib/home/queries'
import { isFirstLaunch } from '@/lib/settings/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'
import HomeClient from './HomeClient'
import { PageTransition } from '@/components/ui/PageTransition'

export default async function HomePage() {
  const userId = await requireActiveProfileId()
  const [dailyBread, history, recentNotes, firstLaunch] = await Promise.all([
    getDailyBread(userId),
    getRecentHistory(userId, 6),
    getRecentNotes(userId, 4),
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
