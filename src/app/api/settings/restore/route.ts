import { NextRequest, NextResponse } from 'next/server'
import { restoreBackup } from '@/lib/settings/queries'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    await restoreBackup(buffer)
    return NextResponse.json({ success: true, message: 'Backup restored. Restart the app to apply changes.' })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Restore failed'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
