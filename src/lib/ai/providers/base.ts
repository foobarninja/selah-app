import type { ChatMessage, ModelConfig, ConnectionTestResult, OllamaModelInfo } from '../types'

/**
 * Unified interface for all LLM providers.
 * Each adapter normalizes its SDK's streaming into AsyncIterable<string>.
 */
export interface AiProviderAdapter {
  readonly id: string

  /** Stream a chat completion, yielding text chunks */
  stream(messages: ChatMessage[], config: ModelConfig): AsyncIterable<string>

  /** Test whether the provider is reachable and the API key is valid */
  testConnection(): Promise<ConnectionTestResult>

  /** Optional: discover available models (used by Ollama) */
  listModels?(): Promise<OllamaModelInfo[]>
}
