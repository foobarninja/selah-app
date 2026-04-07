'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import JournalGrid from '@/components/journal/JournalGrid'
import NewJournalModal from '@/components/journal/NewJournalModal'
import type { JournalSummary } from '@/components/journal/types'

interface Props {
  journals: JournalSummary[]
}

export default function JournalClient({ journals }: Props) {
  const router = useRouter()
  const [showNewModal, setShowNewModal] = useState(false)

  async function handleCreate(data: {
    name: string
    description?: string
    coverColor?: string
    journalType?: string
  }) {
    await fetch('/api/journals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setShowNewModal(false)
    router.refresh()
  }

  return (
    <>
      <JournalGrid
        journals={journals}
        onOpenJournal={(id) => router.push(`/journal/${id}`)}
        onNewJournal={() => setShowNewModal(true)}
        onViewAllNotes={() => router.push('/journal/all')}
      />
      {showNewModal && (
        <NewJournalModal
          onClose={() => setShowNewModal(false)}
          onCreate={handleCreate}
        />
      )}
    </>
  )
}
