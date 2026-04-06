'use client'

import { MessageCircle } from 'lucide-react'
import { useChatContext } from '@/lib/ai/chat-context'

export function AIToggleButton() {
  const { togglePanel, isPanelOpen } = useChatContext()

  return (
    <button
      onClick={togglePanel}
      title="AI Assistant"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: isPanelOpen ? 'var(--selah-sky-600, #4A7A9E)' : 'var(--selah-sky-400, #6B91B5)',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'background-color 150ms ease',
        zIndex: 50,
      }}
    >
      <MessageCircle size={22} strokeWidth={1.5} />
    </button>
  )
}
