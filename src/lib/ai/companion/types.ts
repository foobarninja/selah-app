// src/lib/ai/companion/types.ts
//
// Shapes shared between the companion API routes and the CompanionChat
// client component.

import type { Devotional } from '@/components/daily-bread/types'

export interface CompanionGrounding {
  devotionalId: string
  title: string
  passageRef: string
  passageText: string
  audienceLevel: Devotional['audienceLevel']
  contextBrief: string
  modernMoment: string
  goingDeeperPrompt: string
}

export interface CompanionMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

export interface CompanionThreadSummary {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  messageCount: number
}

export interface CompanionThreadDetail extends CompanionThreadSummary {
  messages: CompanionMessage[]
}
