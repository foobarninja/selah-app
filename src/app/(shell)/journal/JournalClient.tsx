'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { JournalView } from '@/components/journal'
import type { JournalEntry, Collection, Bookmark, JournalTab, AnchorType, NoteType } from '@/components/journal/types'

interface Props {
  entries: JournalEntry[]
  collections: Collection[]
  bookmarks: Bookmark[]
  availableUserTags: string[]
}

const NOTE_TYPES: { value: NoteType; label: string }[] = [
  { value: 'reflection', label: 'Reflection' },
  { value: 'annotation', label: 'Annotation' },
  { value: 'question', label: 'Question' },
  { value: 'sermon_idea', label: 'Sermon Idea' },
  { value: 'insight', label: 'Insight' },
  { value: 'prayer', label: 'Prayer' },
]

export default function JournalClient({ entries, collections, bookmarks, availableUserTags }: Props) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<JournalTab>('notes')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showEditor, setShowEditor] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editorContent, setEditorContent] = useState('')
  const [editorType, setEditorType] = useState<NoteType>('reflection')
  const [editorTags, setEditorTags] = useState('')
  const [saving, setSaving] = useState(false)
  // Collection state
  const [showCollectionEditor, setShowCollectionEditor] = useState(false)
  const [collectionTitle, setCollectionTitle] = useState('')
  const [collectionDesc, setCollectionDesc] = useState('')
  const [viewingCollection, setViewingCollection] = useState<{
    id: string; title: string; description: string;
    items: Array<{ id: string; itemType: string; itemRef: string; note: string }>
  } | null>(null)

  const onToggleFilter = useCallback((filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    )
  }, [])

  const onNavigateAnchor = useCallback((anchorType: AnchorType, entityId: string) => {
    switch (anchorType) {
      case 'verse': {
        const parts = entityId.split('-')
        if (parts.length >= 2) router.push(`/reader/${parts[0]}/${parts[1]}`)
        break
      }
      case 'character': router.push(`/characters/${entityId}`); break
      case 'theme': router.push(`/themes/${entityId}`); break
      case 'narrative-unit': router.push('/reader'); break
    }
  }, [router])

  const onCreateNote = useCallback(() => {
    setEditingId(null)
    setEditorContent('')
    setEditorType('reflection')
    setEditorTags('')
    setShowEditor(true)
  }, [])

  const onOpenEntry = useCallback((entryId: string) => {
    const entry = entries.find((e) => e.id === entryId)
    if (!entry) return
    setEditingId(entryId)
    setEditorContent(entry.content)
    setEditorType(entry.noteType)
    setEditorTags(entry.userTags.join(', '))
    setShowEditor(true)
  }, [entries])

  const handleSave = useCallback(async () => {
    if (!editorContent.trim()) return
    setSaving(true)
    try {
      if (editingId) {
        await fetch(`/api/notes/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: editorContent, noteType: editorType }),
        })
      } else {
        await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: editorContent,
            noteType: editorType,
            studyContext: 'freestanding',
            userTags: editorTags.split(',').map((t) => t.trim()).filter(Boolean),
          }),
        })
      }
      setShowEditor(false)
      router.refresh()
    } catch (e) {
      console.error('[Journal] Failed to save note:', e)
    } finally {
      setSaving(false)
    }
  }, [editorContent, editorType, editorTags, editingId, router])

  const handleDelete = useCallback(async () => {
    if (!editingId) return
    try {
      await fetch(`/api/notes/${editingId}`, { method: 'DELETE' })
      setShowEditor(false)
      router.refresh()
    } catch (e) {
      console.error('[Journal] Failed to delete note:', e)
    }
  }, [editingId, router])

  const onOpenCollection = useCallback(async (collectionId: string) => {
    try {
      const resp = await fetch(`/api/collections/${collectionId}`)
      const data = await resp.json()
      if (data.id) setViewingCollection(data)
    } catch (e) {
      console.error('[Journal] Failed to open collection:', e)
    }
  }, [])

  const handleCreateCollection = useCallback(async () => {
    if (!collectionTitle.trim()) return
    setSaving(true)
    try {
      await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: collectionTitle, description: collectionDesc }),
      })
      setShowCollectionEditor(false)
      setCollectionTitle('')
      setCollectionDesc('')
      router.refresh()
    } finally {
      setSaving(false)
    }
  }, [collectionTitle, collectionDesc, router])

  const handleDeleteCollection = useCallback(async () => {
    if (!viewingCollection) return
    try {
      await fetch(`/api/collections/${viewingCollection.id}`, { method: 'DELETE' })
      setViewingCollection(null)
      router.refresh()
    } catch (e) {
      console.error('[Journal] Failed to delete collection:', e)
    }
  }, [viewingCollection, router])

  const handleRemoveCollectionItem = useCallback(async (collectionId: string, itemId: string) => {
    try {
      await fetch(`/api/collections/${collectionId}/items/${itemId}`, { method: 'DELETE' })
      // Refresh the detail view
      const resp = await fetch(`/api/collections/${collectionId}`)
      const data = await resp.json()
      if (data.id) setViewingCollection(data)
      router.refresh()
    } catch (e) {
      console.error('[Journal] Failed to remove item:', e)
    }
  }, [router])

  const onRemoveBookmark = useCallback(async (bookmarkId: string) => {
    try {
      await fetch(`/api/bookmarks/${bookmarkId}`, { method: 'DELETE' })
      router.refresh()
    } catch (e) {
      console.error('[Journal] Failed to remove bookmark:', e)
    }
  }, [router])

  return (
    <>
      <JournalView
        entries={entries}
        collections={collections}
        bookmarks={bookmarks}
        availableUserTags={availableUserTags}
        activeTab={activeTab}
        activeFilters={activeFilters}
        searchQuery={searchQuery}
        onChangeTab={setActiveTab}
        onSearch={setSearchQuery}
        onToggleFilter={onToggleFilter}
        onClearFilters={() => setActiveFilters([])}
        onOpenEntry={onOpenEntry}
        onCreateNote={onCreateNote}
        onNavigateAnchor={onNavigateAnchor}
        onOpenCollection={onOpenCollection}
        onNavigateBookmark={(ref) => router.push('/reader')}
        onRemoveBookmark={onRemoveBookmark}
      />

      {/* FAB buttons — Notes tab gets +Note, Collections tab gets +Collection */}
      {activeTab === 'notes' && !showEditor && (
        <button
          onClick={onCreateNote}
          className="fixed z-50 flex items-center justify-center rounded-full shadow-lg"
          style={{ bottom: '24px', right: '24px', width: '52px', height: '52px', backgroundColor: 'var(--selah-gold-500, #C6A23C)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '24px', fontWeight: 300 }}
        >
          +
        </button>
      )}
      {activeTab === 'collections' && !showCollectionEditor && !viewingCollection && (
        <button
          onClick={() => { setCollectionTitle(''); setCollectionDesc(''); setShowCollectionEditor(true) }}
          className="fixed z-50 flex items-center justify-center rounded-full shadow-lg"
          style={{ bottom: '24px', right: '24px', width: '52px', height: '52px', backgroundColor: 'var(--selah-gold-500, #C6A23C)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '24px', fontWeight: 300 }}
        >
          +
        </button>
      )}

      {/* ── New Collection Modal ── */}
      {showCollectionEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowCollectionEditor(false)}>
          <div className="rounded-lg shadow-xl" style={{ backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color)', width: '420px', padding: '24px' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: "var(--selah-font-display)", fontSize: '22px', fontWeight: 400, color: 'var(--selah-text-1)', marginBottom: '16px' }}>New Collection</h2>
            <input type="text" value={collectionTitle} onChange={(e) => setCollectionTitle(e.target.value)} placeholder="Collection title" autoFocus style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-page)', color: 'var(--selah-text-1)', fontFamily: "var(--selah-font-body)", fontSize: '14px', marginBottom: '12px' }} />
            <textarea value={collectionDesc} onChange={(e) => setCollectionDesc(e.target.value)} placeholder="What is this collection for?" rows={3} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-page)', color: 'var(--selah-text-1)', fontFamily: "var(--selah-font-body)", fontSize: '14px', resize: 'vertical', marginBottom: '16px' }} />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowCollectionEditor(false)} style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: 'transparent', color: 'var(--selah-text-3)', border: '1px solid var(--selah-border-color)', fontFamily: "var(--selah-font-body)", fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleCreateCollection} disabled={saving || !collectionTitle.trim()} style={{ padding: '8px 20px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500, #C6A23C)', color: '#fff', border: 'none', fontFamily: "var(--selah-font-body)", fontSize: '13px', fontWeight: 500, cursor: 'pointer', opacity: !collectionTitle.trim() ? 0.5 : 1 }}>{saving ? 'Creating...' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Collection Detail View ── */}
      {viewingCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setViewingCollection(null)}>
          <div className="rounded-lg shadow-xl overflow-y-auto" style={{ backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color)', width: '520px', maxHeight: '80vh', padding: '24px' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 style={{ fontFamily: "var(--selah-font-display)", fontSize: '22px', fontWeight: 400, color: 'var(--selah-text-1)', marginBottom: '4px' }}>{viewingCollection.title}</h2>
                {viewingCollection.description && (
                  <p style={{ fontFamily: "var(--selah-font-body)", fontSize: '13px', color: 'var(--selah-text-3)', lineHeight: 1.5 }}>{viewingCollection.description}</p>
                )}
              </div>
              <button onClick={() => setViewingCollection(null)} style={{ color: 'var(--selah-text-3)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>×</button>
            </div>

            {viewingCollection.items.length === 0 ? (
              <div className="text-center py-8">
                <p style={{ fontFamily: "var(--selah-font-body)", fontSize: '14px', color: 'var(--selah-text-3)' }}>No items yet. Add passages, characters, or themes from the Reader.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {viewingCollection.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-lg" style={{ padding: '10px 14px', backgroundColor: 'var(--selah-bg-page)', border: '1px solid var(--selah-border-color)' }}>
                    <span style={{ fontFamily: "var(--selah-font-mono)", fontSize: '10px', color: 'var(--selah-text-3)', textTransform: 'uppercase', width: '50px', flexShrink: 0 }}>{item.itemType}</span>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontFamily: "var(--selah-font-body)", fontSize: '14px', color: 'var(--selah-text-1)' }}>{item.itemRef}</p>
                      {item.note && <p style={{ fontFamily: "var(--selah-font-body)", fontSize: '12px', color: 'var(--selah-text-3)', fontStyle: 'italic' }}>{item.note}</p>}
                    </div>
                    <button onClick={() => handleRemoveCollectionItem(viewingCollection.id, item.id)} style={{ color: 'var(--selah-text-3)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>×</button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 mt-6 pt-4" style={{ borderTop: '1px solid var(--selah-border-color)' }}>
              <button onClick={handleDeleteCollection} style={{ padding: '6px 14px', borderRadius: '8px', backgroundColor: 'transparent', color: '#D4836B', border: '1px solid #D4836B', fontFamily: "var(--selah-font-body)", fontSize: '12px', cursor: 'pointer' }}>Delete collection</button>
              <div className="flex-1" />
              <button onClick={() => setViewingCollection(null)} style={{ padding: '6px 14px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500, #C6A23C)', color: '#fff', border: 'none', fontFamily: "var(--selah-font-body)", fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Done</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Note Editor Modal ── */}
      {showEditor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowEditor(false)}
        >
          <div
            className="rounded-lg shadow-xl"
            style={{
              backgroundColor: 'var(--selah-bg-surface, #1C1917)',
              border: '1px solid var(--selah-border-color, #3D3835)',
              width: '480px',
              maxHeight: '80vh',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                fontFamily: "var(--selah-font-display)",
                fontSize: '22px',
                fontWeight: 400,
                color: 'var(--selah-text-1)',
                marginBottom: '20px',
              }}
            >
              {editingId ? 'Edit Note' : 'New Note'}
            </h2>

            {/* Note type selector */}
            <div className="flex flex-wrap gap-2" style={{ marginBottom: '16px' }}>
              {NOTE_TYPES.map((nt) => (
                <button
                  key={nt.value}
                  onClick={() => setEditorType(nt.value)}
                  className="rounded-full transition-colors duration-100"
                  style={{
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontFamily: "var(--selah-font-body)",
                    fontWeight: 500,
                    border: '1px solid var(--selah-border-color)',
                    backgroundColor: editorType === nt.value ? 'var(--selah-gold-900, #4A3711)' : 'transparent',
                    color: editorType === nt.value ? 'var(--selah-gold-300, #E8C767)' : 'var(--selah-text-2)',
                    cursor: 'pointer',
                  }}
                >
                  {nt.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <textarea
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              placeholder="Write your thoughts..."
              rows={6}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--selah-border-color)',
                backgroundColor: 'var(--selah-bg-page)',
                color: 'var(--selah-text-1)',
                fontFamily: "var(--selah-font-body)",
                fontSize: '14px',
                lineHeight: 1.7,
                resize: 'vertical',
                marginBottom: '12px',
              }}
              autoFocus
            />

            {/* Tags */}
            <input
              type="text"
              value={editorTags}
              onChange={(e) => setEditorTags(e.target.value)}
              placeholder="Tags (comma-separated)"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid var(--selah-border-color)',
                backgroundColor: 'var(--selah-bg-page)',
                color: 'var(--selah-text-1)',
                fontFamily: "var(--selah-font-body)",
                fontSize: '13px',
                marginBottom: '20px',
              }}
            />

            {/* Actions */}
            <div className="flex items-center gap-3">
              {editingId && (
                <button
                  onClick={handleDelete}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: '#D4836B',
                    border: '1px solid #D4836B',
                    fontFamily: "var(--selah-font-body)",
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              )}
              <div className="flex-1" />
              <button
                onClick={() => setShowEditor(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  color: 'var(--selah-text-3)',
                  border: '1px solid var(--selah-border-color)',
                  fontFamily: "var(--selah-font-body)",
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editorContent.trim()}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--selah-gold-500, #C6A23C)',
                  color: '#fff',
                  border: 'none',
                  fontFamily: "var(--selah-font-body)",
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: saving ? 'wait' : 'pointer',
                  opacity: !editorContent.trim() ? 0.5 : 1,
                }}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
