import type { AiProviderAdapter, StreamFinish } from './base'
import type { ChatMessage, ModelConfig, ConnectionTestResult, OllamaModelInfo } from '../types'
import { normalizeOllamaFinish } from '../truncation'

export class OllamaAdapter implements AiProviderAdapter {
  readonly id = 'ollama'

  constructor(private baseUrl: string, private model: string, private disableThinking = false) {}

  async *stream(messages: ChatMessage[], config: ModelConfig): AsyncGenerator<string, StreamFinish> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.model || this.model,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        stream: true,
        ...(this.disableThinking ? { think: false } : {}),
        options: {
          ...(config.temperature !== undefined ? { temperature: config.temperature } : {}),
          ...(config.topP !== undefined ? { top_p: config.topP } : {}),
          ...(config.maxTokens !== undefined ? { num_predict: config.maxTokens } : {}),
          ...(config.frequencyPenalty !== undefined ? { frequency_penalty: config.frequencyPenalty } : {}),
          ...(config.presencePenalty !== undefined ? { presence_penalty: config.presencePenalty } : {}),
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status} ${response.statusText}`)
    }

    const reader = response.body?.getReader()
    if (!reader) throw new Error('No response body from Ollama')

    const decoder = new TextDecoder()
    let buffer = ''
    let rawFinish: string | null = null

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
          // Ollama's terminal line carries done=true and a done_reason
          // ('stop' | 'length'). Absent on a severed stream → stays null.
          if (json.done && json.done_reason) {
            rawFinish = json.done_reason
          }
        } catch {
          // skip malformed lines
        }
      }
    }
    return { finishReason: normalizeOllamaFinish(rawFinish) }
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
