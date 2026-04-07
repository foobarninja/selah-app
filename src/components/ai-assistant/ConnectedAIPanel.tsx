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
            }),
          })
        }}
        onOpenThread={openThread}
        onDeleteThread={deleteThread}
        onNewConversation={newConversation}
        onSaveConversation={saveConversation}
        contextToggles={contextToggles}
        grounding={grounding}
        onContextToggle={setContextToggle}
      />
    </ResizablePanel>
  )
}
