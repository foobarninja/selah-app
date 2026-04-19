import { NextResponse } from 'next/server'
import { deleteBookmark } from '@/lib/journal/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { id } = await params
  await deleteBookmark(userId, parseInt(id, 10))
  return NextResponse.json({ success: true })
}
