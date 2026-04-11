import { runJournalMigration } from '@/lib/journal/migration'
import { getJournals } from '@/lib/journal/queries'
import JournalClient from './JournalClient'
import { PageTransition } from '@/components/ui/PageTransition'

export default async function JournalPage() {
  runJournalMigration()
  const journals = await getJournals()
  return <PageTransition><JournalClient journals={journals} /></PageTransition>
}
