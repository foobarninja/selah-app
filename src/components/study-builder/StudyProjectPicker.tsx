'use client'

import { useState, useEffect, useRef } from 'react'

interface ProjectItem {
  id: string
  topic: string
  format: string
  lastEdited?: string
}

interface Props {
  onSave: (projectId: string) => void
  onCancel: () => void
}

export default function StudyProjectPicker({ onSave, onCancel }: Props) {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [showNewInput, setShowNewInput] = useState(false)
  const [newTopic, setNewTopic] = useState('')
  const [creating, setCreating] = useState(false)
  const newNameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/study-builder/projects')
      .then((r) => r.json())
      .then((data: ProjectItem[]) => {
        setProjects(data)
        if (data.length > 0) setSelectedId(data[0].id)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (showNewInput && newNameRef.current) newNameRef.current.focus()
  }, [showNewInput])

  async function handleCreateProject() {
    const topic = newTopic.trim()
    if (!topic || creating) return
    setCreating(true)
    try {
      const res = await fetch('/api/study-builder/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, format: 'sermon' }),
      })
      const { id } = await res.json() as { id: number | string }
      const newItem: ProjectItem = { id: String(id), topic, format: 'sermon' }
      setProjects((prev) => [newItem, ...prev])
      setSelectedId(newItem.id)
      setShowNewInput(false)
      setNewTopic('')
    } finally {
      setCreating(false)
    }
  }

  function handleSave() {
    if (!selectedId || saving) return
    setSaving(true)
    onSave(selectedId)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') onCancel()
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      style={{
        width: '320px',
        backgroundColor: 'var(--selah-bg-surface)',
        border: '1px solid var(--selah-border-color)',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        padding: '16px',
        fontFamily: 'var(--selah-font-body)',
      }}
    >
      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--selah-text-2)', marginBottom: '12px' }}>
        Save to study:
      </div>

      <div style={{ maxHeight: `${5 * 52}px`, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
        {loading && (
          <div style={{ fontSize: '13px', color: 'var(--selah-text-3)', padding: '8px 0' }}>Loading studies…</div>
        )}
        {!loading && projects.length === 0 && (
          <div style={{ fontSize: '13px', color: 'var(--selah-text-3)', padding: '8px 0' }}>
            No studies yet. Create one below.
          </div>
        )}
        {projects.map((p) => {
          const isSelected = selectedId === p.id
          return (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: isSelected ? '1px solid var(--selah-gold-500, #C6A23C)' : '1px solid var(--selah-border-color)',
                backgroundColor: isSelected ? 'var(--selah-bg-elevated)' : 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  border: isSelected ? '4px solid var(--selah-gold-500, #C6A23C)' : '2px solid var(--selah-border-color)',
                  flexShrink: 0,
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  flex: 1,
                  fontSize: '13px',
                  color: 'var(--selah-text-1)',
                  fontWeight: isSelected ? 500 : 400,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {p.topic}
              </span>
              {p.lastEdited && (
                <span style={{ fontSize: '11px', color: 'var(--selah-text-3)', flexShrink: 0 }}>
                  {p.lastEdited}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {showNewInput ? (
        <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', alignItems: 'center' }}>
          <input
            ref={newNameRef}
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="Study topic"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateProject()
              if (e.key === 'Escape') { setShowNewInput(false); setNewTopic('') }
            }}
            style={{
              flex: 1,
              padding: '7px 10px',
              borderRadius: '6px',
              border: '1px solid var(--selah-border-color)',
              backgroundColor: 'var(--selah-bg-page)',
              color: 'var(--selah-text-1)',
              fontFamily: 'var(--selah-font-body)',
              fontSize: '13px',
            }}
          />
          <button
            onClick={handleCreateProject}
            disabled={!newTopic.trim() || creating}
            style={{
              padding: '7px 12px',
              borderRadius: '6px',
              backgroundColor: 'var(--selah-gold-500, #C6A23C)',
              color: '#fff',
              border: 'none',
              fontFamily: 'var(--selah-font-body)',
              fontSize: '12px',
              fontWeight: 500,
              cursor: !newTopic.trim() || creating ? 'not-allowed' : 'pointer',
              opacity: !newTopic.trim() ? 0.5 : 1,
              flexShrink: 0,
            }}
          >
            {creating ? '…' : 'Create'}
          </button>
          <button
            onClick={() => { setShowNewInput(false); setNewTopic('') }}
            style={{
              padding: '7px 10px',
              borderRadius: '6px',
              backgroundColor: 'transparent',
              color: 'var(--selah-text-3)',
              border: '1px solid var(--selah-border-color)',
              fontFamily: 'var(--selah-font-body)',
              fontSize: '12px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowNewInput(true)}
          style={{
            display: 'block',
            fontSize: '13px',
            color: 'var(--selah-gold-500, #C6A23C)',
            fontWeight: 500,
            background: 'none',
            border: 'none',
            padding: '4px 0',
            cursor: 'pointer',
            marginBottom: '10px',
            fontFamily: 'var(--selah-font-body)',
          }}
        >
          + New Study
        </button>
      )}

      <div style={{ height: '1px', backgroundColor: 'var(--selah-border-color)', marginBottom: '12px' }} />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <button
          onClick={onCancel}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: 'var(--selah-text-3)',
            border: '1px solid var(--selah-border-color)',
            fontFamily: 'var(--selah-font-body)',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!selectedId || saving}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            backgroundColor: 'var(--selah-gold-500, #C6A23C)',
            color: '#fff',
            border: 'none',
            fontFamily: 'var(--selah-font-body)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: !selectedId || saving ? 'not-allowed' : 'pointer',
            opacity: !selectedId ? 0.5 : 1,
          }}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  )
}
