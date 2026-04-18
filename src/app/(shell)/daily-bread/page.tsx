import { getMoodTiles, getBrowseDevotionals, getDevotionalHistory, getTonightDevotional, getDevotionalBooks, searchSeries } from '@/lib/daily-bread/queries'
import DailyBreadClient from './DailyBreadClient'
import { PageTransition } from '@/components/ui/PageTransition'

export default async function DailyBreadPage() {
  const [moodTiles, browseDevotionals, history, tonightDevotional, devotionalBooks, browseSeries] = await Promise.all([
    getMoodTiles(),
    getBrowseDevotionals(50),
    getDevotionalHistory(20),
    getTonightDevotional(),
    getDevotionalBooks(),
    searchSeries({ limit: 50 }),
  ])

  return (
    <PageTransition>
      <DailyBreadClient
        moodTiles={moodTiles}
        browseDevotionals={browseDevotionals}
        browseSeries={browseSeries}
        history={history}
        tonightDevotional={tonightDevotional}
        devotionalBooks={devotionalBooks}
      />
    </PageTransition>
  )
}
