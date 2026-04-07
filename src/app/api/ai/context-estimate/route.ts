import { NextRequest, NextResponse } from 'next/server'
import { buildGroundingContext } from '@/lib/ai/grounding/context-builder'
import type { GroundingRequest } from '@/lib/ai/types'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const grounding: GroundingRequest = await request.json()
  const { sections } = await buildGroundingContext(grounding)

  const estimate = sections.map((s) => ({
    id: s.id,
    label: s.label,
    estimatedTokens: s.estimatedTokens,
    defaultEnabled: s.defaultEnabled,
  }))

  const totalTokens = sections
    .filter((s) => s.defaultEnabled)
    .reduce((sum, s) => sum + s.estimatedTokens, 0)

  return NextResponse.json({ sections: estimate, totalTokens })
}
