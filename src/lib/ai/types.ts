import type { SourceTier } from '@/components/reader/types'

/** Message in a chat conversation */
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

/** Config passed to provider adapters */
export interface ModelConfig {
  model: string
  maxTokens?: number
  temperature?: number
}

/** Resolved provider credentials */
export interface ProviderCredentials {
  providerId: string
  apiKey: string
  model: string
  apiBaseUrl?: string
}

/** Result of a connection test */
export interface ConnectionTestResult {
  ok: boolean
  error?: string
}

/** Model info returned by Ollama discovery */
export interface OllamaModelInfo {
  name: string
  size: number
  modified: string
}

/** SSE event types sent during streaming */
export type StreamEventType = 'token' | 'done' | 'error'

export interface StreamTokenEvent {
  type: 'token'
  content: string
}

export interface StreamDoneEvent {
  type: 'done'
  citations: Citation[]
}

export interface StreamErrorEvent {
  type: 'error'
  message: string
}

export type StreamEvent = StreamTokenEvent | StreamDoneEvent | StreamErrorEvent

/** A citation extracted from an AI response */
export interface Citation {
  text: string
  tier: SourceTier
  type: 'verse' | 'character' | 'theme' | 'strongs'
  link: string
  startIndex: number
  endIndex: number
}

/** A named section of grounding context */
export interface ContextSection {
  id: string                // e.g. 'chapter-text', 'narrative', 'strongs', 'collections'
  label: string             // Human-readable: "Chapter Text", "Strong's Hebrew/Greek"
  content: string           // The actual grounding text
  estimatedTokens: number   // Math.ceil(content.length / 4)
  defaultEnabled: boolean   // Whether this section is on by default
}

/** Map of section IDs to enabled/disabled state */
export type ContextToggles = Record<string, boolean>

/** Grounding request sent from client to /api/ai/send */
export interface GroundingRequest {
  page: 'reader' | 'character' | 'theme' | 'word-study' | 'study-builder'
  context: ReaderContext | CharacterContext | ThemeContext | WordStudyContext | StudyBuilderContext
  query: string
}

export interface ReaderContext {
  bookId: string
  chapter: number
  verse?: number
  translationId?: string
}

export interface CharacterContext {
  characterId: string
}

export interface ThemeContext {
  themeId: string
}

export interface WordStudyContext {
  strongsNumber: string
}

export interface StudyBuilderContext {
  projectId: number
}

/** Request body for POST /api/ai/send */
export interface AiSendRequest {
  messages: ChatMessage[]
  grounding: GroundingRequest
  conversationId?: string
  contextToggles?: ContextToggles  // <-- add this
}
