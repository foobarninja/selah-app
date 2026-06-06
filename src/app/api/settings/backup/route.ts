import { NextResponse } from 'next/server'
import { createBackup } from '@/lib/settings/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET() {
  // Full-DB backup is a privileged, global operation. Require an authenticated
  // active profile BEFORE reading/streaming the database. Without this guard any
  // unauthenticated request could exfiltrate the entire SQLite DB.
  try {
    await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'No active profile' }, { status: 401 })
  }

  const buffer = await createBackup()
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/x-sqlite3',
      'Content-Disposition': `attachment; filename="selah-backup-${timestamp}.db"`,
    },
  })
}
