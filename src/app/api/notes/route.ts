import { NextRequest, NextResponse } from 'next/server'
import { getJournalEntries, createNote } from '@/lib/journal/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET(request: NextRequest) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const search = request.nextUrl.searchParams.get('q') ?? undefined
  const noteType = request.nextUrl.searchParams.get('type') ?? undefined
  const entries = await getJournalEntries(userId, { search, noteType })
  return NextResponse.json(entries)
}

export async function POST(request: NextRequest) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const body = await request.json()
  const id = await createNote(userId, body)
  return NextResponse.json({ id }, { status: 201 })
}
