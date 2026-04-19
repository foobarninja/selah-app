import { NextResponse } from 'next/server'
import { getJournalPickerList } from '@/lib/journal/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export const dynamic = 'force-dynamic'

export async function GET() {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const journals = await getJournalPickerList(userId)
  return NextResponse.json(journals)
}
