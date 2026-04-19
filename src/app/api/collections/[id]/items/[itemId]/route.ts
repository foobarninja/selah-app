import { NextResponse } from 'next/server'
import { removeCollectionItem } from '@/lib/journal/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> },
) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { itemId } = await params
  await removeCollectionItem(userId, parseInt(itemId, 10))
  return NextResponse.json({ success: true })
}
