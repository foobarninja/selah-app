import { GoogleGenerativeAI } from '@google/generative-ai'
import type { AiProviderAdapter } from './base'
import type { ChatMessage, ModelConfig, ConnectionTestResult } from '../types'

export class GoogleAdapter implements AiProviderAdapter {
  readonly id = 'google'
  private genAI: GoogleGenerativeAI

  constructor(apiKey: string, private model: string) {
    this.genAI = new GoogleGenerativeAI(apiKey)
  }

  async *stream(messages: ChatMessage[], config: ModelConfig): AsyncIterable<string> {
    const genModel = this.genAI.getGenerativeModel({
      model: config.model || this.model,
      generationConfig: { maxOutputTokens: config.maxTokens || 2048 },
    })

    const systemMessage = messages.find((m) => m.role === 'system')
    const chatMessages = messages.filter((m) => m.role !== 'system')

    // Convert to Gemini format: alternating user/model roles
    const history = chatMessages.slice(0, -1).map((m) => ({
      role: m.role === 'assistant' ? 'model' as const : 'user' as const,
      parts: [{ text: m.content }],
    }))

    const chat = genModel.startChat({
      history,
      systemInstruction: systemMessage ? { role: 'user' as const, parts: [{ text: systemMessage.content }] } : undefined,
    })

    const lastMessage = chatMessages[chatMessages.length - 1]
    const result = await chat.sendMessageStream(lastMessage.content)

    for await (const chunk of result.stream) {
      const text = chunk.text()
      if (text) yield text
    }
  }

  async testConnection(): Promise<ConnectionTestResult> {
    try {
      const genModel = this.genAI.getGenerativeModel({ model: this.model })
      await genModel.generateContent('hi')
      return { ok: true }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      return { ok: false, error: message }
    }
  }
}
