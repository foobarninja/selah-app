import { NextRequest, NextResponse } from 'next/server'
import { generateDocx, generateMarkdown } from '@/lib/study-builder/export'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { id } = await params
  const projectId = parseInt(id, 10)
  const format = request.nextUrl.searchParams.get('format') || 'docx'

  try {
    if (format === 'markdown') {
      const md = await generateMarkdown(userId, projectId)
      return new NextResponse(md, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Content-Disposition': `attachment; filename="study-${id}.md"`,
        },
      })
    }

    const buffer = await generateDocx(userId, projectId)
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="study-${id}.docx"`,
      },
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Export failed'
    console.error('[study-builder/export]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
