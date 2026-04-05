import { NextRequest, NextResponse } from 'next/server'
import { removeAssemblyItem, updateAnnotation } from '@/lib/study-builder/queries'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> },
) {
  const { itemId } = await params
  await removeAssemblyItem(parseInt(itemId, 10))
  return NextResponse.json({ success: true })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> },
) {
  const { itemId } = await params
  const { annotation } = await request.json()
  await updateAnnotation(parseInt(itemId, 10), annotation)
  return NextResponse.json({ success: true })
}
