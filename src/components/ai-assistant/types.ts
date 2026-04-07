// AI Assistant section — TypeScript interfaces

import type { SourceTier } from '@/components/reader/types'
import type { NoteType, Anchor } from '@/components/journal/types'
import type { ContextToggles, GroundingRequest } from '@/lib/ai/types'

/** Message sender */
export type MessageRole = 'user' | 'assistant'

/** Grounding context type */
export type GroundingType = 'passage' | 'character' | 'theme' | 'general'

// ── Data interfaces ──

export interface GroundingContext {
  type: GroundingType
  passageRef?: string
  passageTitle?: string
  characters?: string[]
  themes?: string[]
  characterName?: string
  themeName?: string
}

export interface Message { id: string; role: MessageRole; content: string; sourceTier?: SourceTier; timestamp: string }
export interface ConversationThread { id: string; groundingLabel: string; messageCount: number; date: string }
export interface SaveToJournalDraft { content: string; noteType: NoteType; anchors: Anchor[]; userTags: string[] }

// ── Component props ──

export interface AIAssistantProps {
  groundingContext: GroundingContext
  messages: Message[]
  conversationHistory: ConversationThread[]
  isConfigured: boolean
  isPanelOpen: boolean
  isStreaming?: boolean

  onSendMessage?: (content: string) => void
  onClose?: () => void
  onTogglePanel?: () => void
  onSaveToJournal?: (messageId: string, noteType: NoteType, content: string, anchors: Anchor[], tags: string[]) => void
  onOpenThread?: (threadId: string) => void
  onNewConversation?: () => void
  onSaveConversation?: () => void

  contextToggles?: ContextToggles
  grounding?: GroundingRequest
  onContextToggle?: (sectionId: string, enabled: boolean) => void
}
