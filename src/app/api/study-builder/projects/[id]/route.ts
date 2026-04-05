import { NextResponse } from 'next/server'
import { getProject, getProjectItems, deleteProject } from '@/lib/study-builder/queries'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const project = await getProject(parseInt(id, 10))
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const items = await getProjectItems(parseInt(id, 10))
  return NextResponse.json({ project, items })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  await deleteProject(parseInt(id, 10))
  return NextResponse.json({ success: true })
}
