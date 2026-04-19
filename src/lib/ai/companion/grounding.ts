// src/lib/ai/companion/grounding.ts
import type { Devotional } from '@/components/daily-bread/types'
import type { CompanionGrounding } from './types'

export function buildCompanionGrounding(devotional: Devotional): CompanionGrounding {
  return {
    devotionalId: devotional.id,
    title: devotional.title,
    passageRef: devotional.passageRef,
    passageText: devotional.passage,
    audienceLevel: devotional.audienceLevel,
    contextBrief: devotional.contextBrief,
    modernMoment: devotional.modernMoment,
    goingDeeperPrompt: devotional.goingDeeper.prompt,
  }
}
