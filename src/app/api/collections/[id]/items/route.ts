import { NextRequest, NextResponse } from 'next/server'
import { addCollectionItem } from '@/lib/journal/queries'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const { itemType, itemRef, note } = await request.json()
  const itemId = await addCollectionItem(parseInt(id, 10), itemType, itemRef, note)
  return NextResponse.json({ id: itemId }, { status: 201 })
}
