// src/app/api/ai/companion/stream/route.ts
//
// POST /api/ai/companion/stream
// Body: {
//   devotionalId: string
//   userMessage: string
//   conversationId?: number   // if present, append; if missing, reuse
//                             // the active thread; if no active thread
//                             // exists, create one.
//   startNew?: boolean        // force a new thread (the "Start a new
//                             // conversation" button)
// }
//
// Response: SSE stream of `data: {type: 'token'|'done'|'error', ...}\n\n`
// frames. Matches /api/ai/send's on-wire shape so the existing
// useChatStream hook can consume it unchanged.

import { NextRequest } from 'next/server'
import { getProvider } from '@/lib/ai/provider-factory'
import { getSetting } from '@/lib/settings/queries'
import { buildCompanionGrounding } from '@/lib/ai/companion/grounding'
import { buildCompanionSystemPrompt } from '@/lib/ai/companion/system-prompt'
import {
  createThread,
  findActiveThread,
  appendMessage,
  getThreadMessages,
} from '@/lib/ai/companion/thread-store'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'
import type { ModelConfig } from '@/lib/ai/types'

const MAX_HISTORY_MESSAGES = 20

export const dynamic = 'force-dynamic'

interface Body {
  devotionalId: string
  userMessage: string
  conversationId?: number
  startNew?: boolean
}

function encodeSSE(event: object): string {
  return `data: ${JSON.stringify(event)}\n\n`
}

export async function POST(request: NextRequest) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return jsonError('no active profile', 401)
  }

  const body = (await request.json()) as Body
  if (!body.devotionalId || !body.userMessage) {
    return jsonError('devotionalId and userMessage required', 400)
  }

  const provider = await getProvider()
  if (!provider) {
    return jsonError('AI not configured', 503)
  }

  const devotional = await loadDevotional(body.devotionalId)
  if (!devotional) return jsonError('devotional not found', 404)

  // Resolve / create the conversation.
  let conversationId: number
  if (body.startNew) {
    const t = await createThread({ devotionalId: body.devotionalId, title: devotional.title, userId })
    conversationId = t.id
  } else if (body.conversationId != null) {
    conversationId = body.conversationId
  } else {
    const active = await findActiveThread(body.devotionalId, userId)
    if (active) {
      conversationId = active.id
    } else {
      const t = await createThread({ devotionalId: body.devotionalId, title: devotional.title, userId })
      conversationId = t.id
    }
  }

  await appendMessage(conversationId, { role: 'user', content: body.userMessage, userId })

  const grounding = buildCompanionGrounding(devotional)
  const systemPrompt = buildCompanionSystemPrompt(grounding)
  const history = await getThreadMessages(conversationId, userId)
  const recentHistory = history.slice(-MAX_HISTORY_MESSAGES)

  // Build ModelConfig matching per-provider settings — same pattern as /api/ai/send.
  const providerSetting = await getSetting('ai_provider')
  let modelConfig: ModelConfig = { model: '', maxTokens: 2400 }
  if (providerSetting === 'openrouter') {
    modelConfig = {
      model: '',
      maxTokens: parseInt((await getSetting('openrouter_max_tokens')) ?? '2400', 10),
      temperature: parseFloat((await getSetting('openrouter_temperature')) ?? '0.7'),
      topP: parseFloat((await getSetting('openrouter_top_p')) ?? '0.85'),
      frequencyPenalty: parseFloat((await getSetting('openrouter_freq_penalty')) ?? '0.3'),
      presencePenalty: parseFloat((await getSetting('openrouter_pres_penalty')) ?? '0.3'),
    }
  } else if (providerSetting === 'ollama') {
    modelConfig = {
      model: '',
      maxTokens: parseInt((await getSetting('ollama_max_tokens')) ?? '2400', 10),
      temperature: parseFloat((await getSetting('ollama_temperature')) ?? '0.5'),
      topP: parseFloat((await getSetting('ollama_top_p')) ?? '0.85'),
      frequencyPenalty: parseFloat((await getSetting('ollama_freq_penalty')) ?? '0.6'),
      presencePenalty: parseFloat((await getSetting('ollama_pres_penalty')) ?? '0.5'),
    }
  } else if (providerSetting === 'custom') {
    modelConfig = {
      model: '',
      maxTokens: 2400,
      temperature: 0.7,
      topP: 0.85,
      frequencyPenalty: 0.3,
      presencePenalty: 0.3,
    }
  }

  // Capture provider + model for message persistence.
  const providerId = providerSetting ?? undefined
  const modelId = (await getSetting('ai_model')) ?? undefined

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const emit = (evt: object) => controller.enqueue(encoder.encode(encodeSSE(evt)))
      let assistantText = ''
      try {
        const chatMessages = [
          { role: 'system' as const, content: systemPrompt },
          ...recentHistory.map((m) => ({ role: m.role as 'user' | 'assistant' | 'system', content: m.content })),
        ]
        for await (const token of provider.stream(chatMessages, modelConfig)) {
          assistantText += token
          emit({ type: 'token', content: token })
        }
        await appendMessage(conversationId, {
          role: 'assistant',
          content: assistantText,
          providerId,
          modelId,
          userId,
        })
        emit({ type: 'done', citations: [], conversationId })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'stream failed'
        emit({ type: 'error', message })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}

async function loadDevotional(devotionalId: string) {
  const { getDevotionalById } = await import('@/lib/daily-bread/queries')
  return getDevotionalById(devotionalId)
}

function jsonError(msg: string, status: number) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
