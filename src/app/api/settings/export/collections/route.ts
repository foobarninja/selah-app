import { NextResponse } from 'next/server'
import { exportCollections } from '@/lib/settings/queries'

export async function GET() {
  const md = await exportCollections()
  return new NextResponse(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': 'attachment; filename="selah-collections-export.md"',
    },
  })
}
