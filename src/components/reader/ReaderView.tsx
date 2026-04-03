'use client'

import { useState, useRef, Fragment } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  PanelRightOpen,
  BookOpen,
} from 'lucide-react'
import { TierPill } from './TierPill'
import { ContextDrawer } from './ContextDrawer'
import type { ReaderProps, Verse, StrongsAnnotation, LensTag, ResurfacedEntry } from './types'

/* ── Font shorthand ── */
const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
  mono: "var(--selah-font-mono, 'JetBrains Mono', monospace)",
}

/* ── Lens color map ── */
const lensColors: Record<string, { bg: string; text: string }> = {
  relational: { bg: 'var(--selah-terra-800, #5C2D21)', text: 'var(--selah-terra-200, #E2BBB0)' },
  conceptual: { bg: 'var(--selah-teal-800, #1A4539)', text: 'var(--selah-teal-200, #93CBBD)' },
  climate: { bg: 'var(--selah-sage-800, #393B26)', text: 'var(--selah-sage-200, #B5B89A)' },
}

/* ── Strong's number inline marker ── */
function StrongsMarker({
  annotation,
  onOpen,
}: {
  annotation: StrongsAnnotation
  onOpen?: (code: string) => void
}) {
  const [showPopover, setShowPopover] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const handleEnter = () => {
    clearTimeout(timeoutRef.current)
    setShowPopover(true)
  }
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setShowPopover(false), 200)
  }

  return (
    <span
      className="relative"
      style={{ cursor: 'pointer' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {annotation.word}
      <sup
        style={{
          fontFamily: font.mono,
          fontSize: '9px',
          fontWeight: 400,
          color: 'var(--selah-teal-400, #4A9E88)',
          marginLeft: '1px',
          opacity: 0.7,
        }}
      >
        {annotation.code}
      </sup>

      {/* Strong's popover */}
      {showPopover && (
        <span
          className="absolute z-20 rounded-lg shadow-lg"
          style={{
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '220px',
            padding: '10px 14px',
            backgroundColor: 'var(--selah-bg-elevated, #292524)',
            border: '1px solid var(--selah-border-color, #3D3835)',
          }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <p
            style={{
              fontFamily: font.mono,
              fontSize: '12px',
              color: 'var(--selah-teal-400, #4A9E88)',
              marginBottom: '2px',
            }}
          >
            {annotation.code}
          </p>
          <p
            style={{
              fontFamily: font.body,
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--selah-text-1, #E8E2D9)',
              marginBottom: '2px',
            }}
          >
            {annotation.transliteration}
          </p>
          <p
            style={{
              fontFamily: font.body,
              fontSize: '12px',
              color: 'var(--selah-text-2, #A39E93)',
              lineHeight: 1.5,
              marginBottom: '6px',
            }}
          >
            {annotation.brief}
          </p>
          <button
            onClick={() => onOpen?.(annotation.code)}
            style={{
              fontFamily: font.body,
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--selah-teal-400, #4A9E88)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            }}
          >
            Deep dive →
          </button>
        </span>
      )}
    </span>
  )
}

/* ── Verse line renderer ── */
function VerseLine({
  verse,
  isActive,
  onSelect,
  onOpenWordStudy,
}: {
  verse: Verse
  isActive: boolean
  onSelect?: () => void
  onOpenWordStudy?: (code: string) => void
}) {
  // Build text segments: interleave plain text with Strong's-annotated words
  const renderText = () => {
    if (verse.strongs.length === 0) {
      if (verse.wordsOfJesus) {
        return (
          <span style={{ color: 'var(--selah-jesus-words, #D4836B)' }}>
            {verse.text}
          </span>
        )
      }
      return <>{verse.text}</>
    }

    // Replace annotated words with interactive Strong's markers
    let remaining = verse.text
    const segments: React.ReactNode[] = []
    let key = 0

    for (const annotation of verse.strongs) {
      const idx = remaining.indexOf(annotation.word)
      if (idx === -1) continue

      const before = remaining.slice(0, idx)
      if (before) {
        segments.push(<Fragment key={key++}>{before}</Fragment>)
      }

      segments.push(
        <StrongsMarker
          key={key++}
          annotation={annotation}
          onOpen={onOpenWordStudy}
        />
      )

      remaining = remaining.slice(idx + annotation.word.length)
    }

    if (remaining) {
      segments.push(<Fragment key={key++}>{remaining}</Fragment>)
    }

    if (verse.wordsOfJesus) {
      return (
        <span style={{ color: 'var(--selah-jesus-words, #D4836B)' }}>
          {segments}
        </span>
      )
    }

    return <>{segments}</>
  }

  return (
    <p
      onClick={onSelect}
      className="transition-all duration-200 cursor-pointer"
      style={{
        fontFamily: font.body,
        fontSize: '16px',
        lineHeight: 2.0,
        color: 'var(--selah-text-1, #E8E2D9)',
        padding: '2px 0 2px 20px',
        borderLeft: isActive
          ? '2px solid var(--selah-gold-500, #C6A23C)'
          : '2px solid transparent',
      }}
    >
      {/* Verse number */}
      <span
        style={{
          fontFamily: font.mono,
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--selah-gold-500, #C6A23C)',
          verticalAlign: 'super',
          marginRight: '4px',
        }}
      >
        {verse.number}
      </span>

      {/* Verse text with Strong's annotations */}
      {renderText()}

      {/* Footnote markers */}
      {verse.footnotes.map((fn) => (
        <sup
          key={fn.id}
          title={fn.text}
          style={{
            fontFamily: font.body,
            fontSize: '10px',
            fontWeight: 600,
            color: 'var(--selah-text-3, #6E695F)',
            cursor: 'help',
            marginLeft: '2px',
          }}
        >
          {fn.marker}
        </sup>
      ))}

      {/* Parallel translations (interleaved) */}
      {verse.parallelTexts.length > 0 &&
        verse.parallelTexts.map((pt) => (
          <span
            key={pt.translation}
            className="block"
            style={{
              fontFamily: font.body,
              fontSize: '14px',
              lineHeight: 1.8,
              color: 'var(--selah-text-3, #6E695F)',
              paddingLeft: '8px',
              marginTop: '2px',
            }}
          >
            <span
              style={{
                fontFamily: font.mono,
                fontSize: '9px',
                fontWeight: 500,
                color: 'var(--selah-text-3, #6E695F)',
                marginRight: '6px',
                letterSpacing: '0.5px',
              }}
            >
              {pt.translation}
            </span>
            {pt.text}
          </span>
        ))}
    </p>
  )
}

/* ── Resurfacing card ── */
function ResurfacingCard({
  entry,
  onOpen,
}: {
  entry: ResurfacedEntry
  onOpen?: () => void
}) {
  return (
    <button
      onClick={onOpen}
      className="block w-full text-left rounded-md"
      style={{
        backgroundColor: 'var(--selah-bg-surface, #1C1917)',
        borderRadius: '6px',
        padding: '14px 18px',
        margin: '12px 0 12px 20px',
        cursor: 'pointer',
        border: 'none',
        borderLeftWidth: '3px',
        borderLeftStyle: 'solid',
        borderLeftColor: 'var(--selah-gold-500, #C6A23C)',
      }}
    >
      <p
        style={{
          fontFamily: font.body,
          fontSize: '10px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          color: 'var(--selah-text-3, #6E695F)',
          marginBottom: '6px',
        }}
      >
        You've been here before
      </p>
      <p
        style={{
          fontFamily: font.display,
          fontStyle: 'italic',
          fontSize: '14px',
          lineHeight: 1.7,
          color: 'var(--selah-resurface-quote, var(--selah-gold-100, #F5E4B8))',
          marginBottom: '4px',
        }}
      >
        &ldquo;{entry.content}&rdquo;
      </p>
      <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>
        Journal &middot; {entry.noteType}
        {entry.tags.length > 0 && ` \u00b7 ${entry.tags.join(', ')}`}
      </p>
    </button>
  )
}

/* ── Lens tag pill ── */
function LensTagPill({
  tag,
  onClick,
}: {
  tag: LensTag
  onClick?: () => void
}) {
  const colors = lensColors[tag.lens] || lensColors.conceptual

  return (
    <button
      onClick={onClick}
      className="transition-opacity duration-150 hover:opacity-80"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: '10px',
        fontSize: '12px',
        fontWeight: 500,
        fontFamily: font.body,
        backgroundColor: colors.bg,
        color: colors.text,
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {tag.label}
    </button>
  )
}

/* ════════════════════════════════════════════
   Main ReaderView Component
   ════════════════════════════════════════════ */

export function ReaderView({
  passage,
  verses,
  activeVerseNumber,
  activeTranslation,
  availableTranslations,
  sceneCast,
  themes,
  climateContexts,
  crossReferences,
  commentaries,
  resurfacedEntries,
  lensTags,
  onNavigatePassage,
  onPreviousUnit,
  onNextUnit,
  onChangeTranslation,
  onSelectVerse,
  onOpenCharacterProfile,
  onOpenThemeDetail,
  onOpenWordStudy,
  onFollowCrossReference,
  onOpenJournalEntry,
}: ReaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(true)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  // Build a set of verse numbers that have resurfaced entries
  const resurfacedByVerse = new Map<number, ResurfacedEntry[]>()
  for (const entry of resurfacedEntries) {
    for (const anchor of entry.anchors) {
      if (anchor.type === 'verse') {
        // Extract verse number from ref like "John 4:7"
        const match = anchor.ref.match(/:(\d+)$/)
        if (match) {
          const vn = parseInt(match[1], 10)
          const existing = resurfacedByVerse.get(vn) || []
          existing.push(entry)
          resurfacedByVerse.set(vn, existing)
        }
      }
    }
  }

  // Source tiers present in this passage (for the header pills)
  const uniqueTiers = [...new Set([
    ...sceneCast.map((c) => c.sourceTier),
    ...themes.map((t) => t.sourceTier),
    ...climateContexts.map((c) => c.sourceTier),
  ])].sort()

  return (
    <div className="h-full flex relative">
      {/* ── Reading pane ── */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ padding: '28px 32px' }}
      >
        <div style={{ maxWidth: '680px' }}>
          {/* Passage header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              {/* Previous unit */}
              <button
                onClick={onPreviousUnit}
                className="transition-colors duration-150"
                style={{
                  color: 'var(--selah-text-3, #6E695F)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>

              {/* Passage title (clickable — opens picker) */}
              <button
                onClick={() => onNavigatePassage?.(passage.id)}
                className="transition-colors duration-150"
                style={{
                  fontFamily: font.display,
                  fontWeight: 300,
                  fontSize: '36px',
                  letterSpacing: '0.5px',
                  color: 'var(--selah-text-1, #E8E2D9)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {passage.book} {passage.chapter}:{passage.verseStart}&ndash;{passage.verseEnd}
              </button>

              {/* Next unit */}
              <button
                onClick={onNextUnit}
                className="transition-colors duration-150"
                style={{
                  color: 'var(--selah-text-3, #6E695F)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Translation switcher */}
            <button
              onClick={() => onChangeTranslation?.('')}
              className="flex items-center gap-1 transition-colors duration-150"
              style={{
                fontFamily: font.body,
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--selah-text-3, #6E695F)',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
            >
              {activeTranslation} <ChevronDown size={12} />
            </button>
          </div>

          {/* Narrative title */}
          <p
            style={{
              fontFamily: font.display,
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: '16px',
              letterSpacing: '2px',
              color: 'var(--selah-text-2, #A39E93)',
              marginBottom: '6px',
            }}
          >
            {passage.title}
          </p>

          {/* Source tier indicators */}
          <div className="flex gap-1.5 mb-7">
            {uniqueTiers.map((tier) => (
              <TierPill key={tier} tier={tier} />
            ))}
          </div>

          {/* ── Verses ── */}
          {verses.map((verse) => (
            <Fragment key={verse.number}>
              <VerseLine
                verse={verse}
                isActive={verse.number === activeVerseNumber}
                onSelect={() => onSelectVerse?.(verse.number)}
                onOpenWordStudy={onOpenWordStudy}
              />

              {/* Resurfaced entries after matching verses */}
              {resurfacedByVerse.get(verse.number)?.map((entry) => (
                <ResurfacingCard
                  key={entry.id}
                  entry={entry}
                  onOpen={() => onOpenJournalEntry?.(entry.id)}
                />
              ))}
            </Fragment>
          ))}

          {/* ── Lens tag pills ── */}
          <div className="flex flex-wrap gap-1.5 mt-5 mb-6">
            {lensTags.map((tag) => (
              <LensTagPill
                key={tag.entityId}
                tag={tag}
                onClick={() => {
                  if (tag.lens === 'relational') onOpenCharacterProfile?.(tag.entityId)
                  else if (tag.lens === 'conceptual') onOpenThemeDetail?.(tag.entityId)
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop context drawer ── */}
      {drawerOpen ? (
        <div className="hidden md:flex w-[340px] shrink-0">
          <ContextDrawer
            sceneCast={sceneCast}
            themes={themes}
            climateContexts={climateContexts}
            crossReferences={crossReferences}
            commentaries={commentaries}
            onClose={() => setDrawerOpen(false)}
            onOpenCharacterProfile={onOpenCharacterProfile}
            onOpenThemeDetail={onOpenThemeDetail}
            onFollowCrossReference={onFollowCrossReference}
          />
        </div>
      ) : (
        <button
          onClick={() => setDrawerOpen(true)}
          className="hidden md:flex absolute top-4 right-4 items-center justify-center rounded-lg shadow-lg transition-colors duration-150"
          style={{
            width: '36px',
            height: '36px',
            backgroundColor: 'var(--selah-bg-surface, #1C1917)',
            color: 'var(--selah-text-3, #6E695F)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <PanelRightOpen size={18} strokeWidth={1.5} />
        </button>
      )}

      {/* ── Mobile context trigger ── */}
      <button
        onClick={() => setMobileDrawerOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full shadow-lg transition-all duration-150"
        style={{
          padding: '12px 20px',
          backgroundColor: 'var(--selah-bg-surface, #1C1917)',
          border: '1px solid var(--selah-border-color, #3D3835)',
          color: 'var(--selah-text-1, #E8E2D9)',
          cursor: 'pointer',
        }}
      >
        <BookOpen size={16} strokeWidth={1.5} />
        <span
          style={{
            fontFamily: font.body,
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          Context
        </span>
      </button>

      {/* ── Mobile bottom sheet ── */}
      {mobileDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(15, 13, 11, 0.6)' }}
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Sheet */}
          <div
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl overflow-hidden"
            style={{
              maxHeight: '85vh',
              backgroundColor: 'var(--selah-bg-page, #0F0D0B)',
              borderTop: '1px solid var(--selah-border-color, #3D3835)',
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center py-3">
              <div
                className="rounded-full"
                style={{
                  width: '36px',
                  height: '4px',
                  backgroundColor: 'var(--selah-text-3, #6E695F)',
                  opacity: 0.5,
                }}
              />
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: 'calc(85vh - 40px)' }}>
              <ContextDrawer
                sceneCast={sceneCast}
                themes={themes}
                climateContexts={climateContexts}
                crossReferences={crossReferences}
                commentaries={commentaries}
                onClose={() => setMobileDrawerOpen(false)}
                onOpenCharacterProfile={onOpenCharacterProfile}
                onOpenThemeDetail={onOpenThemeDetail}
                onFollowCrossReference={onFollowCrossReference}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
