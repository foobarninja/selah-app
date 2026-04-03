'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Clock, Send, Bookmark, ChevronLeft } from 'lucide-react'
import type { AIAssistantProps, Message, GroundingContext, ConversationThread } from './types'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

function AITierPill({ tier }: { tier: number }) {
  const label = tier === 5 ? 'Conjecture' : 'AI-assisted'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 500, fontFamily: font.body, backgroundColor: 'var(--selah-sky-50, #EEF2F7)', color: 'var(--selah-sky-700, #4A6380)', border: tier === 5 ? '1px dashed var(--selah-warmth-400, #C9A96E)' : 'none' }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--selah-sky-400, #6B91B5)' }} />
      {label}
    </span>
  )
}

function GroundingHeader({ context }: { context: GroundingContext }) {
  if (context.type === 'general') {
    return (<div style={{ padding: '8px 16px', borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}><span style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}>General conversation</span></div>)
  }
  return (
    <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}>
      <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-sky-400, #6B91B5)', marginBottom: '6px' }}>Grounded in</p>
      <div className="flex flex-wrap gap-1.5">
        {context.passageRef && (<span style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-900, #4A3711)', color: 'var(--selah-gold-300, #E8C767)' }}>{context.passageRef}</span>)}
        {context.characters?.map((c) => (<span key={c} style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-terra-800, #5C2D21)', color: 'var(--selah-terra-200, #E2BBB0)' }}>{c}</span>))}
        {context.themes?.map((t) => (<span key={t} style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-teal-800, #1A4539)', color: 'var(--selah-teal-200, #93CBBD)' }}>{t}</span>))}
        {context.characterName && (<span style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-terra-800, #5C2D21)', color: 'var(--selah-terra-200, #E2BBB0)' }}>{context.characterName}</span>)}
        {context.themeName && (<span style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-teal-800, #1A4539)', color: 'var(--selah-teal-200, #93CBBD)' }}>{context.themeName}</span>)}
      </div>
    </div>
  )
}

function MessageBubble({ message, onSave }: { message: Message; onSave?: () => void }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div className="relative rounded-xl" style={{ maxWidth: '85%', padding: '12px 16px', backgroundColor: isUser ? 'var(--selah-gold-900, #4A3711)' : 'var(--selah-bg-surface, #1C1917)', border: isUser ? 'none' : '1px solid var(--selah-border-color, #3D3835)' }}>
        <p style={{ fontFamily: font.body, fontSize: '14px', lineHeight: 1.7, color: isUser ? 'var(--selah-gold-100, #F5E4B8)' : 'var(--selah-text-1, #E8E2D9)', whiteSpace: 'pre-wrap' }}>{message.content}</p>
        {!isUser && (
          <div className="flex items-center justify-between mt-2">
            {message.sourceTier && <AITierPill tier={message.sourceTier} />}
            {onSave && (<button onClick={onSave} title="Save to journal" className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ color: 'var(--selah-sky-400, #6B91B5)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}><Bookmark size={14} strokeWidth={1.5} /></button>)}
          </div>
        )}
        <p style={{ fontFamily: font.body, fontSize: '10px', color: isUser ? 'var(--selah-gold-500, #C6A23C)' : 'var(--selah-text-3, #6E695F)', marginTop: '4px', textAlign: isUser ? 'right' : 'left' }}>{message.timestamp}</p>
      </div>
    </div>
  )
}

function HistoryList({ threads, onOpen, onBack }: { threads: ConversationThread[]; onOpen?: (id: string) => void; onBack: () => void }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 shrink-0" style={{ padding: '12px 16px', borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}>
        <button onClick={onBack} style={{ color: 'var(--selah-text-3)', background: 'none', border: 'none', cursor: 'pointer' }}><ChevronLeft size={18} strokeWidth={1.5} /></button>
        <span style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)' }}>Past conversations</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {threads.map((thread) => (
          <button key={thread.id} onClick={() => onOpen?.(thread.id)} className="block w-full text-left transition-colors duration-150" style={{ padding: '12px 16px', background: 'none', border: 'none', borderBottom: '1px solid var(--selah-border-color, #3D3835)', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}>
            <p style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '2px' }}>{thread.groundingLabel}</p>
            <p style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}>{thread.messageCount} messages &middot; {thread.date}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export function AIAssistantPanel({ groundingContext, messages, conversationHistory, isConfigured, isPanelOpen, onSendMessage, onClose, onSaveToJournal, onOpenThread, onNewConversation }: AIAssistantProps) {
  const [input, setInput] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages.length])

  if (!isConfigured || !isPanelOpen) return null

  const handleSend = () => { if (!input.trim()) return; onSendMessage?.(input); setInput('') }

  if (showHistory) {
    return (
      <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--selah-bg-page, #0F0D0B)', borderLeft: '1px solid var(--selah-border-color, #3D3835)' }}>
        <HistoryList threads={conversationHistory} onOpen={(id) => { onOpenThread?.(id); setShowHistory(false) }} onBack={() => setShowHistory(false)} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--selah-bg-page, #0F0D0B)', borderLeft: '1px solid var(--selah-border-color, #3D3835)' }}>
      <div className="flex items-center justify-between shrink-0" style={{ padding: '12px 16px', borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}>
        <span style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 600, color: 'var(--selah-sky-400, #6B91B5)' }}>AI assistant</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHistory(true)} title="Past conversations" style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><Clock size={16} strokeWidth={1.5} /></button>
          <button onClick={onClose} style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><X size={16} strokeWidth={1.5} /></button>
        </div>
      </div>

      <GroundingHeader context={groundingContext} />

      <div className="flex-1 overflow-y-auto" style={{ padding: '16px' }}>
        {messages.length === 0 && (<div className="text-center py-12"><p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-3, #6E695F)' }}>Ask anything about what you&rsquo;re reading.</p></div>)}
        {messages.map((msg) => (<MessageBubble key={msg.id} message={msg} onSave={msg.role === 'assistant' ? () => onSaveToJournal?.(msg.id, 'insight', msg.content, [], []) : undefined} />))}
        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0" style={{ padding: '12px 16px', borderTop: '1px solid var(--selah-border-color, #3D3835)' }}>
        <div className="flex items-end gap-2 rounded-xl" style={{ backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', padding: '10px 14px' }}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }} placeholder="Ask anything about what you're reading..." rows={1} className="flex-1 outline-none resize-none" style={{ fontFamily: font.body, fontSize: '14px', lineHeight: 1.5, color: 'var(--selah-text-1, #E8E2D9)', backgroundColor: 'transparent', border: 'none', maxHeight: '100px' }} />
          <button onClick={handleSend} className="shrink-0 rounded-lg transition-colors duration-150" style={{ padding: '6px 10px', backgroundColor: input.trim() ? 'var(--selah-sky-400, #6B91B5)' : 'var(--selah-border-color, #3D3835)', color: '#fff', border: 'none', cursor: input.trim() ? 'pointer' : 'default' }}><Send size={14} strokeWidth={2} /></button>
        </div>
      </div>
    </div>
  )
}
