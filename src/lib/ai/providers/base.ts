import type { ChatMessage, ModelConfig, ConnectionTestResult, OllamaModelInfo } from '../types'
import type { FinishReason } from '../truncation'

/** Terminal info returned by a completed `stream()` generator. */
export interface StreamFinish {
  finishReason: FinishReason
}

/**
 * Unified interface for all LLM providers.
 * Each adapter normalizes its SDK's streaming into an async generator that
 * yields text chunks and *returns* a normalized finish reason on completion.
 */
export interface AiProviderAdapter {
  readonly id: string

  /**
   * Stream a chat completion, yielding text chunks. The generator's return
   * value carries the normalized finish reason so callers can detect
   * truncation. Adapters that cannot report a reason may return `void`.
   */
  stream(messages: ChatMessage[], config: ModelConfig): AsyncGenerator<string, StreamFinish | void>

  /** Test whether the provider is reachable and the API key is valid */
  testConnection(): Promise<ConnectionTestResult>

  /** Optional: discover available models (used by Ollama) */
  listModels?(): Promise<OllamaModelInfo[]>
}
