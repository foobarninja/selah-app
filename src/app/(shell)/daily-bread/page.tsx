import { getMoodTiles, getBrowseDevotionals, getDevotionalHistory, getTonightDevotional, getDevotionalBooks, searchSeries } from '@/lib/daily-bread/queries'
import { getAIConfig } from '@/lib/settings/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'
import DailyBreadClient from './DailyBreadClient'
import { PageTransition } from '@/components/ui/PageTransition'

export default async function DailyBreadPage() {
  const userId = await requireActiveProfileId()
  const [moodTiles, browseDevotionals, history, tonightDevotional, devotionalBooks, browseSeries, aiConfig] = await Promise.all([
    getMoodTiles(),
    getBrowseDevotionals(50),
    getDevotionalHistory(userId, 20),
    getTonightDevotional(),
    getDevotionalBooks(),
    searchSeries({ limit: 50 }),
    getAIConfig(),
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
        isAIConfigured={aiConfig.isConfigured}
      />
    </PageTransition>
  )
}
