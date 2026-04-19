'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, RotateCcw, ChevronDown, ChevronRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CompanionOpener } from './CompanionOpener'
import type { Devotional } from './types'
import type { CompanionMessage, CompanionThreadDetail, CompanionThreadSummary } from '@/lib/ai/companion/types'

const font = {
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

const SESSION_GAP_MS = 6 * 60 * 60 * 1000 // 6 hours — new-visit divider threshold

interface CompanionChatProps {
  devotional: Devotional
  isAIConfigured: boolean
}

export function CompanionChat({ devotional, isAIConfigured }: CompanionChatProps) {
  const [messages, setMessages] = useState<CompanionMessage[]>([])
  const [past, setPast] = useState<CompanionThreadSummary[]>([])
  const [conversationId, setConversationId] = useState<number | null>(null)
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPast, setShowPast] = useState(false)
  const [pendingNewThread, setPendingNewThread] = useState(false)
  const streamingRef = useRef('')
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!isAIConfigured) return
    let cancelled = false
    fetch(`/api/ai/companion/thread?devotionalId=${encodeURIComponent(devotional.id)}`)
      .then((r) => r.json())
      .then((data: { active: CompanionThreadDetail | null; past: CompanionThreadSummary[] }) => {
        if (cancelled) return
        if (data.active) {
          setConversationId(data.active.id)
          setMessages(data.active.messages)
        }
        setPast(data.past)
      })
      .catch(() => { /* fail-open: render opener only */ })
    return () => {
      cancelled = true
      abortRef.current?.abort()
    }
  }, [devotional.id, isAIConfigured])

  const send = async () => {
    const startNew = pendingNewThread
    setPendingNewThread(false)
    const text = input.trim()
    if (!text || isStreaming) return
    setError(null)
    setInput('')
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    const userMsg: CompanionMessage = {
      id: -Date.now(),
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    }
    const placeholderId = -Date.now() - 1
    const placeholder: CompanionMessage = {
      id: placeholderId,
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
    }
    setMessages((m) => [...(startNew ? [] : m), userMsg, placeholder])
    streamingRef.current = ''
    setIsStreaming(true)

    try {
      const res = await fetch('/api/ai/companion/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          devotionalId: devotional.id,
          userMessage: text,
          conversationId: startNew ? undefined : conversationId ?? undefined,
          startNew,
        }),
        signal: controller.signal,
      })
      if (!res.ok || !res.body) {
        const msg = (await res.json().catch(() => ({ error: `HTTP ${res.status}` }))).error
        throw new Error(msg)
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const frames = buffer.split('\n\n')
        buffer = frames.pop() || ''
        for (const frame of frames) {
          const data = frame.replace(/^data: /, '').trim()
          if (!data) continue
          let evt: { type: string; content?: string; message?: string; conversationId?: number }
          try {
            evt = JSON.parse(data)
          } catch {
            // malformed JSON frame — skip
            continue
          }
          if (evt.type === 'token' && evt.content) {
            streamingRef.current += evt.content
            setMessages((m) => m.map((msg) => (msg.id === placeholderId ? { ...msg, content: streamingRef.current } : msg)))
          } else if (evt.type === 'done') {
            if (evt.conversationId) setConversationId(evt.conversationId)
          } else if (evt.type === 'error' && evt.message) {
            throw new Error(evt.message)
          }
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // unmount or user-triggered cancel — don't show an error bubble
        return
      }
      setError(err instanceof Error ? err.message : 'Something went wrong')
      // Remove the empty placeholder.
      setMessages((m) => m.filter((msg) => msg.id !== placeholderId || msg.content.length > 0))
    } finally {
      setIsStreaming(false)
    }
  }

  const startNewConversation = () => {
    if (isStreaming) return
    setMessages([])
    setConversationId(null)
    setError(null)
    setPendingNewThread(true)
    // Refresh past list so the thread we just left appears there.
    fetch(`/api/ai/companion/thread?devotionalId=${encodeURIComponent(devotional.id)}`)
      .then((r) => r.json())
      .then((d: { active: CompanionThreadDetail | null; past: CompanionThreadSummary[] }) => {
        const combined: CompanionThreadSummary[] = d.active
          ? [
              {
                id: d.active.id,
                title: d.active.title,
                createdAt: d.active.createdAt,
                updatedAt: d.active.updatedAt,
                messageCount: d.active.messages.length,
              },
              ...d.past,
            ]
          : d.past
        setPast(combined)
      })
      .catch(() => {})
  }

  if (!isAIConfigured) {
    return (
      <section style={{ marginTop: '32px', padding: '14px 16px', borderRadius: '12px', backgroundColor: 'var(--selah-bg-elevated, #292524)', border: '1px dashed var(--selah-border-color, #3D3835)' }}>
        <p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-3, #6E695F)' }}>
          Configure an AI provider in{' '}
          <a href="/settings" style={{ color: 'var(--selah-sky-400, #6B91B5)' }}>Settings</a>{' '}
          to enable your companion.
        </p>
      </section>
    )
  }

  return (
    <section style={{ marginTop: '32px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ fontFamily: font.body, fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-text-3, #6E695F)' }}>
          Companion
        </h3>
        {messages.length > 0 && (
          <button
            onClick={startNewConversation}
            disabled={isStreaming}
            aria-label="Start a new conversation"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)', background: 'transparent', border: 'none', cursor: isStreaming ? 'default' : 'pointer' }}
          >
            <RotateCcw size={12} /> Start a new conversation
          </button>
        )}
      </header>

      {messages.length === 0 && <CompanionOpener opener={devotional.companionOpener} />}

      {messages.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
          {messages.map((m, idx) => {
            const prev = idx > 0 ? messages[idx - 1] : null
            const gap = prev ? new Date(m.createdAt).getTime() - new Date(prev.createdAt).getTime() : 0
            const showDivider = prev && gap > SESSION_GAP_MS
            return (
              <div key={m.id}>
                {showDivider && (
                  <div style={{ textAlign: 'center', fontFamily: font.body, fontSize: '10px', color: 'var(--selah-text-3, #6E695F)', margin: '14px 0', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    New visit
                  </div>
                )}
                <MessageBubble message={m} />
              </div>
            )
          })}
        </div>
      )}

      {error && (
        <div role="alert" style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: 'var(--selah-terra-800, #5C2D21)', color: 'var(--selah-terra-200, #E2BBB0)', fontFamily: font.body, fontSize: '12px', marginBottom: '12px' }}>
          {error}
        </div>
      )}

      <form
        onSubmit={(e) => { e.preventDefault(); send() }}
        style={{ display: 'flex', gap: '8px' }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Reflect with your companion, or ask anything about this passage..."
          disabled={isStreaming}
          aria-label="Message your companion"
          style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--selah-border-color, #3D3835)', backgroundColor: 'var(--selah-bg-surface, #1C1917)', color: 'var(--selah-text-1, #E8E2D9)', fontFamily: font.body, fontSize: '14px' }}
        />
        <button
          type="submit"
          disabled={isStreaming || input.trim().length === 0}
          aria-label="Send"
          style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: 'var(--selah-sky-400, #6B91B5)', color: 'white', border: 'none', cursor: isStreaming || input.trim().length === 0 ? 'default' : 'pointer', opacity: isStreaming || input.trim().length === 0 ? 0.5 : 1 }}
        >
          <Send size={16} />
        </button>
      </form>

      {past.length > 0 && (
        <div style={{ marginTop: '18px' }}>
          <button
            onClick={() => setShowPast((s) => !s)}
            aria-expanded={showPast}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            {showPast ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            Past conversations ({past.length})
          </button>
          {showPast && (
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {past.map((t) => (
                <li key={t.id} style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-2, #A29D94)' }}>
                  {new Date(t.updatedAt).toLocaleDateString()} — {t.messageCount} message{t.messageCount === 1 ? '' : 's'}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  )
}

function MessageBubble({ message }: { message: CompanionMessage }) {
  const isUser = message.role === 'user'
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          maxWidth: '85%',
          padding: '10px 14px',
          borderRadius: '14px',
          backgroundColor: isUser ? 'var(--selah-gold-900, #4A3711)' : 'var(--selah-bg-elevated, #292524)',
          color: isUser ? 'var(--selah-gold-300, #E8C767)' : 'var(--selah-text-1, #E8E2D9)',
          fontFamily: font.body,
          fontSize: '14px',
          lineHeight: 1.55,
        }}
      >
        {isUser ? (
          <span style={{ whiteSpace: 'pre-wrap' }}>{message.content}</span>
        ) : message.content ? (
          <div className="selah-md">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>
        ) : (
          <StreamingDots />
        )}
      </div>
    </div>
  )
}

function StreamingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: '3px' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--selah-sky-400, #6B91B5)',
            display: 'inline-block',
            animation: 'selahCompanionPulse 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`@keyframes selahCompanionPulse { 0%,80%,100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }`}</style>
    </span>
  )
}
