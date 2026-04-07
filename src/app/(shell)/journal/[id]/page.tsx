import { notFound } from 'next/navigation'
import { getJournalDetail, getJournalEntries, getUserTags } from '@/lib/journal/queries'
import JournalDetailClient from './JournalDetailClient'
import type { JournalDetail } from '@/components/journal/types'

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (id === 'all') {
    // Synthetic "All Notes" journal
    const [entries, availableTags] = await Promise.all([
      getJournalEntries({ limit: 500 }),
      getUserTags(),
    ])
    const allJournal: JournalDetail = {
      id: 'all',
      name: 'All Notes',
      description: 'Every note across all journals',
      coverColor: null,
      journalType: 'collection',
      isDefault: false,
      anchorBookId: null,
      anchorChapter: null,
      anchorCharacterId: null,
      anchorThemeId: null,
    }
    return <JournalDetailClient journal={allJournal} entries={entries} availableTags={availableTags} />
  }

  const [journal, entries, availableTags] = await Promise.all([
    getJournalDetail(id),
    getJournalEntries({ journalId: id }),
    getUserTags(),
  ])

  if (!journal) notFound()

  return <JournalDetailClient journal={journal} entries={entries} availableTags={availableTags} />
}
