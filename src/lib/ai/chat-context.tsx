'use client'

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react'
import { useChatStream } from './use-chat-stream'
import type { ChatMessage, Citation, GroundingRequest } from './types'
import type { Message, ConversationThread, GroundingContext } from '@/components/ai-assistant/types'

interface ChatContextValue {
  messages: Message[]
  isStreaming: boolean
  citations: Citation[]
  conversationHistory: ConversationThread[]
  isPanelOpen: boolean
  groundingContext: GroundingContext

  sendMessage: (content: string) => void
  togglePanel: () => void
  closePanel: () => void
  newConversation: () => void
  openThread: (threadId: string) => void
  saveConversation: () => Promise<void>
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function useChatContext() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider')
  return ctx
}

interface ChatProviderProps {
  children: ReactNode
  grounding: GroundingRequest
  groundingDisplay: GroundingContext
  isConfigured: boolean
}

export function ChatProvider({ children, grounding, groundingDisplay, isConfigured }: ChatProviderProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [citations, setCitations] = useState<Citation[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<ConversationThread[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const streamingContentRef = useRef('')

  const { send, abort } = useChatStream({
    onToken: (content) => {
      streamingContentRef.current += content
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        if (last?.role === 'assistant' && last.id === 'streaming') {
          return [...prev.slice(0, -1), { ...last, content: streamingContentRef.current }]
        }
        return prev
      })
    },
    onDone: (newCitations) => {
      setCitations(newCitations)
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        if (last?.id === 'streaming') {
          return [...prev.slice(0, -1), { ...last, id: `msg-${Date.now()}`, sourceTier: 4 as const }]
        }
        return prev
      })
      setIsStreaming(false)
    },
    onError: (errorMessage) => {
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== 'streaming')
        return [...filtered, {
          id: `error-${Date.now()}`,
          role: 'assistant' as const,
          content: errorMessage,
          timestamp: new Date().toLocaleTimeString(),
        }]
      })
      setIsStreaming(false)
    },
  })

  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || isStreaming) return

      const userMsg: Message = {
        id: `msg-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date().toLocaleTimeString(),
      }

      const streamingMsg: Message = {
        id: 'streaming',
        role: 'assistant',
        content: '',
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages((prev) => [...prev, userMsg, streamingMsg])
      setIsStreaming(true)
      setCitations([])
      streamingContentRef.current = ''

      const chatMessages: ChatMessage[] = [
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user' as const, content },
      ]

      const groundingWithQuery: GroundingRequest = {
        ...grounding,
        query: content,
      }

      send(chatMessages, groundingWithQuery, conversationId || undefined)
    },
    [messages, isStreaming, grounding, conversationId, send]
  )

  const newConversation = useCallback(() => {
    abort()
    setMessages([])
    setCitations([])
    setConversationId(null)
    setIsStreaming(false)
  }, [abort])

  const openThread = useCallback(async (threadId: string) => {
    try {
      const res = await fetch(`/api/ai/conversations/${threadId}`)
      if (!res.ok) return
      const data = await res.json()
      setConversationId(threadId)
      setMessages(
        data.messages.map((m: { id: string; role: string; content: string; timestamp: string }) => ({
          id: m.id,
          role: m.role as 'user' | 'assistant',
          content: m.content,
          timestamp: new Date(m.timestamp).toLocaleTimeString(),
          sourceTier: m.role === 'assistant' ? 4 : undefined,
        }))
      )
    } catch {
      // silently fail
    }
  }, [])

  const saveConversation = useCallback(async () => {
    if (messages.length === 0) return
    const res = await fetch('/api/ai/conversations/new/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: messages[0]?.content.slice(0, 60),
        contextRef: groundingDisplay.passageRef || groundingDisplay.characterName || groundingDisplay.themeName || null,
        messages: messages.filter((m) => m.id !== 'streaming').map((m) => ({
          role: m.role,
          content: m.content,
          timestamp: new Date().toISOString(),
        })),
      }),
    })
    if (res.ok) {
      const data = await res.json()
      setConversationId(data.id)
      const historyRes = await fetch('/api/ai/conversations')
      if (historyRes.ok) {
        setConversationHistory(await historyRes.json())
      }
    }
  }, [messages, groundingDisplay])

  const togglePanel = useCallback(() => setIsPanelOpen((prev) => !prev), [])
  const closePanel = useCallback(() => { setIsPanelOpen(false); abort() }, [abort])

  const loadHistory = useCallback(async () => {
    try {
      const res = await fetch('/api/ai/conversations')
      if (res.ok) setConversationHistory(await res.json())
    } catch { /* ignore */ }
  }, [])

  const togglePanelWithHistory = useCallback(() => {
    setIsPanelOpen((prev) => {
      if (!prev) loadHistory()
      return !prev
    })
  }, [loadHistory])

  if (!isConfigured) {
    return <>{children}</>
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        isStreaming,
        citations,
        conversationHistory,
        isPanelOpen,
        groundingContext: groundingDisplay,
        sendMessage,
        togglePanel: togglePanelWithHistory,
        closePanel,
        newConversation,
        openThread,
        saveConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
