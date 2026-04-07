import { NextResponse } from 'next/server'
import { getJournalPickerList } from '@/lib/journal/queries'

export const dynamic = 'force-dynamic'

export async function GET() {
  const journals = await getJournalPickerList()
  return NextResponse.json(journals)
}
