// src/app/api/ai/companion/thread/route.ts
//
// GET /api/ai/companion/thread?devotionalId=X
//   → { active: CompanionThreadDetail | null, past: CompanionThreadSummary[] }
//
// "Active" is the most-recent thread (by updatedAt) with its messages
// inlined. "Past" is everything else for this devotional, newest first,
// without messages — the UI expands each on demand via a second GET
// using the thread id.

import { NextRequest, NextResponse } from 'next/server'
import { listThreads, getThreadMessages } from '@/lib/ai/companion/thread-store'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'
import type { CompanionThreadDetail, CompanionThreadSummary } from '@/lib/ai/companion/types'

export async function GET(request: NextRequest) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const devotionalId = request.nextUrl.searchParams.get('devotionalId')
  if (!devotionalId) {
    return NextResponse.json({ error: 'devotionalId required' }, { status: 400 })
  }

  const threads = await listThreads(devotionalId, userId)
  if (threads.length === 0) {
    return NextResponse.json({ active: null, past: [] })
  }

  const [activeSummary, ...pastSummaries] = threads
  const activeMessages = await getThreadMessages(activeSummary.id, userId)
  const active: CompanionThreadDetail = { ...activeSummary, messages: activeMessages }
  const past: CompanionThreadSummary[] = pastSummaries
  return NextResponse.json({ active, past })
}
