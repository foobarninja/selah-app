import { getMoodTiles, getBrowseDevotionals, getDevotionalHistory, getTonightDevotional } from '@/lib/daily-bread/queries'
import DailyBreadClient from './DailyBreadClient'

export default async function DailyBreadPage() {
  const [moodTiles, browseDevotionals, history, tonightDevotional] = await Promise.all([
    getMoodTiles(),
    getBrowseDevotionals(30),
    getDevotionalHistory(20),
    getTonightDevotional(),
  ])

  return (
    <DailyBreadClient
      moodTiles={moodTiles}
      browseDevotionals={browseDevotionals}
      history={history}
      tonightDevotional={tonightDevotional}
    />
  )
}
