import { NextRequest, NextResponse } from 'next/server'
import { addAssemblyItem } from '@/lib/study-builder/queries'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const { entityType, entityId, title, preview, sourceTier } = await request.json()
  const itemId = await addAssemblyItem(
    parseInt(id, 10),
    entityType,
    entityId,
    title,
    preview || '',
    sourceTier || 2,
  )
  return NextResponse.json({ id: itemId }, { status: 201 })
}
