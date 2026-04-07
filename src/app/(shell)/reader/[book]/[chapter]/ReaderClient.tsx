'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ReaderView } from '@/components/reader'
import { BOOK_NAMES, BOOK_CHAPTERS } from '@/lib/constants'
import type { ReaderProps, Translation } from '@/components/reader/types'
import JournalPicker from '@/components/journal/JournalPicker'

interface ReaderClientProps extends Omit<ReaderProps, 'activeVerseNumber' | 'parallelTranslations' | 'onNavigatePassage' | 'onPreviousUnit' | 'onNextUnit' | 'onChangeTranslation' | 'onToggleParallelTranslation' | 'onSelectVerse' | 'onOpenCharacterProfile' | 'onOpenThemeDetail' | 'onOpenWordStudy' | 'onFollowCrossReference' | 'onOpenJournalEntry'> {
  prevUnit: { bookId: string; chapter: number } | null
  nextUnit: { bookId: string; chapter: number } | null
  bookId: string
  maxChapters: number
}

const BOOK_IDS = Object.keys(BOOK_NAMES)

/** Format a set of verse numbers into a compact range string like "1-3,5,7-9" */
function formatVerseRange(verses: Set<number>): string {
  const sorted = [...verses].sort((a, b) => a - b)
  if (sorted.length === 0) return ''
  if (sorted.length === 1) return String(sorted[0])

  const ranges: string[] = []
  let start = sorted[0]
  let end = sorted[0]
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) {
      end = sorted[i]
    } else {
      ranges.push(start === end ? String(start) : `${start}-${end}`)
      start = sorted[i]
      end = sorted[i]
    }
  }
  ranges.push(start === end ? String(start) : `${start}-${end}`)
  return ranges.join(',')
}

export default function ReaderClient({
  prevUnit,
  nextUnit,
  bookId,
  maxChapters,
  ...readerProps
}: ReaderClientProps) {
  const router = useRouter()
  const [activeVerse, setActiveVerse] = useState<number | undefined>(undefined)
  const [selectedVerses, setSelectedVerses] = useState<Set<number>>(new Set())
  const lastClickedVerse = useRef<number | undefined>(undefined)
  const [parallelTranslations] = useState<string[]>([])
  const [showBookPicker, setShowBookPicker] = useState(false)
  const [showTranslationPicker, setShowTranslationPicker] = useState(false)
  const [showNoteEditor, setShowNoteEditor] = useState(false)
  const [noteContent, setNoteContent] = useState('')
  const [noteType, setNoteType] = useState('annotation')
  const [noteSaving, setNoteSaving] = useState(false)
  const [noteCharAnchors, setNoteCharAnchors] = useState<Set<string>>(new Set())
  const [noteThemeTags, setNoteThemeTags] = useState<Set<string>>(new Set())
  const [showCollectPicker, setShowCollectPicker] = useState(false)
  const [availableCollections, setAvailableCollections] = useState<Array<{ id: string; title: string; type: 'collection' | 'study' }>>([])
  const [collectNote, setCollectNote] = useState('')
  const [pickerBook, setPickerBook] = useState<string | null>(null)
  const bookPickerRef = useRef<HTMLDivElement>(null)
  const translationPickerRef = useRef<HTMLDivElement>(null)
  const [showJournalPicker, setShowJournalPicker] = useState(false)
  const [pendingNoteData, setPendingNoteData] = useState<object | null>(null)

  // Close pickers on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (bookPickerRef.current && !bookPickerRef.current.contains(e.target as Node)) {
        setShowBookPicker(false)
        setPickerBook(null)
      }
      if (translationPickerRef.current && !translationPickerRef.current.contains(e.target as Node)) {
        setShowTranslationPicker(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleVerseSelect = useCallback((verseNumber: number, event?: { ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean }) => {
    if (event?.ctrlKey || event?.metaKey) {
      // Ctrl/Cmd+click: toggle individual verse
      setSelectedVerses((prev) => {
        const next = new Set(prev)
        if (next.has(verseNumber)) {
          next.delete(verseNumber)
        } else {
          next.add(verseNumber)
        }
        return next
      })
      setActiveVerse(verseNumber)
      lastClickedVerse.current = verseNumber
    } else if (event?.shiftKey && lastClickedVerse.current !== undefined) {
      // Shift+click: range select from last clicked to current
      const start = Math.min(lastClickedVerse.current, verseNumber)
      const end = Math.max(lastClickedVerse.current, verseNumber)
      setSelectedVerses((prev) => {
        const next = new Set(prev)
        for (let v = start; v <= end; v++) {
          next.add(v)
        }
        return next
      })
      setActiveVerse(verseNumber)
    } else {
      // Normal click: select single verse, clear multi-select
      setActiveVerse(verseNumber)
      setSelectedVerses(new Set([verseNumber]))
      lastClickedVerse.current = verseNumber
    }
  }, [])

  const navigateTo = useCallback((book: string, chapter: number) => {
    setShowBookPicker(false)
    setPickerBook(null)
    router.push(`/reader/${book}/${chapter}`)
  }, [router])

  return (
    <div className="relative h-full">
      <ReaderView
        {...readerProps}
        activeVerseNumber={activeVerse}
        selectedVerses={selectedVerses}
        parallelTranslations={parallelTranslations}
        onSelectVerse={handleVerseSelect}
        onPreviousUnit={prevUnit ? () => router.push(`/reader/${prevUnit.bookId}/${prevUnit.chapter}`) : undefined}
        onNextUnit={nextUnit ? () => router.push(`/reader/${nextUnit.bookId}/${nextUnit.chapter}`) : undefined}
        onNavigatePassage={() => setShowBookPicker(true)}
        onChangeTranslation={() => setShowTranslationPicker(true)}
        onOpenCharacterProfile={(id) => router.push(`/characters/${id}`)}
        onOpenThemeDetail={(id) => router.push(`/themes/${id}`)}
        onOpenWordStudy={(code) => router.push(`/word-study/${code}`)}
        onFollowCrossReference={(crossRefId) => {
          // Find the cross-ref in our data to get the target passage
          const xref = readerProps.crossReferences.find((x) => x.id === crossRefId)
          if (!xref) return
          // targetPassage is like "John 1:1-3" — need to reverse-lookup the book ID
          const match = xref.targetPassage.match(/^(.+?)\s+(\d+):/)
          if (!match) return
          const targetBookName = match[1]
          const targetChapter = match[2]
          // Find book ID by name
          const targetBookId = BOOK_IDS.find((id) => BOOK_NAMES[id] === targetBookName)
          if (targetBookId) {
            router.push(`/reader/${targetBookId}/${targetChapter}`)
          }
        }}
        onOpenJournalEntry={(id) => router.push(`/journal?entry=${id}`)}
      />

      {/* ── Verse Action Bar (shown when a verse is selected) ── */}
      {selectedVerses.size > 0 && !showNoteEditor && !showBookPicker && !showTranslationPicker && (
        <div
          className="fixed bottom-6 left-1/2 z-40 flex items-center gap-2 rounded-full shadow-lg"
          style={{
            transform: 'translateX(-50%)',
            padding: '8px 20px',
            backgroundColor: 'var(--selah-bg-surface, #1C1917)',
            border: '1px solid var(--selah-border-color, #3D3835)',
          }}
        >
          <span style={{
            fontFamily: "var(--selah-font-mono)",
            fontSize: '12px',
            color: 'var(--selah-gold-500, #C6A23C)',
          }}>
            {readerProps.passage.book} {readerProps.passage.chapter}:{formatVerseRange(selectedVerses)}
          </span>
          <button
            onClick={() => {
              setNoteContent('')
              setNoteType('annotation')
              setNoteCharAnchors(new Set())
              setNoteThemeTags(new Set())
              setShowNoteEditor(true)
            }}
            style={{
              padding: '4px 14px',
              borderRadius: '16px',
              backgroundColor: 'var(--selah-gold-900, #4A3711)',
              color: 'var(--selah-gold-300, #E8C767)',
              border: 'none',
              fontFamily: "var(--selah-font-body)",
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            + Note
          </button>
          <button
            onClick={async () => {
              await fetch('/api/bookmarks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookId, chapter: readerProps.passage.chapter, verse: activeVerse ?? [...selectedVerses][0] }),
              })
              setActiveVerse(undefined)
              setSelectedVerses(new Set())
            }}
            style={{
              padding: '4px 14px',
              borderRadius: '16px',
              backgroundColor: 'transparent',
              color: 'var(--selah-text-2, #A39E93)',
              border: '1px solid var(--selah-border-color, #3D3835)',
              fontFamily: "var(--selah-font-body)",
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Bookmark
          </button>
          <button
            onClick={async () => {
              const resp = await fetch('/api/collections', { cache: 'no-store' })
              const cols = await resp.json()
              setAvailableCollections(cols)
              setCollectNote('')
              setShowCollectPicker(true)
            }}
            style={{
              padding: '4px 14px',
              borderRadius: '16px',
              backgroundColor: 'transparent',
              color: 'var(--selah-text-2, #A39E93)',
              border: '1px solid var(--selah-border-color, #3D3835)',
              fontFamily: "var(--selah-font-body)",
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Collect
          </button>
        </div>
      )}

      {/* ── Collection Picker ── */}
      {showCollectPicker && selectedVerses.size > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowCollectPicker(false)}>
          <div className="rounded-lg shadow-xl" style={{ backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color)', width: '360px', padding: '20px' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: "var(--selah-font-display)", fontSize: '18px', fontWeight: 400, color: 'var(--selah-text-1)', marginBottom: '4px' }}>Add to Collection</h3>
            <p style={{ fontFamily: "var(--selah-font-mono)", fontSize: '11px', color: 'var(--selah-gold-500)', marginBottom: '12px' }}>{readerProps.passage.book} {readerProps.passage.chapter}:{formatVerseRange(selectedVerses)}</p>
            <input type="text" value={collectNote} onChange={(e) => setCollectNote(e.target.value)} placeholder="Why include this? (optional)" style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-page)', color: 'var(--selah-text-1)', fontFamily: "var(--selah-font-body)", fontSize: '13px', marginBottom: '12px' }} />
            {availableCollections.length === 0 ? (
              <p style={{ fontFamily: "var(--selah-font-body)", fontSize: '13px', color: 'var(--selah-text-3)', textAlign: 'center', padding: '16px 0' }}>No collections yet. Create one in Journal first.</p>
            ) : (
              <div className="flex flex-col gap-1" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {availableCollections.map((col) => (
                  <button
                    key={col.id}
                    onClick={async () => {
                      const verseRef = `${readerProps.passage.book} ${readerProps.passage.chapter}:${formatVerseRange(selectedVerses)}`
                      const [kind, rawId] = col.id.split(':')
                      if (kind === 'study') {
                        await fetch(`/api/study-builder/projects/${rawId}/items`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ entityType: 'verse', entityId: verseRef, title: verseRef, preview: collectNote || verseRef, sourceTier: 1 }),
                        })
                      } else {
                        await fetch(`/api/collections/${rawId}/items`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ itemType: 'verse', itemRef: verseRef, note: collectNote }),
                        })
                      }
                      setShowCollectPicker(false)
                      setActiveVerse(undefined)
                      setSelectedVerses(new Set())
                    }}
                    className="w-full text-left rounded-lg transition-colors duration-100"
                    style={{ padding: '10px 14px', backgroundColor: 'var(--selah-bg-page)', border: '1px solid var(--selah-border-color)', cursor: 'pointer', fontFamily: "var(--selah-font-body)", fontSize: '14px', color: 'var(--selah-text-1)' }}
                  >
                    <span>{col.title}</span>
                    <span style={{ marginLeft: '8px', fontSize: '10px', fontWeight: 500, padding: '1px 6px', borderRadius: '4px', backgroundColor: col.type === 'study' ? 'var(--selah-sky-900, #1A3348)' : 'var(--selah-gold-900, #4A3711)', color: col.type === 'study' ? 'var(--selah-sky-300, #93B5D3)' : 'var(--selah-gold-300, #E8C767)' }}>
                      {col.type === 'study' ? 'Study' : 'Collection'}
                    </span>
                  </button>
                ))}
              </div>
            )}
            <div className="flex justify-end mt-3">
              <button onClick={() => setShowCollectPicker(false)} style={{ padding: '6px 14px', borderRadius: '8px', backgroundColor: 'transparent', color: 'var(--selah-text-3)', border: '1px solid var(--selah-border-color)', fontFamily: "var(--selah-font-body)", fontSize: '12px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Note Editor Modal (from Reader) ── */}
      {showNoteEditor && selectedVerses.size > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowNoteEditor(false)}
        >
          <div
            className="rounded-lg shadow-xl"
            style={{
              backgroundColor: 'var(--selah-bg-surface, #1C1917)',
              border: '1px solid var(--selah-border-color, #3D3835)',
              width: '480px',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              fontFamily: "var(--selah-font-display)",
              fontSize: '20px',
              fontWeight: 400,
              color: 'var(--selah-text-1)',
              marginBottom: '4px',
            }}>
              New Note
            </h2>
            <p style={{
              fontFamily: "var(--selah-font-mono)",
              fontSize: '12px',
              color: 'var(--selah-gold-500, #C6A23C)',
              marginBottom: '16px',
            }}>
              Anchored to {readerProps.passage.book} {readerProps.passage.chapter}:{formatVerseRange(selectedVerses)}
            </p>

            <div className="flex flex-wrap gap-2" style={{ marginBottom: '12px' }}>
              {['reflection', 'annotation', 'question', 'sermon_idea', 'insight', 'prayer'].map((t) => (
                <button
                  key={t}
                  onClick={() => setNoteType(t)}
                  className="rounded-full"
                  style={{
                    padding: '3px 10px',
                    fontSize: '11px',
                    fontFamily: "var(--selah-font-body)",
                    fontWeight: 500,
                    border: '1px solid var(--selah-border-color)',
                    backgroundColor: noteType === t ? 'var(--selah-gold-900, #4A3711)' : 'transparent',
                    color: noteType === t ? 'var(--selah-gold-300, #E8C767)' : 'var(--selah-text-3)',
                    cursor: 'pointer',
                  }}
                >
                  {t.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Character anchors from scene cast */}
            {readerProps.sceneCast.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontFamily: "var(--selah-font-body)", fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-text-3)', marginBottom: '6px' }}>Characters in this passage</p>
                <div className="flex flex-wrap gap-1.5">
                  {readerProps.sceneCast.filter((c, i, arr) => arr.findIndex(x => x.characterId === c.characterId) === i).map((c) => (
                    <button
                      key={c.characterId}
                      onClick={() => setNoteCharAnchors((prev) => { const next = new Set(prev); next.has(c.characterId) ? next.delete(c.characterId) : next.add(c.characterId); return next })}
                      className="rounded-full"
                      style={{
                        padding: '3px 10px', fontSize: '11px', fontFamily: "var(--selah-font-body)", fontWeight: 500, cursor: 'pointer',
                        border: noteCharAnchors.has(c.characterId) ? '1px solid #C47A63' : '1px solid var(--selah-border-color)',
                        backgroundColor: noteCharAnchors.has(c.characterId) ? 'rgba(196,122,99,0.15)' : 'transparent',
                        color: noteCharAnchors.has(c.characterId) ? '#C47A63' : 'var(--selah-text-3)',
                      }}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Theme tags from passage */}
            {readerProps.themes.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontFamily: "var(--selah-font-body)", fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-text-3)', marginBottom: '6px' }}>Themes in this passage</p>
                <div className="flex flex-wrap gap-1.5">
                  {readerProps.themes.map((t) => (
                    <button
                      key={t.themeId}
                      onClick={() => setNoteThemeTags((prev) => { const next = new Set(prev); next.has(t.themeId) ? next.delete(t.themeId) : next.add(t.themeId); return next })}
                      className="rounded-full"
                      style={{
                        padding: '3px 10px', fontSize: '11px', fontFamily: "var(--selah-font-body)", fontWeight: 500, cursor: 'pointer',
                        border: noteThemeTags.has(t.themeId) ? '1px solid #4A9E88' : '1px solid var(--selah-border-color)',
                        backgroundColor: noteThemeTags.has(t.themeId) ? 'rgba(74,158,136,0.15)' : 'transparent',
                        color: noteThemeTags.has(t.themeId) ? '#4A9E88' : 'var(--selah-text-3)',
                      }}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Write your thoughts..."
              rows={5}
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
                marginBottom: '16px',
              }}
              autoFocus
            />

            <div className="flex justify-end gap-3" style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNoteEditor(false)}
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
              {/* Quick save — saves to default journal immediately */}
              <button
                onClick={async () => {
                  if (!noteContent.trim()) return
                  setNoteSaving(true)
                  try {
                    await fetch('/api/notes', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        content: noteContent,
                        noteType,
                        studyContext: 'reading',
                        journalId: 'default',
                        anchors: [
                          ...[...selectedVerses].map((v) => ({ type: 'verse', bookId, chapter: readerProps.passage.chapter, verseStart: v })),
                          ...Array.from(noteCharAnchors).map((id) => ({ type: 'character', refId: id })),
                        ],
                        themeIds: Array.from(noteThemeTags),
                      }),
                    })
                    setShowNoteEditor(false)
                    setActiveVerse(undefined)
                    setSelectedVerses(new Set())
                    router.refresh()
                  } finally {
                    setNoteSaving(false)
                  }
                }}
                disabled={noteSaving || !noteContent.trim()}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--selah-gold-500, #C6A23C)',
                  color: '#fff',
                  border: 'none',
                  fontFamily: "var(--selah-font-body)",
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: noteSaving ? 'wait' : 'pointer',
                  opacity: !noteContent.trim() ? 0.5 : 1,
                }}
              >
                {noteSaving ? 'Saving...' : 'Save'}
              </button>
              {/* Save to... — opens journal picker */}
              <button
                onClick={() => {
                  if (!noteContent.trim()) return
                  setPendingNoteData({
                    content: noteContent,
                    noteType,
                    studyContext: 'reading',
                    anchors: [
                      ...[...selectedVerses].map((v) => ({ type: 'verse', bookId, chapter: readerProps.passage.chapter, verseStart: v })),
                      ...Array.from(noteCharAnchors).map((id) => ({ type: 'character', refId: id })),
                    ],
                    themeIds: Array.from(noteThemeTags),
                  })
                  setShowJournalPicker(true)
                }}
                disabled={noteSaving || !noteContent.trim()}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  color: !noteContent.trim() ? 'var(--selah-text-3)' : 'var(--selah-gold-500, #C6A23C)',
                  border: '1px solid var(--selah-border-color)',
                  fontFamily: "var(--selah-font-body)",
                  fontSize: '13px',
                  cursor: noteSaving || !noteContent.trim() ? 'not-allowed' : 'pointer',
                  opacity: !noteContent.trim() ? 0.5 : 1,
                }}
              >
                Save to...
              </button>
              {/* Journal Picker dropdown */}
              {showJournalPicker && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '44px',
                    right: 0,
                    zIndex: 60,
                  }}
                >
                  <JournalPicker
                    onSave={async (journalId) => {
                      if (!pendingNoteData) return
                      setNoteSaving(true)
                      setShowJournalPicker(false)
                      try {
                        await fetch('/api/notes', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ ...pendingNoteData, journalId }),
                        })
                        setPendingNoteData(null)
                        setShowNoteEditor(false)
                        setActiveVerse(undefined)
                        setSelectedVerses(new Set())
                        router.refresh()
                      } finally {
                        setNoteSaving(false)
                      }
                    }}
                    onCancel={() => {
                      setShowJournalPicker(false)
                      setPendingNoteData(null)
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Book / Chapter Picker Overlay ── */}
      {showBookPicker && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: '60px' }}
        >
          <div
            ref={bookPickerRef}
            className="rounded-lg shadow-xl overflow-hidden flex"
            style={{
              backgroundColor: 'var(--selah-bg-surface, #1C1917)',
              border: '1px solid var(--selah-border-color, #3D3835)',
              maxHeight: '70vh',
              width: '520px',
            }}
          >
            {/* Book list */}
            <div
              className="overflow-y-auto"
              style={{
                width: pickerBook ? '200px' : '100%',
                borderRight: pickerBook ? '1px solid var(--selah-border-color)' : 'none',
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  fontFamily: "var(--selah-font-body)",
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'var(--selah-text-3)',
                }}
              >
                Old Testament
              </div>
              {BOOK_IDS.filter((_, i) => i < 39).map((id) => (
                <button
                  key={id}
                  onClick={() => setPickerBook(id)}
                  className="w-full text-left transition-colors duration-100"
                  style={{
                    padding: '8px 16px',
                    fontFamily: "var(--selah-font-body)",
                    fontSize: '14px',
                    color: id === bookId ? 'var(--selah-gold-500)' : 'var(--selah-text-1)',
                    backgroundColor: id === pickerBook ? 'var(--selah-bg-elevated)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {BOOK_NAMES[id]}
                </button>
              ))}
              <div
                style={{
                  padding: '12px 16px 4px',
                  fontFamily: "var(--selah-font-body)",
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'var(--selah-text-3)',
                }}
              >
                New Testament
              </div>
              {BOOK_IDS.filter((_, i) => i >= 39).map((id) => (
                <button
                  key={id}
                  onClick={() => setPickerBook(id)}
                  className="w-full text-left transition-colors duration-100"
                  style={{
                    padding: '8px 16px',
                    fontFamily: "var(--selah-font-body)",
                    fontSize: '14px',
                    color: id === bookId ? 'var(--selah-gold-500)' : 'var(--selah-text-1)',
                    backgroundColor: id === pickerBook ? 'var(--selah-bg-elevated)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {BOOK_NAMES[id]}
                </button>
              ))}
            </div>

            {/* Chapter grid */}
            {pickerBook && (
              <div className="overflow-y-auto flex-1" style={{ padding: '12px' }}>
                <div
                  style={{
                    fontFamily: "var(--selah-font-display)",
                    fontSize: '18px',
                    fontWeight: 400,
                    color: 'var(--selah-text-1)',
                    marginBottom: '12px',
                    padding: '4px 8px',
                  }}
                >
                  {BOOK_NAMES[pickerBook]}
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {Array.from({ length: BOOK_CHAPTERS[pickerBook] ?? 1 }, (_, i) => i + 1).map((ch) => (
                    <button
                      key={ch}
                      onClick={() => navigateTo(pickerBook, ch)}
                      className="rounded transition-colors duration-100"
                      style={{
                        padding: '8px 4px',
                        fontFamily: "var(--selah-font-mono)",
                        fontSize: '13px',
                        color: pickerBook === bookId && ch === readerProps.passage.chapter
                          ? 'var(--selah-gold-500)'
                          : 'var(--selah-text-2)',
                        backgroundColor: 'var(--selah-bg-page)',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Translation Picker Overlay ── */}
      {showTranslationPicker && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: '60px' }}
        >
          <div
            ref={translationPickerRef}
            className="rounded-lg shadow-xl overflow-y-auto"
            style={{
              backgroundColor: 'var(--selah-bg-surface, #1C1917)',
              border: '1px solid var(--selah-border-color, #3D3835)',
              maxHeight: '60vh',
              width: '340px',
              padding: '8px 0',
            }}
          >
            <div
              style={{
                padding: '8px 16px 12px',
                fontFamily: "var(--selah-font-body)",
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'var(--selah-text-3)',
              }}
            >
              Translation
            </div>
            {readerProps.availableTranslations.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setShowTranslationPicker(false)
                  router.push(`/reader/${bookId}/${readerProps.passage.chapter}?t=${t.id}`)
                }}
                className="w-full text-left flex items-center gap-3 transition-colors duration-100"
                style={{
                  padding: '10px 16px',
                  fontFamily: "var(--selah-font-body)",
                  fontSize: '14px',
                  color: t.id === readerProps.activeTranslation ? 'var(--selah-gold-500)' : 'var(--selah-text-1)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--selah-font-mono)",
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--selah-text-3)',
                    width: '48px',
                    flexShrink: 0,
                  }}
                >
                  {t.abbreviation}
                </span>
                <span>{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
