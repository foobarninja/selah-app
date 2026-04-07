'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import JournalDetail from '@/components/journal/JournalDetail'
import NoteEditor from '@/components/journal/NoteEditor'
import type { JournalDetail as JournalDetailType, JournalEntry, AnchorType } from '@/components/journal/types'

interface Props {
  journal: JournalDetailType
  entries: JournalEntry[]
}

export default function JournalDetailClient({ journal, entries }: Props) {
  const router = useRouter()
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null | undefined>(undefined)
  // undefined = editor closed, null = new note, JournalEntry = editing existing

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

  async function handleSaveNote(data: { content: string; noteType: string; userTags?: string[] }) {
    if (editingEntry) {
      // Update existing
      await fetch(`/api/notes/${editingEntry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: data.content, noteType: data.noteType, userTags: data.userTags }),
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
    if (!confirm(`Delete "${journal.name}"? Notes will be moved to the default journal.`)) return
    const res = await fetch(`/api/journals/${journal.id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/journal')
    } else {
      const body = await res.json().catch(() => ({}))
      alert(body.error ?? 'Failed to delete journal.')
    }
  }

  async function handleExport() {
    try {
      const res = await fetch(`/api/journals/${journal.id}/export`)
      if (!res.ok) {
        alert('Export not available yet.')
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
      alert('Export not available yet.')
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
        router.push(`/read/${bookId}/${chapter}?v=${verse}`)
      } else {
        router.push(`/read`)
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
        onEdit={() => {/* Journal edit modal — Task 4+ */}}
        onDelete={handleDeleteJournal}
        onExport={handleExport}
        onEditNote={handleEditNote}
        onNewNote={handleNewNote}
        onNavigateAnchor={handleNavigateAnchor}
      />

      {editorOpen && (
        <NoteEditor
          entry={editingEntry ?? undefined}
          onSave={handleSaveNote}
          onDelete={editingEntry ? handleDeleteNote : undefined}
          onClose={handleCloseEditor}
        />
      )}
    </>
  )
}
