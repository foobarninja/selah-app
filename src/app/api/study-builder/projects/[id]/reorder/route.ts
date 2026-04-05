import { NextRequest, NextResponse } from 'next/server'
import { reorderItems } from '@/lib/study-builder/queries'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const { itemIds } = await request.json()
  await reorderItems(parseInt(id, 10), itemIds.map(Number))
  return NextResponse.json({ success: true })
}
