import { NextRequest, NextResponse } from 'next/server'
import { getCollections, createCollection } from '@/lib/journal/queries'
import { listProjects } from '@/lib/study-builder/queries'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [collections, projects] = await Promise.all([
    getCollections(),
    listProjects(),
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
