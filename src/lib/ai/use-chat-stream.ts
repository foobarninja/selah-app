import { useCallback, useRef } from 'react'
import type { StreamEvent, Citation, GroundingRequest, ChatMessage, ContextToggles } from './types'

interface UseChatStreamOptions {
  onToken: (content: string) => void
  onDone: (citations: Citation[]) => void
  onError: (message: string) => void
}

export function useChatStream({ onToken, onDone, onError }: UseChatStreamOptions) {
  const abortRef = useRef<AbortController | null>(null)

  const send = useCallback(
    async (messages: ChatMessage[], grounding: GroundingRequest, conversationId?: string, contextToggles?: ContextToggles) => {
      // Abort any in-flight request
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      try {
        const response = await fetch('/api/ai/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages, grounding, conversationId, contextToggles }),
          signal: controller.signal,
        })

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({ error: 'Request failed' }))
          onError(errBody.error || `HTTP ${response.status}`)
          return
        }

        const reader = response.body?.getReader()
        if (!reader) {
          onError('No response stream')
          return
        }

        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            const dataLine = line.replace(/^data: /, '').trim()
            if (!dataLine) continue

            try {
              const event: StreamEvent = JSON.parse(dataLine)
              switch (event.type) {
                case 'token':
                  onToken(event.content)
                  break
                case 'done':
                  onDone(event.citations)
                  break
                case 'error':
                  onError(event.message)
                  break
              }
            } catch {
              // skip malformed events
            }
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return
        onError(err instanceof Error ? err.message : 'Connection failed')
      }
    },
    [onToken, onDone, onError]
  )

  const abort = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  return { send, abort }
}
