import { NextRequest, NextResponse } from 'next/server'
import { listProjects, createProject } from '@/lib/study-builder/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET() {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const projects = await listProjects(userId)
  return NextResponse.json(projects)
}

export async function POST(request: NextRequest) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { topic, format } = await request.json()
  const id = await createProject(userId, topic, format || 'sermon')
  return NextResponse.json({ id }, { status: 201 })
}
