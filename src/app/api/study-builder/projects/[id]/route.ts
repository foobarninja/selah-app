import { NextResponse } from 'next/server'
import { getProject, getProjectItems, deleteProject } from '@/lib/study-builder/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

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
  const project = await getProject(userId, parseInt(id, 10))
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const items = await getProjectItems(userId, parseInt(id, 10))
  return NextResponse.json({ project, items })
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
  const ok = await deleteProject(userId, parseInt(id, 10))
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
