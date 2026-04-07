import { NextResponse } from 'next/server'
import { exportJournal } from '@/lib/settings/queries'

export async function GET() {
  const md = await exportJournal()
  return new NextResponse(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': 'attachment; filename="selah-journal-export.md"',
    },
  })
}
