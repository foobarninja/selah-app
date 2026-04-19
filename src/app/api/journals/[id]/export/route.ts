import { NextResponse } from 'next/server'
import { getJournalDetail, getJournalEntries } from '@/lib/journal/queries'
import { generateJournalDocx } from '@/components/journal/JournalExport'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { id } = await params
  const journal = await getJournalDetail(userId, id)
  if (!journal) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const entries = await getJournalEntries(userId, { journalId: id, limit: 500 })
  const buffer = await generateJournalDocx(journal.name, journal.description, entries)

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${journal.name.replace(/[^a-zA-Z0-9 ]/g, '')}.docx"`,
    },
  })
}
