import { NextResponse } from 'next/server'
import { generateCollectionsDocx } from '@/lib/export/targets/collection'

export async function GET() {
  const buffer = await generateCollectionsDocx()
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="selah-collections-${timestamp}.docx"`,
    },
  })
}
