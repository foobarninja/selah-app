import { NextRequest, NextResponse } from 'next/server'
import { generateDocx, generateMarkdown } from '@/lib/study-builder/export'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const projectId = parseInt(id, 10)
  const format = request.nextUrl.searchParams.get('format') || 'docx'

  if (format === 'markdown') {
    const md = await generateMarkdown(projectId)
    return new NextResponse(md, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="study-${id}.md"`,
      },
    })
  }

  const buffer = await generateDocx(projectId)
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="study-${id}.docx"`,
    },
  })
}
