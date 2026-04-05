import { getJournalEntries, getCollections, getBookmarks, getUserTags } from '@/lib/journal/queries'
import JournalClient from './JournalClient'

export default async function JournalPage() {
  const [entries, collections, bookmarks, userTags] = await Promise.all([
    getJournalEntries({ limit: 100 }),
    getCollections(),
    getBookmarks(),
    getUserTags(),
  ])

  return (
    <JournalClient
      entries={entries}
      collections={collections}
      bookmarks={bookmarks}
      availableUserTags={userTags}
    />
  )
}
