import { NextRequest, NextResponse } from 'next/server'
import { getCollections, createCollection } from '@/lib/journal/queries'

export async function GET() {
  const collections = await getCollections()
  return NextResponse.json(collections)
}

export async function POST(request: NextRequest) {
  const { title, description } = await request.json()
  const id = await createCollection(title ?? 'Untitled Collection', description ?? '')
  return NextResponse.json({ id }, { status: 201 })
}
