import OpenAI from 'openai'
import type { AiProviderAdapter } from './base'
import type { ChatMessage, ModelConfig, ConnectionTestResult } from '../types'

export class OpenAIAdapter implements AiProviderAdapter {
  readonly id = 'openai'
  private client: OpenAI

  constructor(apiKey: string, private model: string, baseURL?: string) {
    this.client = new OpenAI({
      apiKey: apiKey || 'not-needed',
      ...(baseURL ? { baseURL } : {}),
    })
  }

  async *stream(messages: ChatMessage[], config: ModelConfig): AsyncIterable<string> {
    const openaiMessages = messages.map((m) => ({
      role: m.role as 'system' | 'user' | 'assistant',
      content: m.content,
    }))

    const stream = await this.client.chat.completions.create({
      model: config.model || this.model,
      max_tokens: config.maxTokens || 2048,
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
}
