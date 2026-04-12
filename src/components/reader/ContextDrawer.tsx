'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, PanelRightClose } from 'lucide-react'
import { TierPill } from './TierPill'
import type {
  CharacterAppearance,
  ThemeAnnotation,
  ClimateContext,
  CrossReference,
  Commentary,
} from './types'

/* ── Fonts ── */
const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
  mono: "var(--selah-font-mono, 'JetBrains Mono', monospace)",
}

/* ── Collapsible section ── */
function DrawerSection({
  title,
  accentColor,
  defaultOpen = false,
  children,
}: {
  title: string
  accentColor: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div style={{ borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full transition-colors duration-150"
        style={{
          padding: '14px 16px',
          backgroundColor: 'transparent',
          color: 'var(--selah-text-1, #E8E2D9)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            width: '3px',
            height: '16px',
            borderRadius: '2px',
            backgroundColor: accentColor,
            flexShrink: 0,
          }}
        />
        <span
          className="flex-1 text-left"
          style={{ fontFamily: font.display, fontSize: '14px', fontWeight: 600 }}
        >
          {title}
        </span>
        {isOpen ? (
          <ChevronDown size={14} style={{ color: 'var(--selah-text-3, #6E695F)' }} />
        ) : (
          <ChevronRight size={14} style={{ color: 'var(--selah-text-3, #6E695F)' }} />
        )}
      </button>
      {isOpen && (
        <div style={{ padding: '0 16px 16px 27px' }}>{children}</div>
      )}
    </div>
  )
}

/* ── Scene cast character card ── */
function CastCard({
  appearance,
  onOpenProfile,
}: {
  appearance: CharacterAppearance
  onOpenProfile?: () => void
}) {
  return (
    <div
      className="rounded-lg mb-2"
      style={{
        backgroundColor: 'var(--selah-bg-elevated, #292524)',
        padding: '12px',
      }}
    >
      <div className="flex items-baseline gap-2 mb-1">
        <button
          onClick={onOpenProfile}
          className="transition-colors duration-150"
          style={{
            fontFamily: font.body,
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--selah-terra-400, #C47A63)',
            background: 'none',
            border: 'none',
            cursor: onOpenProfile ? 'pointer' : 'default',
            padding: 0,
            textDecoration: onOpenProfile ? 'underline' : 'none',
            textDecorationColor: 'transparent',
            textUnderlineOffset: '2px',
          }}
          onMouseEnter={(e) => {
            if (onOpenProfile) (e.target as HTMLElement).style.textDecorationColor = 'var(--selah-terra-400)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.textDecorationColor = 'transparent'
          }}
        >
          {appearance.name}
        </button>
        <span
          style={{
            fontFamily: font.body,
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--selah-text-3, #6E695F)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {appearance.role}
        </span>
      </div>
      <p
        style={{
          fontFamily: font.body,
          fontSize: '13px',
          color: 'var(--selah-text-2, #A39E93)',
          lineHeight: 1.6,
          marginBottom: '4px',
        }}
      >
        <span style={{ color: 'var(--selah-text-3, #6E695F)' }}>Feeling:</span>{' '}
        {appearance.emotion}
      </p>
      <p
        style={{
          fontFamily: font.body,
          fontSize: '13px',
          color: 'var(--selah-text-2, #A39E93)',
          lineHeight: 1.6,
          marginBottom: '6px',
        }}
      >
        <span style={{ color: 'var(--selah-text-3, #6E695F)' }}>Stakes:</span>{' '}
        {appearance.stakes}
      </p>
      <p
        style={{
          fontFamily: font.body,
          fontSize: '12px',
          color: 'var(--selah-modern-bridge, #C47A63)',
          fontStyle: 'italic',
          lineHeight: 1.5,
        }}
      >
        {appearance.modernParallel}
      </p>
    </div>
  )
}

/* ── Main context drawer ── */

interface ContextDrawerProps {
  sceneCast: CharacterAppearance[]
  themes: ThemeAnnotation[]
  climateContexts: ClimateContext[]
  crossReferences: CrossReference[]
  commentaries: Commentary[]
  /** Initial expand state for "Additional commentaries" — from user settings */
  showExtendedCommentaryByDefault?: boolean
  onClose?: () => void
  onOpenCharacterProfile?: (characterId: string) => void
  onOpenThemeDetail?: (themeId: string) => void
  onFollowCrossReference?: (crossRefId: string) => void
}

export function ContextDrawer({
  sceneCast,
  themes,
  climateContexts,
  crossReferences,
  commentaries,
  showExtendedCommentaryByDefault = false,
  onClose,
  onOpenCharacterProfile,
  onOpenThemeDetail,
  onFollowCrossReference,
}: ContextDrawerProps) {
  const [showExtended, setShowExtended] = useState(showExtendedCommentaryByDefault)
  const curatedCommentaries = commentaries.filter((c) => c.displayTier === 'curated')
  const extendedCommentaries = commentaries.filter((c) => c.displayTier === 'extended')

  return (
    <aside
      className="flex flex-col h-full"
      style={{
        borderLeft: '1px solid var(--selah-border-color, #3D3835)',
        backgroundColor: 'var(--selah-bg-page, #0F0D0B)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{
          padding: '16px 16px 12px',
          borderBottom: '1px solid var(--selah-border-color, #3D3835)',
        }}
      >
        <span
          style={{
            fontFamily: font.display,
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--selah-text-2, #A39E93)',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
          }}
        >
          Context
        </span>
        <button
          onClick={onClose}
          className="transition-colors duration-150"
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            color: 'var(--selah-text-3, #6E695F)',
          }}
        >
          <PanelRightClose size={16} strokeWidth={1.5} />
        </button>
      </div>

      {/* Scrollable sections */}
      <div className="flex-1 overflow-y-auto">
        {/* Scene cast — relational lens */}
        <DrawerSection
          title="Scene cast"
          accentColor="var(--selah-terra-400, #C47A63)"
          defaultOpen={true}
        >
          {sceneCast.map((appearance, idx) => (
            <CastCard
              key={`${appearance.characterId}-${idx}`}
              appearance={appearance}
              onOpenProfile={
                onOpenCharacterProfile
                  ? () => onOpenCharacterProfile(appearance.characterId)
                  : undefined
              }
            />
          ))}
        </DrawerSection>

        {/* Themes — conceptual lens */}
        <DrawerSection
          title="Themes"
          accentColor="var(--selah-teal-400, #4A9E88)"
        >
          {themes.map((theme) => (
            <div key={theme.themeId} className="mb-3">
              <button
                onClick={() => onOpenThemeDetail?.(theme.themeId)}
                className="transition-colors duration-150"
                style={{
                  fontFamily: font.body,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--selah-teal-400, #4A9E88)',
                  marginBottom: '4px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'block',
                }}
              >
                {theme.name}
              </button>
              <p
                style={{
                  fontFamily: font.body,
                  fontSize: '13px',
                  color: 'var(--selah-text-2, #A39E93)',
                  lineHeight: 1.6,
                }}
              >
                {theme.annotation}
              </p>
              <div className="mt-1.5">
                <TierPill tier={theme.sourceTier} />
              </div>
            </div>
          ))}
        </DrawerSection>

        {/* Climate — climate lens */}
        <DrawerSection
          title="Climate"
          accentColor="var(--selah-sage-400, #8A8E64)"
        >
          {climateContexts.map((ctx) => (
            <div key={ctx.id} className="mb-3">
              <p
                style={{
                  fontFamily: font.body,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--selah-sage-400, #8A8E64)',
                  marginBottom: '4px',
                }}
              >
                {ctx.title}
              </p>
              <p
                style={{
                  fontFamily: font.body,
                  fontSize: '13px',
                  color: 'var(--selah-text-2, #A39E93)',
                  lineHeight: 1.6,
                }}
              >
                {ctx.content}
              </p>
              <div className="mt-1.5">
                <TierPill tier={ctx.sourceTier} />
              </div>
            </div>
          ))}
        </DrawerSection>

        {/* Cross-references */}
        <DrawerSection
          title="Cross-references"
          accentColor="var(--selah-gold-500, #C6A23C)"
        >
          {crossReferences.map((xref) => (
            <button
              key={xref.id}
              onClick={() => onFollowCrossReference?.(xref.id)}
              className="block w-full text-left mb-2.5 transition-colors duration-150"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <div className="flex items-baseline justify-between mb-0.5">
                <p
                  style={{
                    fontFamily: font.body,
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--selah-text-1, #E8E2D9)',
                  }}
                >
                  {xref.targetPassage}
                </p>
                <span
                  style={{
                    fontFamily: font.mono,
                    fontSize: '10px',
                    color: 'var(--selah-gold-500, #C6A23C)',
                  }}
                >
                  {xref.relevanceScore}
                </span>
              </div>
              <p
                style={{
                  fontFamily: font.body,
                  fontSize: '12px',
                  color: 'var(--selah-text-2, #A39E93)',
                  lineHeight: 1.5,
                  fontStyle: 'italic',
                }}
              >
                {xref.snippet}
              </p>
            </button>
          ))}
        </DrawerSection>

        {/* Commentary */}
        <DrawerSection
          title="Commentary"
          accentColor="var(--selah-teal-600, #2B6B5A)"
        >
          {curatedCommentaries.map((comm) => (
            <div key={comm.id} className="mb-3">
              <p
                style={{
                  fontFamily: font.body,
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--selah-text-1, #E8E2D9)',
                  marginBottom: '4px',
                }}
              >
                {comm.author}
              </p>
              <p
                style={{
                  fontFamily: font.body,
                  fontSize: '12px',
                  color: 'var(--selah-text-2, #A39E93)',
                  lineHeight: 1.6,
                }}
              >
                {comm.excerpt}
              </p>
              <div className="mt-1.5">
                <TierPill tier={comm.sourceTier} />
              </div>
            </div>
          ))}

          {extendedCommentaries.length > 0 && (
            <>
              <button
                onClick={() => setShowExtended(!showExtended)}
                style={{
                  fontFamily: font.body,
                  fontSize: '12px',
                  color: 'var(--selah-text-3, #6E695F)',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px',
                  padding: 0,
                }}
              >
                {showExtended ? 'Hide additional commentaries' : 'Additional commentaries'}
              </button>

              {showExtended &&
                extendedCommentaries.map((comm) => (
                  <div key={comm.id} className="mt-3">
                    <p
                      style={{
                        fontFamily: font.body,
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--selah-text-1, #E8E2D9)',
                        marginBottom: '4px',
                      }}
                    >
                      {comm.author}
                    </p>
                    <p
                      style={{
                        fontFamily: font.body,
                        fontSize: '12px',
                        color: 'var(--selah-text-2, #A39E93)',
                        lineHeight: 1.6,
                      }}
                    >
                      {comm.excerpt}
                    </p>
                    <div className="mt-1.5">
                      <TierPill tier={comm.sourceTier} />
                    </div>
                  </div>
                ))}
            </>
          )}
        </DrawerSection>
      </div>
    </aside>
  )
}
