import OpenAI from 'openai'
import type { AiProviderAdapter } from './base'
import type { ChatMessage, ModelConfig, ConnectionTestResult, OpenRouterModelInfo } from '../types'

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

export class OpenRouterAdapter implements AiProviderAdapter {
  readonly id = 'openrouter'
  private client: OpenAI

  constructor(private apiKey: string, private model: string) {
    this.client = new OpenAI({
      apiKey,
      baseURL: OPENROUTER_BASE_URL,
      defaultHeaders: {
        'HTTP-Referer': 'https://selah.app',
        'X-Title': 'Selah Bible Study',
      },
    })
  }

  async *stream(messages: ChatMessage[], config: ModelConfig): AsyncIterable<string> {
    const openaiMessages = messages.map((m) => ({
      role: m.role as 'system' | 'user' | 'assistant',
      content: m.content,
    }))

    const stream = await this.client.chat.completions.create({
      model: config.model || this.model,
      max_tokens: config.maxTokens || 1500,
      temperature: config.temperature ?? 0.3,
      top_p: config.topP ?? 0.85,
      frequency_penalty: config.frequencyPenalty ?? 0,
      presence_penalty: config.presencePenalty ?? 0,
      messages: openaiMessages,
      stream: true,
    })

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content
      if (text) yield text
    }
  }

  async testConnection(): Promise<ConnectionTestResult> {
    try {
      await this.client.chat.completions.create({
        model: this.model,
        max_tokens: 1,
        messages: [{ role: 'user', content: 'hi' }],
      })
      return { ok: true }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      return { ok: false, error: message }
    }
  }

  /** Fetch available models from OpenRouter */
  async listOpenRouterModels(): Promise<OpenRouterModelInfo[]> {
    const res = await fetch('https://openrouter.ai/api/v1/models', {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    })
    if (!res.ok) throw new Error(`OpenRouter API error: ${res.status}`)
    const data = await res.json()
    return (data.data ?? [])
      .filter((m: { pricing?: { prompt?: string; completion?: string } }) =>
        m.pricing?.prompt && m.pricing?.completion
      )
      .map((m: { id: string; name: string; context_length: number; pricing: { prompt: string; completion: string } }) => ({
        id: m.id,
        name: m.name,
        contextLength: m.context_length,
        promptCost: m.pricing.prompt,
        completionCost: m.pricing.completion,
      }))
      .sort((a: OpenRouterModelInfo, b: OpenRouterModelInfo) => a.name.localeCompare(b.name))
  }
}
