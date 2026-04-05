import { NextRequest, NextResponse } from 'next/server'
import { getJournalEntries, createNote } from '@/lib/journal/queries'

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('q') ?? undefined
  const noteType = request.nextUrl.searchParams.get('type') ?? undefined
  const entries = await getJournalEntries({ search, noteType })
  return NextResponse.json(entries)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const id = await createNote(body)
  return NextResponse.json({ id }, { status: 201 })
}
