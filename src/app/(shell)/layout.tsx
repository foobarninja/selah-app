'use client'

import { useState } from 'react'
import { AppShell } from '@/components/shell'
import { AIAssistantPanel } from '@/components/ai-assistant'
import { ResizablePanel } from '@/components/ui/ResizablePanel'
import sampleAIData from '@/components/ai-assistant/sample-data.json'
import type { AIAssistantProps } from '@/components/ai-assistant/types'

export default function ShellLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [aiPanelOpen, setAiPanelOpen] = useState(false)

  const aiData = sampleAIData as unknown as {
    groundingContext: AIAssistantProps['groundingContext']
    messages: AIAssistantProps['messages']
    conversationHistory: AIAssistantProps['conversationHistory']
    isConfigured: boolean
  }

  return (
    <AppShell
      user={{ name: 'Study User' }}
      isAIConfigured={aiData.isConfigured}
      onToggleAI={() => setAiPanelOpen((v) => !v)}
    >
      <div className="flex h-full">
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
        {aiPanelOpen && (
          <ResizablePanel defaultWidth={380} minWidth={300} maxWidth={600} side="right" storageKey="selah-ai-panel-width" className="hidden md:block">
            <AIAssistantPanel
              groundingContext={aiData.groundingContext}
              messages={aiData.messages}
              conversationHistory={aiData.conversationHistory}
              isConfigured={aiData.isConfigured}
              isPanelOpen={aiPanelOpen}
              onSendMessage={(msg) => console.log('[AI] Send:', msg)}
              onClose={() => setAiPanelOpen(false)}
              onSaveToJournal={(id, type, content) => console.log('[AI] Save to journal:', id, type)}
              onOpenThread={(id) => console.log('[AI] Open thread:', id)}
              onNewConversation={() => console.log('[AI] New conversation')}
            />
          </ResizablePanel>
        )}
      </div>
    </AppShell>
  )
}
