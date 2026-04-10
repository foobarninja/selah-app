'use client'

import { useChatContext } from '@/lib/ai/chat-context'
import { ResizablePanel } from '@/components/ui/ResizablePanel'
import { AIAssistantPanel } from './AIAssistantPanel'

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

  return (
    <ResizablePanel defaultWidth={380} minWidth={300} maxWidth={600} side="right" storageKey="selah-ai-panel-width" className="hidden md:block">
      <AIAssistantPanel
        groundingContext={groundingContext}
        messages={messages}
        conversationHistory={conversationHistory}
        isConfigured={true}
        isPanelOpen={isPanelOpen}
        isStreaming={isStreaming}
        onSendMessage={sendMessage}
        onClose={closePanel}
        onSaveToJournal={(messageId, noteType, content, anchors, tags) => {
          fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              noteType,
              content,
              anchors,
              tags,
              studyContext: 'ai-conversation',
              journalId: 'default',
            }),
          })
        }}
        onSaveToCollection={async (messageId, question, answer) => {
          try {
            const res = await fetch('/api/ai/save-to-collection', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ messageId, question, answer }),
            })
            if (!res.ok) return null
            const data = await res.json() as { projectTopic: string }
            return { projectTopic: data.projectTopic }
          } catch {
            return null
          }
        }}
        onOpenThread={openThread}
        onDeleteThread={deleteThread}
        onNewConversation={newConversation}
        onSaveConversation={saveConversation}
        onExportConversation={
          activeConversationId
            ? () => {
                window.location.href = `/api/ai/conversations/${activeConversationId}/export?format=docx`
              }
            : undefined
        }
        contextToggles={contextToggles}
        grounding={grounding}
        onContextToggle={setContextToggle}
      />
    </ResizablePanel>
  )
}
