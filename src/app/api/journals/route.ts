import { NextResponse } from 'next/server'
import { getJournals, createJournal } from '@/lib/journal/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export const dynamic = 'force-dynamic'

export async function GET() {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const journals = await getJournals(userId)
  return NextResponse.json(journals)
}

export async function POST(req: Request) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const body = await req.json()
  const id = await createJournal(userId, body)
  return NextResponse.json({ id })
}
