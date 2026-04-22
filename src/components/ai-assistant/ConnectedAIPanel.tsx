'use client'

import { useChatContext } from '@/lib/ai/chat-context'
import { ResizablePanel } from '@/components/ui/ResizablePanel'
import { AIAssistantPanel } from './AIAssistantPanel'
import type { AIAssistantProps } from './types'

export function ConnectedAIPanel() {
  const {
    messages,
    isStreaming,
    conversationHistory,
    isPanelOpen,
    groundingContext,
    contextToggles,
    setContextToggle,
    grounding,
    activeConversationId,
    sendMessage,
    closePanel,
    newConversation,
    openThread,
    deleteThread,
    saveConversation,
  } = useChatContext()

  if (!isPanelOpen) return null

  const panelProps: AIAssistantProps = {
    groundingContext,
    messages,
    conversationHistory,
    isConfigured: true,
    isPanelOpen,
    isStreaming,
    onSendMessage: sendMessage,
    onClose: closePanel,
    onSaveToJournal: (_messageId, journalId, noteType, content, anchors, tags) => {
      fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteType,
          content,
          anchors,
          tags,
          studyContext: 'ai-conversation',
          journalId,
        }),
      })
    },
    onSaveToCollection: async (messageId, projectId, question, answer) => {
      try {
        const res = await fetch('/api/ai/save-to-collection', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messageId, projectId, question, answer }),
        })
        if (!res.ok) return null
        const data = await res.json() as { projectTopic: string }
        return { projectTopic: data.projectTopic }
      } catch {
        return null
      }
    },
    onOpenThread: openThread,
    onDeleteThread: deleteThread,
    onNewConversation: newConversation,
    onSaveConversation: saveConversation,
    onExportConversation: activeConversationId
      ? () => {
          window.location.href = `/api/ai/conversations/${activeConversationId}/export?format=docx`
        }
      : undefined,
    contextToggles,
    grounding,
    onContextToggle: setContextToggle,
  }

  return (
    <>
      {/* Desktop: docked resizable right panel */}
      <ResizablePanel
        defaultWidth={380}
        minWidth={300}
        maxWidth={600}
        side="right"
        storageKey="selah-ai-panel-width"
        className="hidden md:block"
      >
        <AIAssistantPanel {...panelProps} />
      </ResizablePanel>

      {/* Mobile: full-screen overlay (ResizablePanel is pointer-only and too wide for phones) */}
      <div
        className="md:hidden fixed inset-0 z-50 flex flex-col"
        style={{ backgroundColor: 'var(--selah-bg-page, #0F0D0B)' }}
      >
        <AIAssistantPanel {...panelProps} />
      </div>
    </>
  )
}
