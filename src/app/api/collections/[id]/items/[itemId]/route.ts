import { NextResponse } from 'next/server'
import { removeCollectionItem } from '@/lib/journal/queries'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> },
) {
  const { itemId } = await params
  await removeCollectionItem(parseInt(itemId, 10))
  return NextResponse.json({ success: true })
}
