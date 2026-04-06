import { NextResponse } from 'next/server'
import { createBackup } from '@/lib/settings/queries'

export async function GET() {
  const buffer = await createBackup()
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/x-sqlite3',
      'Content-Disposition': `attachment; filename="selah-backup-${timestamp}.db"`,
    },
  })
}
