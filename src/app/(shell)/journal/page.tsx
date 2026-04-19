import { runJournalMigration } from '@/lib/journal/migration'
import { getJournals } from '@/lib/journal/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'
import JournalClient from './JournalClient'
import { PageTransition } from '@/components/ui/PageTransition'

export default async function JournalPage() {
  runJournalMigration()
  const userId = await requireActiveProfileId()
  const journals = await getJournals(userId)
  return <PageTransition><JournalClient journals={journals} /></PageTransition>
}
