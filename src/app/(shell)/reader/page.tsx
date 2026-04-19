import { redirect } from 'next/navigation'
import { getLastReading } from '@/lib/reader/history'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export default async function ReaderIndexPage() {
  const userId = await requireActiveProfileId()
  const last = await getLastReading(userId)
  if (last) {
    redirect(`/reader/${last.bookId}/${last.chapter}`)
  }
  redirect('/reader/GEN/1')
}
