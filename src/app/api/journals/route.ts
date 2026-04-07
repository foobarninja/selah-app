import { NextResponse } from 'next/server'
import { getJournals, createJournal } from '@/lib/journal/queries'

export const dynamic = 'force-dynamic'

export async function GET() {
  const journals = await getJournals()
  return NextResponse.json(journals)
}

export async function POST(req: Request) {
  const body = await req.json()
  const id = await createJournal(body)
  return NextResponse.json({ id })
}
