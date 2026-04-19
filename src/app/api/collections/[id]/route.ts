import { NextResponse } from 'next/server'
import { getCollectionDetail, deleteCollection } from '@/lib/journal/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { id } = await params
  const detail = await getCollectionDetail(userId, parseInt(id, 10))
  if (!detail) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(detail)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { id } = await params
  try {
    await deleteCollection(userId, parseInt(id, 10))
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    if (message === 'collection not found') {
      return NextResponse.json({ error: message }, { status: 404 })
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
