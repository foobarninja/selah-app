import { redirect } from 'next/navigation'
import { getLastReading } from '@/lib/reader/history'

export default async function ReaderIndexPage() {
  const last = await getLastReading()
  if (last) {
    redirect(`/reader/${last.bookId}/${last.chapter}`)
  }
  redirect('/reader/GEN/1')
}
