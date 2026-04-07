'use client'

import { useState } from 'react'
import { ArrowLeft, ChevronDown, ChevronRight, BookOpen } from 'lucide-react'
import { TierPill } from '@/components/reader/TierPill'
import { ChatProvider } from '@/lib/ai/chat-context'
import { ConnectedAIPanel } from '@/components/ai-assistant/ConnectedAIPanel'
import { AIToggleButton } from '@/components/ai-assistant/AIToggleButton'
import type {
  WordStudyProps,
  ConcordanceEntry,
  FrequencySegment,
} from './types'
import type { SourceTier } from '@/components/reader/types'

/* ── Fonts ── */
const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
  mono: "var(--selah-font-mono, 'JetBrains Mono', monospace)",
}

/* ── Language accent colors ── */
function langColor(language: string): string {
  return language === 'hebrew'
    ? 'var(--selah-gold-500, #C6A23C)'
    : 'var(--selah-teal-400, #4A9E88)'
}

function langColorLight(language: string): string {
  return language === 'hebrew'
    ? 'var(--selah-gold-50, #FBF3E0)'
    : 'var(--selah-teal-50, #EFF8F6)'
}

function langColorDark(language: string): string {
  return language === 'hebrew'
    ? 'var(--selah-gold-900, #4A3711)'
    : 'var(--selah-teal-800, #1A4539)'
}

/* ── Frequency bar ── */
function FrequencyBar({
  segments,
  language,
}: {
  segments: FrequencySegment[]
  language: string
}) {
  const [hoveredBook, setHoveredBook] = useState<string | null>(null)
  const maxCount = Math.max(...segments.map((s) => s.count), 1)

  const color = langColor(language)
  const colorLight = langColorLight(language)
  const colorDark = langColorDark(language)

  return (
    <div className="mb-8">
      <div className="flex rounded-md overflow-hidden relative" style={{ height: '40px', gap: '1px' }}>
        {segments.map((seg) => {
          const intensity = seg.count / maxCount
          let bg = 'transparent'
          if (seg.count > 0 && intensity <= 0.25) bg = colorLight
          else if (intensity <= 0.5) bg = language === 'hebrew' ? 'var(--selah-gold-300, #E8C767)' : 'var(--selah-teal-200, #93CBBD)'
          else if (intensity <= 0.75) bg = color
          else if (intensity > 0.75) bg = colorDark

          return (
            <div
              key={seg.book}
              className="flex-1 relative transition-opacity duration-100"
              style={{
                backgroundColor: bg,
                opacity: hoveredBook && hoveredBook !== seg.book ? 0.4 : 1,
                cursor: seg.count > 0 ? 'pointer' : 'default',
              }}
              onMouseEnter={() => setHoveredBook(seg.book)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              {hoveredBook === seg.book && (
                <div
                  className="absolute z-10 rounded-md shadow-lg whitespace-nowrap pointer-events-none"
                  style={{
                    bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)',
                    padding: '4px 10px',
                    backgroundColor: 'var(--selah-bg-elevated, #292524)',
                    border: '1px solid var(--selah-border-color, #3D3835)',
                    fontSize: '11px', fontFamily: font.body, color: 'var(--selah-text-1, #E8E2D9)',
                  }}
                >
                  {seg.book} {seg.count > 0 && `\u00b7 ${seg.count}`}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="flex justify-between mt-1.5">
        <span style={{ fontFamily: font.body, fontSize: '10px', color: 'var(--selah-text-3, #6E695F)' }}>Genesis</span>
        <span style={{ fontFamily: font.body, fontSize: '10px', color: 'var(--selah-text-3, #6E695F)' }}>Revelation</span>
      </div>
    </div>
  )
}

/* ── Translation cluster ── */
function ClusterCard({
  cluster,
  language,
  isPrimary,
}: {
  cluster: { rendering: string; count: number; translations: string[]; note?: string }
  language: string
  isPrimary: boolean
}) {
  return (
    <div
      className="rounded-lg mb-3"
      style={{
        padding: '14px 18px',
        backgroundColor: isPrimary ? langColorDark(language) : 'var(--selah-bg-surface, #1C1917)',
        border: isPrimary ? 'none' : '1px solid var(--selah-border-color, #3D3835)',
      }}
    >
      <div className="flex items-baseline gap-3 mb-2">
        <span style={{
          fontFamily: font.display, fontSize: '20px', fontWeight: 500,
          color: isPrimary ? langColorLight(language) : 'var(--selah-text-1, #E8E2D9)',
        }}>
          &ldquo;{cluster.rendering}&rdquo;
        </span>
        <span style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>
          {cluster.count} translation{cluster.count !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {cluster.translations.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: font.mono, fontSize: '11px', fontWeight: 500,
              padding: '2px 8px', borderRadius: '6px',
              backgroundColor: 'var(--selah-bg-elevated, #292524)',
              color: 'var(--selah-text-2, #A39E93)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
      {cluster.note && (
        <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)', marginTop: '8px', fontStyle: 'italic' }}>
          {cluster.note}
        </p>
      )}
    </div>
  )
}

/* ── Curated concordance entry ── */
function ConcordanceCard({
  entry,
  language,
  onNavigate,
}: {
  entry: ConcordanceEntry
  language: string
  onNavigate?: () => void
}) {
  const renderText = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/)
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} style={{ fontWeight: 700, color: langColor(language) }}>{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    )
  }

  return (
    <div className="mb-5">
      <div className="flex items-baseline gap-2 mb-1">
        <button
          onClick={onNavigate}
          style={{
            fontFamily: font.body, fontSize: '13px', fontWeight: 600,
            color: langColor(language),
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            textDecoration: 'underline', textUnderlineOffset: '2px',
            textDecorationColor: 'transparent',
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.textDecorationColor = langColor(language) }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.textDecorationColor = 'transparent' }}
        >
          {entry.verseRef}
        </button>
        <span style={{
          fontFamily: font.mono, fontSize: '10px',
          padding: '1px 6px', borderRadius: '4px',
          backgroundColor: 'var(--selah-bg-surface, #1C1917)',
          color: 'var(--selah-text-3, #6E695F)',
        }}>
          {entry.rendering}
        </span>
      </div>
      <p style={{
        fontFamily: font.body, fontSize: '14px', lineHeight: 1.7,
        color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '4px',
      }}>
        {renderText(entry.verseText)}
      </p>
      {entry.curatedNote && (
        <p style={{
          fontFamily: font.body, fontSize: '13px', lineHeight: 1.6,
          color: 'var(--selah-text-3, #6E695F)', fontStyle: 'italic',
        }}>
          {entry.curatedNote}
        </p>
      )}
      {entry.sourceTier && (
        <div className="mt-1.5">
          <TierPill tier={entry.sourceTier as SourceTier} />
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════
   Main WordStudyProfile Component
   ════════════════════════════════════════════ */

export function WordStudyProfile({
  arrivedFrom,
  entry,
  translationClusters,
  curatedOccurrences,
  frequencySegments,
  relatedWords,
  narrativeConnections,
  onBack,
  onNavigatePassage,
  onOpenEntry,
  onOpenNarrativeUnit,
}: WordStudyProps) {
  const [showFullConcordance, setShowFullConcordance] = useState(false)
  const accent = langColor(entry.language)

  return (
    <ChatProvider
      grounding={{ page: 'word-study', context: { strongsNumber: entry.strongsNumber }, query: '' }}
      groundingDisplay={{ type: 'general' }}
      isConfigured={true}
    >
    <div className="h-full overflow-y-auto" style={{ padding: '28px 32px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* Back link */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-6 transition-colors duration-150"
            style={{
              fontFamily: font.body, fontSize: '13px', fontWeight: 500,
              color: 'var(--selah-text-3, #6E695F)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            {arrivedFrom ? `Back to ${arrivedFrom.passageRef}` : 'Back'}
          </button>
        )}

        {/* ── Original script — THE MOMENT ── */}
        <div className="mb-2" style={{ direction: entry.language === 'hebrew' ? 'rtl' : 'ltr' }}>
          <span
            style={{
              fontFamily: entry.language === 'hebrew' ? 'serif' : "'Noto Serif', Georgia, serif",
              fontSize: '48px',
              fontWeight: 400,
              color: 'var(--selah-text-1, #E8E2D9)',
              lineHeight: 1.2,
            }}
          >
            {entry.originalScript}
          </span>
        </div>

        {/* Transliteration + pronunciation + Strong's number */}
        <div className="flex items-baseline gap-3 mb-1" style={{ direction: 'ltr' }}>
          <span style={{ fontFamily: font.body, fontSize: '20px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)' }}>
            {entry.transliteration}
          </span>
          <span style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-3, #6E695F)' }}>
            ({entry.pronunciation})
          </span>
        </div>
        <div className="flex items-center gap-3 mb-8">
          <span style={{ fontFamily: font.mono, fontSize: '13px', fontWeight: 500, color: accent }}>
            {entry.strongsNumber}
          </span>
          <span style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)', textTransform: 'capitalize' }}>
            {entry.language} &middot; {entry.morphology}
          </span>
        </div>

        {/* ── Short gloss ── */}
        <p style={{
          fontFamily: font.display, fontSize: '28px', fontWeight: 400,
          color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '16px',
        }}>
          {entry.shortGloss}
        </p>

        {/* ── Full definition ── */}
        <p style={{
          fontFamily: font.body, fontSize: '15px', lineHeight: 1.8,
          color: 'var(--selah-text-2, #A39E93)', marginBottom: '28px',
        }}>
          {entry.fullDefinition}
        </p>

        {/* ── Frequency bar ── */}
        <div className="mb-2">
          <h2 className="flex items-center gap-2 mb-4" style={{ fontFamily: font.display, fontSize: '20px', fontWeight: 400, color: 'var(--selah-text-1, #E8E2D9)' }}>
            <span style={{ width: '3px', height: '18px', borderRadius: '2px', backgroundColor: accent }} />
            Distribution
            <span style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>
              {entry.totalOccurrences} occurrences
            </span>
          </h2>
          <FrequencyBar segments={frequencySegments} language={entry.language} />
        </div>

        {/* ── Translation comparison ── */}
        <div className="mb-10">
          <h2 className="flex items-center gap-2 mb-4" style={{ fontFamily: font.display, fontSize: '20px', fontWeight: 400, color: 'var(--selah-text-1, #E8E2D9)' }}>
            <span style={{ width: '3px', height: '18px', borderRadius: '2px', backgroundColor: accent }} />
            How it&rsquo;s translated
          </h2>
          {translationClusters
            .sort((a, b) => b.count - a.count)
            .map((cluster, i) => (
              <ClusterCard
                key={cluster.rendering}
                cluster={cluster}
                language={entry.language}
                isPrimary={i === 0}
              />
            ))}
        </div>

        {/* ── Concordance — curated highlights ── */}
        <div className="mb-10">
          <h2 className="flex items-center gap-2 mb-5" style={{ fontFamily: font.display, fontSize: '20px', fontWeight: 400, color: 'var(--selah-text-1, #E8E2D9)' }}>
            <span style={{ width: '3px', height: '18px', borderRadius: '2px', backgroundColor: accent }} />
            Key occurrences
          </h2>
          {curatedOccurrences.map((occ) => (
            <ConcordanceCard
              key={occ.id}
              entry={occ}
              language={entry.language}
              onNavigate={() => onNavigatePassage?.(occ.verseRef)}
            />
          ))}

          {entry.totalOccurrences > curatedOccurrences.length && (
            <button
              onClick={() => setShowFullConcordance(!showFullConcordance)}
              className="flex items-center gap-2 transition-colors duration-150"
              style={{
                fontFamily: font.body, fontSize: '13px', fontWeight: 500,
                color: accent,
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                marginTop: '8px',
              }}
            >
              {showFullConcordance
                ? 'Hide full concordance'
                : `Show all ${entry.totalOccurrences} occurrences`}
              {showFullConcordance
                ? <ChevronDown size={14} />
                : <ChevronRight size={14} />}
            </button>
          )}

          {showFullConcordance && (
            <div className="mt-6 pl-4" style={{ borderLeft: '2px solid var(--selah-border-color, #3D3835)' }}>
              <p style={{
                fontFamily: font.body, fontSize: '13px', fontStyle: 'italic',
                color: 'var(--selah-text-3, #6E695F)', marginBottom: '12px',
              }}>
                Full concordance grouped by book would render here with {entry.totalOccurrences} entries.
              </p>
            </div>
          )}
        </div>

        {/* ── Narrative connections ── */}
        {narrativeConnections.length > 0 && (
          <div className="mb-10">
            <h2 className="flex items-center gap-2 mb-4" style={{ fontFamily: font.display, fontSize: '20px', fontWeight: 400, color: 'var(--selah-text-1, #E8E2D9)' }}>
              <span style={{ width: '3px', height: '18px', borderRadius: '2px', backgroundColor: accent }} />
              In context
            </h2>
            {narrativeConnections.map((nc) => (
              <button
                key={nc.narrativeUnitRef}
                onClick={() => onOpenNarrativeUnit?.(nc.narrativeUnitRef)}
                className="flex items-start gap-3 w-full text-left rounded-lg mb-2 transition-colors duration-150"
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'var(--selah-bg-surface, #1C1917)',
                  border: '1px solid var(--selah-border-color, #3D3835)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = accent }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-border-color, #3D3835)' }}
              >
                <BookOpen size={16} strokeWidth={1.5} style={{ color: 'var(--selah-gold-500, #C6A23C)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '2px' }}>
                    {nc.title}
                  </p>
                  <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>
                    {nc.narrativeUnitRef} &middot; {nc.themes.join(', ')}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── Related words ── */}
        {relatedWords.length > 0 && (
          <div className="mb-10">
            <h2 className="flex items-center gap-2 mb-4" style={{ fontFamily: font.display, fontSize: '20px', fontWeight: 400, color: 'var(--selah-text-1, #E8E2D9)' }}>
              <span style={{ width: '3px', height: '18px', borderRadius: '2px', backgroundColor: accent }} />
              Related words
            </h2>
            <div className="space-y-2">
              {relatedWords.map((rw) => (
                <button
                  key={rw.strongsNumber}
                  onClick={() => onOpenEntry?.(rw.strongsNumber)}
                  className="flex items-baseline gap-3 w-full text-left rounded-lg transition-colors duration-150"
                  style={{
                    padding: '10px 14px',
                    background: 'none', border: 'none', cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                >
                  <span style={{ fontFamily: font.mono, fontSize: '12px', color: accent }}>{rw.strongsNumber}</span>
                  <span style={{ fontSize: '20px', color: 'var(--selah-text-1, #E8E2D9)' }}>{rw.originalScript}</span>
                  <span style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-2, #A39E93)' }}>{rw.transliteration}</span>
                  <span style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-3, #6E695F)' }}>&mdash; {rw.shortGloss}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <ConnectedAIPanel />
      <AIToggleButton />
    </div>
    </ChatProvider>
  )
}
