import Anthropic from '@anthropic-ai/sdk'
import type { AiProviderAdapter } from './base'
import type { ChatMessage, ModelConfig, ConnectionTestResult } from '../types'

export class AnthropicAdapter implements AiProviderAdapter {
  readonly id = 'anthropic'
  private client: Anthropic

  constructor(apiKey: string, private model: string) {
    this.client = new Anthropic({ apiKey })
  }

  async *stream(messages: ChatMessage[], config: ModelConfig): AsyncIterable<string> {
    const systemMessage = messages.find((m) => m.role === 'system')
    const chatMessages = messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

    const stream = this.client.messages.stream({
      model: config.model || this.model,
      max_tokens: config.maxTokens || 2048,
      system: systemMessage?.content,
      messages: chatMessages,
    })

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        yield event.delta.text
      }
    }
  }

  async testConnection(): Promise<ConnectionTestResult> {
    try {
      await this.client.messages.create({
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
