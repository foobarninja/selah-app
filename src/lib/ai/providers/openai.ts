import OpenAI from 'openai'
import type { AiProviderAdapter, StreamFinish } from './base'
import type { ChatMessage, ModelConfig, ConnectionTestResult } from '../types'
import { normalizeOpenAIFinish } from '../truncation'

export class OpenAIAdapter implements AiProviderAdapter {
  readonly id = 'openai'
  private client: OpenAI

  constructor(apiKey: string, private model: string, baseURL?: string, private disableThinking = false) {
    this.client = new OpenAI({
      apiKey: apiKey || 'not-needed',
      ...(baseURL ? { baseURL } : {}),
    })
  }

  async *stream(messages: ChatMessage[], config: ModelConfig): AsyncGenerator<string, StreamFinish> {
    const openaiMessages = messages.map((m) => ({
      role: m.role as 'system' | 'user' | 'assistant',
      content: m.content,
    }))

    // Local reasoning models (Gemma/Qwen via llama.cpp, vLLM, Unsloth Studio)
    // emit chain-of-thought inline as <think>…</think>, which eats the token
    // budget and truncates the real answer. `chat_template_kwargs.enable_thinking`
    // is the de-facto switch those servers honor to suppress it. It isn't in the
    // OpenAI SDK's typed params, so it rides along as an extra body field.
    const params = {
      model: config.model || this.model,
      max_tokens: config.maxTokens || 2400,
      ...(config.temperature !== undefined ? { temperature: config.temperature } : {}),
      ...(config.topP !== undefined ? { top_p: config.topP } : {}),
      ...(config.frequencyPenalty !== undefined ? { frequency_penalty: config.frequencyPenalty } : {}),
      ...(config.presencePenalty !== undefined ? { presence_penalty: config.presencePenalty } : {}),
      messages: openaiMessages,
      stream: true as const,
      ...(this.disableThinking ? { chat_template_kwargs: { enable_thinking: false } } : {}),
    }

    const stream = await this.client.chat.completions.create(
      params as unknown as Parameters<typeof this.client.chat.completions.create>[0] & { stream: true }
    )

    // Track the last finish_reason seen. If the upstream stream is severed
    // mid-generation it never arrives, leaving this null → reported as a drop.
    let rawFinish: string | null = null
    for await (const chunk of stream) {
      const choice = chunk.choices[0]
      const text = choice?.delta?.content
      if (text) yield text
      if (choice?.finish_reason) rawFinish = choice.finish_reason
    }
    return { finishReason: normalizeOpenAIFinish(rawFinish) }
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
