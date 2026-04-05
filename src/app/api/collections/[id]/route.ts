import { NextResponse } from 'next/server'
import { getCollectionDetail, deleteCollection } from '@/lib/journal/queries'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const detail = await getCollectionDetail(parseInt(id, 10))
  if (!detail) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(detail)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  await deleteCollection(parseInt(id, 10))
  return NextResponse.json({ success: true })
}
