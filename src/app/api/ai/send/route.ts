import { NextRequest } from 'next/server'
import { getProvider } from '@/lib/ai/provider-factory'
import { buildGroundingContext } from '@/lib/ai/grounding/context-builder'
import { buildSystemPrompt } from '@/lib/ai/grounding/system-prompt'
import { extractCitations } from '@/lib/ai/post-processing/citation-extractor'
import type { AiSendRequest, ChatMessage, StreamEvent } from '@/lib/ai/types'

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

  const provider = await getProvider()
  if (!provider) {
    return new Response(JSON.stringify({ error: 'No AI provider configured' }), { status: 400 })
  }

  // Build grounding context and system prompt
  let systemPrompt: string
  try {
    const { assembled: groundingContext } = await buildGroundingContext(grounding, body.contextToggles)
    console.log(`[ai/send] grounding context: ${groundingContext.length} chars (~${Math.round(groundingContext.length / 3.5)} tokens)`)
    systemPrompt = await buildSystemPrompt(groundingContext)
    console.log(`[ai/send] system prompt: ${systemPrompt.length} chars (~${Math.round(systemPrompt.length / 3.5)} tokens)`)
  } catch (err) {
    console.error('[ai/send] grounding failed, using empty fallback:', err)
    // Fallback: general prompt without grounding
    systemPrompt = await buildSystemPrompt('')
  }

  // Assemble messages with system prompt, truncate history
  const truncatedHistory = messages.slice(-MAX_HISTORY_MESSAGES)
  const fullMessages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...truncatedHistory,
  ]
  const totalChars = fullMessages.reduce((sum, m) => sum + m.content.length, 0)
  console.log(`[ai/send] sending ${fullMessages.length} messages, ${totalChars} chars (~${Math.round(totalChars / 3.5)} tokens)`)

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      let fullResponse = ''
      const timeout = setTimeout(() => {
        controller.enqueue(encoder.encode(encodeSSE({ type: 'error', message: 'Response timed out after 30 seconds.' })))
        controller.close()
      }, STREAM_TIMEOUT_MS)

      try {
        const config = { model: '', maxTokens: 2048 }

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
