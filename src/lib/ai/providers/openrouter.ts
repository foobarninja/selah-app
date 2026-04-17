import OpenAI from 'openai'
import type { AiProviderAdapter } from './base'
import type { ChatMessage, ModelConfig, ConnectionTestResult, OpenRouterModelInfo } from '../types'

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

export class OpenRouterAdapter implements AiProviderAdapter {
  readonly id = 'openrouter'
  private client: OpenAI

  constructor(
    private apiKey: string,
    private model: string,
    private disableThinking = false,
  ) {
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

    const modelId = config.model || this.model
    const isAnthropic = /^anthropic\//i.test(modelId)

    // OpenRouter accepts a `reasoning` object that isn't in the OpenAI SDK's
    // typed params. Cast through `unknown` to pass it as an extra body field.
    // `effort: "none"` fully disables reasoning for supported models (DeepSeek
    // V3.1/R1, Qwen3 thinking variants, Claude 3.7+, GPT-5, etc.).
    //
    // Anthropic models error on non-default sampling parameters (temperature,
    // top_p, top_k, frequency_penalty, presence_penalty) as of Claude 4.5/4.6.
    // When routing through an Anthropic model, omit them entirely.
    const params = {
      model: modelId,
      max_tokens: config.maxTokens || 1500,
      ...(isAnthropic ? {} : {
        temperature: config.temperature ?? 0.3,
        top_p: config.topP ?? 0.85,
        frequency_penalty: config.frequencyPenalty ?? 0,
        presence_penalty: config.presencePenalty ?? 0,
      }),
      messages: openaiMessages,
      stream: true as const,
      ...(this.disableThinking ? { reasoning: { effort: 'none' } } : {}),
    }

    const stream = await this.client.chat.completions.create(
      params as unknown as Parameters<typeof this.client.chat.completions.create>[0] & { stream: true }
    )

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta as
        | { content?: string | null; reasoning_content?: string | null; reasoning?: string | null }
        | undefined
      if (!delta) continue

      // DeepSeek V3.1/R1 on OpenRouter emits answer tokens in `delta.content` but
      // can also route partial content through `delta.reasoning_content` (or `delta.reasoning`).
      // The OpenAI SDK's types don't know about those fields, so reading only `content`
      // silently drops whatever landed in the reasoning channel. We concatenate all
      // three fields in the order they would be emitted to preserve the full response.
      const reasoning = delta.reasoning_content ?? delta.reasoning ?? ''
      const content = delta.content ?? ''
      const combined = reasoning + content
      if (combined) yield combined
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
