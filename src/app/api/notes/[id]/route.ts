import { NextResponse } from 'next/server'
import { getJournalEntry, updateNote, deleteNote } from '@/lib/journal/queries'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const entry = await getJournalEntry(parseInt(id, 10))
  if (!entry) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(entry)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const body = await request.json()
  await updateNote(parseInt(id, 10), body)
  return NextResponse.json({ success: true })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  await deleteNote(parseInt(id, 10))
  return NextResponse.json({ success: true })
}
