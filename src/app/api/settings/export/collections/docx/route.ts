import { NextResponse } from 'next/server'
import { generateCollectionsDocx } from '@/lib/export/targets/collection'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET() {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const buffer = await generateCollectionsDocx(userId)
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="selah-collections-${timestamp}.docx"`,
    },
  })
}
