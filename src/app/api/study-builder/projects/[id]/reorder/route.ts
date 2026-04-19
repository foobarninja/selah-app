import { NextRequest, NextResponse } from 'next/server'
import { reorderItems } from '@/lib/study-builder/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function PUT(
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
  const { itemIds } = await request.json()
  await reorderItems(userId, parseInt(id, 10), itemIds.map(Number))
  return NextResponse.json({ success: true })
}
