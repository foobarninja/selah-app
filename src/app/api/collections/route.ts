import { NextRequest, NextResponse } from 'next/server'
import { getCollections, createCollection } from '@/lib/journal/queries'
import { listProjects } from '@/lib/study-builder/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export const dynamic = 'force-dynamic'

export async function GET() {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const [collections, projects] = await Promise.all([
    getCollections(),
    listProjects(userId),
  ])

  const unified = [
    ...projects.map((p) => ({ id: `study:${p.id}`, title: p.topic, type: 'study' as const })),
    ...collections.map((c) => ({ id: `collection:${c.id}`, title: c.title, type: 'collection' as const })),
  ]

  return NextResponse.json(unified)
}

export async function POST(request: NextRequest) {
  const { title, description } = await request.json()
  const id = await createCollection(title ?? 'Untitled Collection', description ?? '')
  return NextResponse.json({ id }, { status: 201 })
}
