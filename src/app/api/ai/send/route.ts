import { NextRequest } from 'next/server'
import { getProvider } from '@/lib/ai/provider-factory'
import { getSetting } from '@/lib/settings/queries'
import { buildGroundingContext } from '@/lib/ai/grounding/context-builder'
import { buildSystemPrompt } from '@/lib/ai/grounding/system-prompt'
import { extractCitations } from '@/lib/ai/post-processing/citation-extractor'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'
import type { AiSendRequest, ChatMessage, ModelConfig, StreamEvent } from '@/lib/ai/types'

const MAX_HISTORY_MESSAGES = 20
const STREAM_TIMEOUT_MS = 300000 // 5 minutes — local models can be slow

function encodeSSE(event: StreamEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`
}

export async function POST(request: NextRequest) {
  let body: AiSendRequest
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 })
  }

  const { messages, grounding } = body
  if (!messages?.length || !grounding) {
    return new Response(JSON.stringify({ error: 'Missing messages or grounding' }), { status: 400 })
  }

  const userId = await requireActiveProfileId()

  const provider = await getProvider()
  if (!provider) {
    return new Response(JSON.stringify({ error: 'No AI provider configured' }), { status: 400 })
  }

  // Build grounding context and system prompt
  let systemPrompt: string
  try {
    const { assembled: groundingContext } = await buildGroundingContext(grounding, userId, body.contextToggles)
    systemPrompt = await buildSystemPrompt(groundingContext, userId)
  } catch {
    // Fallback: general prompt without grounding
    systemPrompt = await buildSystemPrompt('', userId)
  }

  // Assemble messages with system prompt, truncate history
  const truncatedHistory = messages.slice(-MAX_HISTORY_MESSAGES)
  const fullMessages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...truncatedHistory,
  ]
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      let fullResponse = ''
      const timeout = setTimeout(() => {
        controller.enqueue(encoder.encode(encodeSSE({ type: 'error', message: 'Response timed out after 30 seconds.' })))
        controller.close()
      }, STREAM_TIMEOUT_MS)

      try {
        // Read per-provider model parameters from user settings
        const providerSetting = await getSetting('ai_provider')
        let config: ModelConfig = { model: '', maxTokens: 2400 }
        if (providerSetting === 'openrouter') {
          config = {
            model: '',
            maxTokens: parseInt(await getSetting('openrouter_max_tokens') ?? '2400', 10),
            temperature: parseFloat(await getSetting('openrouter_temperature') ?? '0.7'),
            topP: parseFloat(await getSetting('openrouter_top_p') ?? '0.85'),
            frequencyPenalty: parseFloat(await getSetting('openrouter_freq_penalty') ?? '0.3'),
            presencePenalty: parseFloat(await getSetting('openrouter_pres_penalty') ?? '0.3'),
          }
        } else if (providerSetting === 'ollama') {
          config = {
            model: '',
            maxTokens: parseInt(await getSetting('ollama_max_tokens') ?? '2400', 10),
            temperature: parseFloat(await getSetting('ollama_temperature') ?? '0.5'),
            topP: parseFloat(await getSetting('ollama_top_p') ?? '0.85'),
            frequencyPenalty: parseFloat(await getSetting('ollama_freq_penalty') ?? '0.6'),
            presencePenalty: parseFloat(await getSetting('ollama_pres_penalty') ?? '0.5'),
          }
        } else if (providerSetting === 'custom') {
          config = {
            model: '',
            maxTokens: 2400,
            temperature: 0.7,
            topP: 0.85,
            frequencyPenalty: 0.3,
            presencePenalty: 0.3,
          }
        }

        for await (const chunk of provider.stream(fullMessages, config)) {
          fullResponse += chunk
          controller.enqueue(encoder.encode(encodeSSE({ type: 'token', content: chunk })))
        }

        clearTimeout(timeout)

        // Post-processing: extract citations
        const citations = await extractCitations(fullResponse)
        controller.enqueue(encoder.encode(encodeSSE({ type: 'done', citations })))
      } catch (err: unknown) {
        clearTimeout(timeout)
        const message = err instanceof Error ? err.message : 'Unknown error'

        // Classify errors
        let userMessage = message
        if (message.includes('401') || message.includes('Unauthorized') || message.includes('invalid')) {
          userMessage = 'Invalid API key. Check your settings.'
        } else if (message.includes('429') || message.includes('rate')) {
          userMessage = 'Rate limited. Try again in a moment.'
        } else if (message.includes('context_length') || message.includes('token')) {
          userMessage = 'Message too long. Try a shorter question or start a new conversation.'
        }

        controller.enqueue(encoder.encode(encodeSSE({ type: 'error', message: userMessage })))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
