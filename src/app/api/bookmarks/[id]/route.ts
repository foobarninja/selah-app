import { NextResponse } from 'next/server'
import { deleteBookmark } from '@/lib/journal/queries'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  await deleteBookmark(parseInt(id, 10))
  return NextResponse.json({ success: true })
}
