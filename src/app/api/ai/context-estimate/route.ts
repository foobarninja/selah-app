import { NextRequest, NextResponse } from 'next/server'
import { buildGroundingContext } from '@/lib/ai/grounding/context-builder'
import { getSetting } from '@/lib/settings/queries'
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

  // Include cost estimate for OpenRouter
  let costEstimate: { promptCostPerToken: number; completionCostPerToken: number } | null = null
  const provider = await getSetting('ai_provider')
  if (provider === 'openrouter') {
    const promptCost = await getSetting('openrouter_prompt_cost')
    const completionCost = await getSetting('openrouter_completion_cost')
    if (promptCost && completionCost) {
      costEstimate = {
        promptCostPerToken: parseFloat(promptCost),
        completionCostPerToken: parseFloat(completionCost),
      }
    }
  }

  return NextResponse.json({ sections: estimate, totalTokens, costEstimate })
}
