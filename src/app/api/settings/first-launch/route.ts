import { NextResponse } from 'next/server'
import { isFirstLaunch, completeFirstLaunch } from '@/lib/settings/queries'

export async function GET() {
  const firstLaunch = await isFirstLaunch()
  return NextResponse.json({ firstLaunch })
}

export async function POST() {
  await completeFirstLaunch()
  return NextResponse.json({ success: true })
}
