import type { AiProviderAdapter } from './base'
import type { ChatMessage, ModelConfig, ConnectionTestResult, OllamaModelInfo } from '../types'

export class OllamaAdapter implements AiProviderAdapter {
  readonly id = 'ollama'

  constructor(private baseUrl: string, private model: string, private disableThinking = false) {}

  async *stream(messages: ChatMessage[], config: ModelConfig): AsyncIterable<string> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.model || this.model,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        stream: true,
        ...(this.disableThinking ? { think: false } : {}),
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status} ${response.statusText}`)
    }

    const reader = response.body?.getReader()
    if (!reader) throw new Error('No response body from Ollama')

    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (!line.trim()) continue
        try {
          const json = JSON.parse(line)
          if (json.message?.content) {
            yield json.message.content
          }
        } catch {
          // skip malformed lines
        }
      }
    }
  }

  async testConnection(): Promise<ConnectionTestResult> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, { signal: AbortSignal.timeout(5000) })
      if (!response.ok) {
        return { ok: false, error: `Ollama returned ${response.status}` }
      }
      return { ok: true }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Connection failed'
      return { ok: false, error: `Ollama unreachable at ${this.baseUrl}. Is it running? (${message})` }
    }
  }

  async listModels(): Promise<OllamaModelInfo[]> {
    const response = await fetch(`${this.baseUrl}/api/tags`, { signal: AbortSignal.timeout(5000) })
    if (!response.ok) throw new Error(`Ollama returned ${response.status}`)
    const data = await response.json()
    return (data.models || []).map((m: { name: string; size: number; modified_at: string }) => ({
      name: m.name,
      size: m.size,
      modified: m.modified_at,
    }))
  }
}
