import { NextRequest, NextResponse } from 'next/server'
import { listProjects, createProject } from '@/lib/study-builder/queries'

export async function GET() {
  const projects = await listProjects()
  return NextResponse.json(projects)
}

export async function POST(request: NextRequest) {
  const { topic, format } = await request.json()
  const id = await createProject(topic, format || 'sermon')
  return NextResponse.json({ id }, { status: 201 })
}
