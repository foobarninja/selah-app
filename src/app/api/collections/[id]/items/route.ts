import { NextRequest, NextResponse } from 'next/server'
import { addCollectionItem } from '@/lib/journal/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { id } = await params
  const { itemType, itemRef, note } = await request.json()
  try {
    const itemId = await addCollectionItem(userId, parseInt(id, 10), itemType, itemRef, note)
    return NextResponse.json({ id: itemId }, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    if (message === 'collection not found') {
      return NextResponse.json({ error: message }, { status: 404 })
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
