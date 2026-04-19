import { NextRequest, NextResponse } from 'next/server'
import { removeAssemblyItem, updateAnnotation } from '@/lib/study-builder/queries'
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
  await removeAssemblyItem(userId, parseInt(itemId, 10))
  return NextResponse.json({ success: true })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> },
) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { itemId } = await params
  const { annotation } = await request.json()
  await updateAnnotation(userId, parseInt(itemId, 10), annotation)
  return NextResponse.json({ success: true })
}
