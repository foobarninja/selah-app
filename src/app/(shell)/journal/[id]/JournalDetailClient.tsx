'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import JournalDetail from '@/components/journal/JournalDetail'
import NoteEditor from '@/components/journal/NoteEditor'
import NewJournalModal from '@/components/journal/NewJournalModal'
import type { JournalDetail as JournalDetailType, JournalEntry, AnchorType } from '@/components/journal/types'
import { useToast } from '@/components/ui/ToastProvider'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

interface Props {
  journal: JournalDetailType
  entries: JournalEntry[]
  availableTags?: string[]
}

export default function JournalDetailClient({ journal, entries, availableTags = [] }: Props) {
  const router = useRouter()
  const toast = useToast()
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null | undefined>(undefined)
  // undefined = editor closed, null = new note, JournalEntry = editing existing
  const [showJournalEdit, setShowJournalEdit] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const editorOpen = editingEntry !== undefined

  function handleEditNote(id: string) {
    const found = entries.find((e) => e.id === id) ?? null
    setEditingEntry(found)
  }

  function handleNewNote() {
    setEditingEntry(null)
  }

  function handleCloseEditor() {
    setEditingEntry(undefined)
  }

  async function handleSaveNote(data: { content: string; noteType: string; anchors?: Array<{ type: string; bookId?: string; chapter?: number; verseStart?: number; refId?: string }>; userTags?: string[] }) {
    if (editingEntry) {
      // Update existing
      await fetch(`/api/notes/${editingEntry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: data.content, noteType: data.noteType, anchors: data.anchors, userTags: data.userTags }),
      })
    } else {
      // Create new
      const journalId = journal.id === 'all' ? undefined : journal.id
      await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: data.content,
          noteType: data.noteType,
          userTags: data.userTags,
          journalId,
        }),
      })
    }
    handleCloseEditor()
    router.refresh()
  }

  async function handleDeleteNote() {
    if (!editingEntry) return
    await fetch(`/api/notes/${editingEntry.id}`, { method: 'DELETE' })
    handleCloseEditor()
    router.refresh()
  }

  async function handleDeleteJournal() {
    setConfirmDelete(false)
    const res = await fetch(`/api/journals/${journal.id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/journal')
    } else {
      const body = await res.json().catch(() => ({}))
      toast.error("Couldn't remove that journal", body.error)
    }
  }

  async function handleExport() {
    try {
      const res = await fetch(`/api/journals/${journal.id}/export`)
      if (!res.ok) {
        toast.info('Export is coming soon')
        return
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${journal.name}.docx`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      toast.info('Export is coming soon')
    }
  }

  function handleNavigateAnchor(type: AnchorType, entityId: string) {
    if (type === 'verse') {
      // entityId format: bookId-chapter-verse
      const parts = entityId.split('-')
      if (parts.length >= 3) {
        const verse = parts[parts.length - 1]
        const chapter = parts[parts.length - 2]
        const bookId = parts.slice(0, parts.length - 2).join('-')
        router.push(`/reader/${bookId}/${chapter}`)
      } else {
        router.push(`/reader`)
      }
    } else if (type === 'character') {
      router.push(`/characters/${entityId}`)
    } else if (type === 'theme') {
      router.push(`/themes/${entityId}`)
    }
  }

  return (
    <>
      <JournalDetail
        journal={journal}
        entries={entries}
        onBack={() => router.push('/journal')}
        onEdit={() => setShowJournalEdit(true)}
        onDelete={() => setConfirmDelete(true)}
        onExport={handleExport}
        onEditNote={handleEditNote}
        onNewNote={handleNewNote}
        onNavigateAnchor={handleNavigateAnchor}
        showJournalBadge={journal.id === 'all'}
      />

      {showJournalEdit && (
        <NewJournalModal
          initial={{
            name: journal.name,
            description: journal.description,
            coverColor: journal.coverColor ?? undefined,
            journalType: journal.journalType,
          }}
          onClose={() => setShowJournalEdit(false)}
          onCreate={async (data) => {
            await fetch(`/api/journals/${journal.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            })
            setShowJournalEdit(false)
            router.refresh()
          }}
        />
      )}

      {editorOpen && (
        <NoteEditor
          entry={editingEntry ?? undefined}
          onSave={handleSaveNote}
          onDelete={editingEntry ? handleDeleteNote : undefined}
          onClose={handleCloseEditor}
          availableTags={availableTags}
        />
      )}

      <ConfirmDialog
        open={confirmDelete}
        title="Remove this journal?"
        message={`"${journal.name}" will be removed and its notes will move to the default journal. This can't be undone.`}
        confirmLabel="Remove"
        cancelLabel="Keep it"
        onConfirm={handleDeleteJournal}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  )
}
