'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { X, Clock, Send, Bookmark, BookmarkCheck, ChevronLeft, Save, Check, Plus, Copy, Library, Download } from 'lucide-react'
import { ContextControls } from './ContextControls'
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

function StreamingDots() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '2px 0' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--selah-sky-400, #6B91B5)',
            display: 'inline-block',
            animation: 'selahPulse 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes selahPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </span>
  )
}

function MessageBubble({ message, onSave, onCopy, onSaveToCollection, isStreaming, isSaved }: { message: Message; onSave?: () => void; onCopy?: () => void; onSaveToCollection?: () => void; isStreaming?: boolean; isSaved?: boolean }) {
  const isUser = message.role === 'user'
  const showDots = !isUser && isStreaming && message.content === ''
  const [copied, setCopied] = useState(false)
  const [collected, setCollected] = useState(false)

  const handleCopy = () => {
    if (!message.content) return
    navigator.clipboard.writeText(message.content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }).catch(() => {
      // Clipboard permission denied or unavailable — fail silently.
    })
    onCopy?.()
  }

  const handleSaveToCollection = () => {
    if (!onSaveToCollection) return
    setCollected(true)
    onSaveToCollection()
    setTimeout(() => setCollected(false), 1800)
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div className="relative rounded-xl" style={{ maxWidth: '85%', padding: '12px 16px', backgroundColor: isUser ? 'var(--selah-gold-900, #4A3711)' : 'var(--selah-bg-surface, #1C1917)', border: isUser ? 'none' : '1px solid var(--selah-border-color, #3D3835)' }}>
        {showDots
          ? <StreamingDots />
          : isUser
            ? <p style={{ fontFamily: font.body, fontSize: '14px', lineHeight: 1.7, color: 'var(--selah-gold-100, #F5E4B8)', whiteSpace: 'pre-wrap' }}>{message.content}</p>
            : <div className="selah-md" style={{ fontFamily: font.body, fontSize: '14px', lineHeight: 1.7, color: 'var(--selah-text-1, #E8E2D9)' }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
              </div>
        }
        {!isUser && !showDots && (
          <div className="flex items-center justify-between mt-2">
            {message.sourceTier && <AITierPill tier={message.sourceTier} />}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                title={copied ? 'Copied!' : 'Copy message'}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                style={{ color: copied ? 'var(--selah-teal-400, #4A9E88)' : 'var(--selah-sky-400, #6B91B5)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
              >
                {copied ? <Check size={14} strokeWidth={1.5} /> : <Copy size={14} strokeWidth={1.5} />}
              </button>
              {onSaveToCollection && (
                <button
                  onClick={handleSaveToCollection}
                  title={collected ? 'Added to collection' : 'Save to study collection'}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{ color: collected ? 'var(--selah-teal-400, #4A9E88)' : 'var(--selah-sky-400, #6B91B5)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                >
                  {collected ? <Check size={14} strokeWidth={1.5} /> : <Library size={14} strokeWidth={1.5} />}
                </button>
              )}
              {isSaved ? (
                <span title="Saved to journal" style={{ color: 'var(--selah-gold-500, #C6A23C)', padding: '2px' }}><BookmarkCheck size={14} strokeWidth={1.5} /></span>
              ) : onSave ? (
                <button onClick={onSave} title="Save to journal" className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ color: 'var(--selah-sky-400, #6B91B5)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}><Bookmark size={14} strokeWidth={1.5} /></button>
              ) : null}
            </div>
          </div>
        )}
        <p style={{ fontFamily: font.body, fontSize: '10px', color: isUser ? 'var(--selah-gold-500, #C6A23C)' : 'var(--selah-text-3, #6E695F)', marginTop: '4px', textAlign: isUser ? 'right' : 'left' }}>{message.timestamp}</p>
      </div>
    </div>
  )
}

function HistoryList({ threads, onOpen, onDelete, onBack }: { threads: ConversationThread[]; onOpen?: (id: string) => void; onDelete?: (id: string) => void; onBack: () => void }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 shrink-0" style={{ padding: '12px 16px', borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}>
        <button onClick={onBack} style={{ color: 'var(--selah-text-3)', background: 'none', border: 'none', cursor: 'pointer' }}><ChevronLeft size={18} strokeWidth={1.5} /></button>
        <span style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)' }}>Past conversations</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {threads.length === 0 && (
          <p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-3, #6E695F)', textAlign: 'center', padding: '24px 16px' }}>No saved conversations yet.</p>
        )}
        {threads.map((thread) => (
          <div key={thread.id} className="flex items-center group transition-colors duration-150" style={{ borderBottom: '1px solid var(--selah-border-color, #3D3835)' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}>
            <button onClick={() => onOpen?.(thread.id)} className="flex-1 text-left" style={{ padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <p style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '2px' }}>{thread.groundingLabel}</p>
              <p style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}>{thread.messageCount} messages &middot; {thread.date}</p>
            </button>
            {onDelete && (
              <button onClick={() => onDelete(thread.id)} title="Delete conversation" className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0" style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--selah-text-3, #6E695F)' }}><X size={14} strokeWidth={1.5} /></button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const mdStyles = `
.selah-md h1, .selah-md h2, .selah-md h3, .selah-md h4 {
  font-family: var(--selah-font-display, 'Cormorant Garamond', serif);
  font-weight: 600;
  color: var(--selah-text-1, #E8E2D9);
  margin: 16px 0 8px;
}
.selah-md h1 { font-size: 20px; }
.selah-md h2 { font-size: 18px; }
.selah-md h3 { font-size: 16px; }
.selah-md h4 { font-size: 15px; }
.selah-md p { margin: 0 0 10px; }
.selah-md p:last-child { margin-bottom: 0; }
.selah-md ul, .selah-md ol { margin: 4px 0 10px; padding-left: 20px; }
.selah-md li { margin-bottom: 4px; }
.selah-md strong { color: var(--selah-gold-300, #E8C767); font-weight: 600; }
.selah-md em { color: var(--selah-sky-300, #93B5D3); font-style: italic; }
.selah-md blockquote {
  border-left: 3px solid var(--selah-gold-500, #C6A23C);
  margin: 8px 0;
  padding: 4px 12px;
  color: var(--selah-text-2, #A39E93);
}
.selah-md code {
  font-size: 12px;
  background: var(--selah-bg-elevated, #292524);
  padding: 1px 5px;
  border-radius: 4px;
}
.selah-md pre { background: var(--selah-bg-elevated, #292524); padding: 10px; border-radius: 8px; overflow-x: auto; margin: 8px 0; }
.selah-md pre code { background: none; padding: 0; }
.selah-md table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 13px; }
.selah-md th { text-align: left; padding: 6px 10px; border-bottom: 2px solid var(--selah-gold-500, #C6A23C); color: var(--selah-gold-300, #E8C767); font-weight: 600; }
.selah-md td { padding: 6px 10px; border-bottom: 1px solid var(--selah-border-color, #3D3835); }
.selah-md tr:last-child td { border-bottom: none; }
.selah-md hr { border: none; border-top: 1px solid var(--selah-border-color, #3D3835); margin: 12px 0; }
.selah-md a { color: var(--selah-sky-400, #6B91B5); text-decoration: underline; }
`

export function AIAssistantPanel({ groundingContext, messages, conversationHistory, isConfigured, isPanelOpen, isStreaming, onSendMessage, onClose, onSaveToJournal, onSaveToCollection, onOpenThread, onDeleteThread, onNewConversation, onSaveConversation, onExportConversation, grounding, contextToggles, onContextToggle }: AIAssistantProps) {
  const [input, setInput] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [savedMessageIds, setSavedMessageIds] = useState<Set<string>>(new Set())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages.length, messages[messages.length - 1]?.content])

  if (!isConfigured || !isPanelOpen) return null

  const handleSend = () => { if (!input.trim() || isStreaming) return; onSendMessage?.(input); setInput('') }

  if (showHistory) {
    return (
      <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--selah-bg-page, #0F0D0B)', borderLeft: '1px solid var(--selah-border-color, #3D3835)' }}>
        <HistoryList threads={conversationHistory} onOpen={(id) => { onOpenThread?.(id); setShowHistory(false) }} onDelete={onDeleteThread} onBack={() => setShowHistory(false)} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--selah-bg-page, #0F0D0B)', borderLeft: '1px solid var(--selah-border-color, #3D3835)' }}>
      <style>{mdStyles}</style>
      <div className="flex items-center justify-between shrink-0" style={{ padding: '12px 16px', borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}>
        <span style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 600, color: 'var(--selah-sky-400, #6B91B5)' }}>AI assistant</span>
        <div className="flex items-center gap-2">
          {messages.length > 0 && onSaveConversation && (
            <button
              onClick={async () => {
                if (saveStatus !== 'idle') return
                setSaveStatus('saving')
                await onSaveConversation()
                setSaveStatus('saved')
                setTimeout(() => setSaveStatus('idle'), 2000)
              }}
              title={saveStatus === 'saved' ? 'Saved!' : 'Save conversation'}
              disabled={isStreaming || saveStatus !== 'idle'}
              style={{ color: saveStatus === 'saved' ? 'var(--selah-gold-500, #C6A23C)' : 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: isStreaming || saveStatus !== 'idle' ? 'default' : 'pointer', padding: '4px', opacity: isStreaming ? 0.4 : 1 }}
            >
              {saveStatus === 'saved' ? <Check size={16} strokeWidth={2} /> : <Save size={16} strokeWidth={1.5} />}
            </button>
          )}
          {messages.length > 0 && onExportConversation && (
            <button
              onClick={onExportConversation}
              title="Export conversation"
              aria-label="Export conversation"
              style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              <Download size={16} strokeWidth={1.5} />
            </button>
          )}
          {onNewConversation && (
            <button onClick={onNewConversation} title="New conversation" style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><Plus size={16} strokeWidth={1.5} /></button>
          )}
          <button onClick={() => setShowHistory(true)} title="Past conversations" style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><Clock size={16} strokeWidth={1.5} /></button>
          <button onClick={onClose} style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><X size={16} strokeWidth={1.5} /></button>
        </div>
      </div>

      <GroundingHeader context={groundingContext} />

      {grounding && onContextToggle && contextToggles && (
        <ContextControls
          grounding={grounding}
          toggles={contextToggles}
          onToggle={onContextToggle}
        />
      )}

      <div className="flex-1 overflow-y-auto" style={{ padding: '16px' }}>
        {messages.length === 0 && (<div className="text-center py-12"><p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-3, #6E695F)' }}>Ask anything about what you&rsquo;re reading.</p></div>)}
        {messages.map((msg, idx) => {
          // For assistant messages, find the most recent preceding user message
          // to pair as the "question" when saving to a collection.
          const precedingUserMessage = msg.role === 'assistant'
            ? [...messages.slice(0, idx)].reverse().find((m) => m.role === 'user')?.content ?? ''
            : ''
          const canSaveToCollection = msg.role === 'assistant' && msg.id !== 'streaming' && !!onSaveToCollection && !!msg.content
          return (
            <MessageBubble
              key={msg.id}
              message={msg}
              isStreaming={isStreaming && msg.id === 'streaming'}
              onSave={msg.role === 'assistant' && msg.id !== 'streaming' && !savedMessageIds.has(msg.id) ? () => {
                onSaveToJournal?.(msg.id, 'insight', msg.content, [], [])
                setSavedMessageIds((prev) => new Set(prev).add(msg.id))
              } : undefined}
              onSaveToCollection={canSaveToCollection ? () => {
                onSaveToCollection?.(msg.id, precedingUserMessage, msg.content)
              } : undefined}
              isSaved={savedMessageIds.has(msg.id)}
            />
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0" style={{ padding: '12px 16px', borderTop: '1px solid var(--selah-border-color, #3D3835)' }}>
        <div className="flex items-end gap-2 rounded-xl" style={{ backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', padding: '10px 14px' }}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }} placeholder="Ask anything about what you're reading..." rows={1} disabled={isStreaming} className="flex-1 outline-none resize-none" style={{ fontFamily: font.body, fontSize: '14px', lineHeight: 1.5, color: 'var(--selah-text-1, #E8E2D9)', backgroundColor: 'transparent', border: 'none', maxHeight: '100px', opacity: isStreaming ? 0.5 : 1 }} />
          <button onClick={handleSend} disabled={isStreaming} className="shrink-0 rounded-lg transition-colors duration-150" style={{ padding: '6px 10px', backgroundColor: input.trim() && !isStreaming ? 'var(--selah-sky-400, #6B91B5)' : 'var(--selah-border-color, #3D3835)', color: '#fff', border: 'none', cursor: input.trim() && !isStreaming ? 'pointer' : 'default' }}><Send size={14} strokeWidth={2} /></button>
        </div>
      </div>
    </div>
  )
}
