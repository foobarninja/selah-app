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
import { scanMessage } from '@/lib/safety/scan'
import { extractSafetyMarker } from '@/lib/safety/marker'
import { getEffectiveAIConfig } from '@/lib/profiles/effective-ai-config'
import { maxFlagLevel } from '@/lib/safety/types'
import { getProfile } from '@/lib/profiles/queries'
import { sanitizeProviderError } from '@/lib/ai/sanitize-error'

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

  const profileForAudit = await getProfile(userId)
  const shouldPersistFlags = !!(
    profileForAudit?.childLock &&
    profileForAudit.auditPolicy &&
    profileForAudit.auditPolicy !== 'none'
  )

  const effective = await getEffectiveAIConfig(userId)
  if (!effective.isConfigured || !effective.provider) {
    return jsonError('AI not configured for this profile', 503)
  }
  // getProvider() currently reads device settings; since the locked provider
  // matches the device provider (isConfigured gate above), getProvider()
  // returns the right client. We only need to override the model name
  // downstream in modelConfig.
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

  const userFlagLevel = shouldPersistFlags ? scanMessage(body.userMessage) : null
  await appendMessage(conversationId, {
    role: 'user',
    content: body.userMessage,
    userId,
    flagLevel: userFlagLevel,
    flagSource: userFlagLevel ? 'keyword' : null,
  })

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

  // Set the model name from the effective config (child-lock aware)
  modelConfig.model = effective.model ?? ''

  // Capture provider + model for message persistence.
  const providerId = providerSetting ?? undefined
  const modelId = effective.model ?? undefined

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
        // UX note: when the model emits a [SAFETY:*] marker, the marker tokens
        // stream to the user briefly before the full response completes. The
        // persisted message strips the marker; the transient display is
        // acceptable for v1. A streaming-time marker strip is phase-2 polish.
        for await (const token of provider.stream(chatMessages, modelConfig)) {
          assistantText += token
          emit({ type: 'token', content: token })
        }
        // Parse the first-line safety marker from the model's response.
        // extractSafetyMarker returns the stripped text (marker removed) + the level.
        // Runs unconditionally so the user never sees a stray marker, regardless of
        // audit policy. Persistence of the level is gated on shouldPersistFlags.
        const { level: markerLevel, stripped: assistantVisible } = extractSafetyMarker(assistantText)

        // Combine: upgrade the assistant message's flag level if the user's message
        // keyword-matched at a higher severity than the marker indicates. This
        // captures the case where a user writes "I want to die" and the model
        // somehow responds without the marker — the keyword floor still flags
        // the conversation for review.
        let assistantFlag = markerLevel
        let assistantSource: 'keyword' | 'model' | 'both' | null = markerLevel ? 'model' : null
        if (shouldPersistFlags && userFlagLevel) {
          const combined = maxFlagLevel(markerLevel, userFlagLevel)
          if (combined !== markerLevel) {
            assistantFlag = combined
            assistantSource = markerLevel ? 'both' : 'keyword'
          } else if (markerLevel && userFlagLevel === markerLevel) {
            assistantSource = 'both'
          }
        }

        await appendMessage(conversationId, {
          role: 'assistant',
          content: assistantVisible,
          providerId,
          modelId,
          userId,
          flagLevel: shouldPersistFlags ? assistantFlag : null,
          flagSource: shouldPersistFlags ? assistantSource : null,
        })
        emit({ type: 'done', citations: [], conversationId })
      } catch (err) {
        console.error('[ai/companion/stream] provider error:', err instanceof Error ? err.message : err)
        emit({ type: 'error', message: sanitizeProviderError(err) })
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
