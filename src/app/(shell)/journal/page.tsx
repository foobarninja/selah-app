import { runJournalMigration } from '@/lib/journal/migration'
import { getJournals } from '@/lib/journal/queries'
import JournalClient from './JournalClient'

export default async function JournalPage() {
  runJournalMigration()
  const journals = await getJournals()
  return <JournalClient journals={journals} />
}
