import { getMoodTiles, getBrowseDevotionals, getDevotionalHistory, getTonightDevotional } from '@/lib/daily-bread/queries'
import DailyBreadClient from './DailyBreadClient'
import { PageTransition } from '@/components/ui/PageTransition'

export default async function DailyBreadPage() {
  const [moodTiles, browseDevotionals, history, tonightDevotional] = await Promise.all([
    getMoodTiles(),
    getBrowseDevotionals(30),
    getDevotionalHistory(20),
    getTonightDevotional(),
  ])

  return (
    <PageTransition>
      <DailyBreadClient
        moodTiles={moodTiles}
        browseDevotionals={browseDevotionals}
        history={history}
        tonightDevotional={tonightDevotional}
      />
    </PageTransition>
  )
}
