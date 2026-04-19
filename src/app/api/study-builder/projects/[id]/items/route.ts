import { NextRequest, NextResponse } from 'next/server'
import { addAssemblyItem } from '@/lib/study-builder/queries'
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
  const { entityType, entityId, title, preview, sourceTier } = await request.json()
  const itemId = await addAssemblyItem(
    userId,
    parseInt(id, 10),
    entityType,
    entityId,
    title,
    preview || '',
    sourceTier || 2,
  )
  return NextResponse.json({ id: itemId }, { status: 201 })
}
