'use client'

import { useState, useMemo } from 'react'
import { Search, X, RefreshCw } from 'lucide-react'
import type {
  CharactersProps,
  CharacterSummary,
  Era,
} from './types'

/* ── Fonts ── */
const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

/* ── Era pill colors — warm, muted tones that don't imply hierarchy ── */
const eraColors: Record<string, { bg: string; text: string }> = {
  patriarchal:     { bg: 'var(--selah-gold-50, #FBF3E0)',  text: 'var(--selah-gold-700, #7A5C1F)' },
  exodus:          { bg: 'var(--selah-terra-50, #FDF5F3)',  text: 'var(--selah-terra-600, #8B4533)' },
  judges:          { bg: 'var(--selah-sage-50, #F5F5ED)',   text: 'var(--selah-sage-600, #5A5D3C)' },
  monarchy:        { bg: 'var(--selah-teal-50, #EFF8F6)',   text: 'var(--selah-teal-600, #2B6B5A)' },
  exile:           { bg: 'var(--selah-warmth-50, #FAF0E6)', text: 'var(--selah-warmth-700, #8B6B3E)' },
  'life-of-christ':{ bg: 'var(--selah-gold-50, #FBF3E0)',  text: 'var(--selah-gold-700, #7A5C1F)' },
  'early-church':  { bg: 'var(--selah-sky-50, #EEF2F7)',   text: 'var(--selah-sky-700, #4A6380)' },
}

/* ── Era pill ── */
function EraPill({ era }: { era: Era }) {
  const colors = eraColors[era] || eraColors.monarchy
  const label = era.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    .replace('Of Christ', 'of Christ')

  return (
    <span
      className="inline-flex items-center"
      style={{
        padding: '2px 8px',
        borderRadius: '10px',
        fontSize: '11px',
        fontWeight: 500,
        fontFamily: font.body,
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      {label}
    </span>
  )
}

/* ── Discover card ── */
function DiscoverCardComponent({
  card,
  onOpen,
  onRefresh,
}: {
  card: CharactersProps['discoverCard']
  onOpen?: () => void
  onRefresh?: () => void
}) {
  return (
    <div
      className="rounded-xl relative overflow-hidden"
      style={{
        backgroundColor: 'var(--selah-bg-elevated, #292524)',
        borderLeft: '4px solid var(--selah-terra-400, #C47A63)',
        padding: '24px 28px',
        marginBottom: '24px',
      }}
    >
      {/* Refresh button */}
      <button
        onClick={onRefresh}
        title="Show another character"
        className="absolute top-4 right-4 transition-opacity duration-150 opacity-40 hover:opacity-80"
        style={{
          color: 'var(--selah-text-3, #6E695F)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <RefreshCw size={14} strokeWidth={1.5} />
      </button>

      <p
        style={{
          fontFamily: font.body,
          fontSize: '10px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          color: 'var(--selah-terra-400, #C47A63)',
          marginBottom: '10px',
        }}
      >
        Discover
      </p>

      <p
        style={{
          fontFamily: font.display,
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: 1.6,
          color: 'var(--selah-text-1, #E8E2D9)',
          marginBottom: '12px',
        }}
      >
        {card.hook}
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpen}
          className="transition-colors duration-150"
          style={{
            fontFamily: font.body,
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--selah-terra-400, #C47A63)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          Meet {card.name} &rarr;
        </button>
        <EraPill era={card.era} />
      </div>
    </div>
  )
}

/* ── Filter chip ── */
function FilterChip({
  label,
  isActive,
  onToggle,
}: {
  label: string
  isActive: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className="shrink-0 transition-all duration-150"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isActive ? '4px' : '0',
        padding: '5px 14px',
        borderRadius: '16px',
        fontSize: '13px',
        fontWeight: 500,
        fontFamily: font.body,
        cursor: 'pointer',
        backgroundColor: isActive
          ? 'var(--selah-terra-800, #5C2D21)'
          : 'transparent',
        color: isActive
          ? 'var(--selah-terra-200, #E2BBB0)'
          : 'var(--selah-text-2, #A39E93)',
        border: isActive
          ? '1px solid var(--selah-terra-400, #C47A63)'
          : '1px solid var(--selah-border-color, #3D3835)',
      }}
    >
      {label}
      {isActive && <X size={12} strokeWidth={2} />}
    </button>
  )
}

/* ── Character card ── */
function CharacterCard({
  character,
  onOpen,
}: {
  character: CharacterSummary
  onOpen?: () => void
}) {
  const statusLabels: Record<string, string> = {
    royalty: 'Royalty',
    priest: 'Priest',
    outcast: 'Outcast',
    common: 'Common',
    military: 'Military',
  }

  return (
    <button
      onClick={onOpen}
      className="w-full text-left rounded-lg transition-all duration-150 group"
      style={{
        backgroundColor: 'var(--selah-bg-surface, #1C1917)',
        border: '1px solid var(--selah-border-color, #3D3835)',
        padding: '16px',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-terra-400, #C47A63)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-border-color, #3D3835)'
      }}
    >
      {/* Name */}
      <p
        style={{
          fontFamily: font.display,
          fontSize: '18px',
          fontWeight: 500,
          color: 'var(--selah-text-1, #E8E2D9)',
          marginBottom: '4px',
        }}
      >
        {character.name}
      </p>

      {/* Bio brief */}
      <p
        className="line-clamp-2"
        style={{
          fontFamily: font.body,
          fontSize: '13px',
          lineHeight: 1.6,
          color: 'var(--selah-text-2, #A39E93)',
          marginBottom: '10px',
        }}
      >
        {character.bioBrief}
      </p>

      {/* Era + status */}
      <div className="flex items-center gap-2">
        <EraPill era={character.era} />
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
          {statusLabels[character.socialStatus] || character.socialStatus}
        </span>
      </div>
    </button>
  )
}

/* ════════════════════════════════════════════
   Main CharacterBrowser Component
   ════════════════════════════════════════════ */

export function CharacterBrowser({
  discoverCard,
  characters,
  filters,
  activeFilters,
  searchQuery,
  onOpenProfile,
  onSearch,
  onToggleFilter,
  onClearFilters,
  onRefreshDiscover,
}: CharactersProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery || '')
  const [localFilters, setLocalFilters] = useState<string[]>(activeFilters || [])

  // Build a flat list of all filter options with their category
  const allFilterOptions = useMemo(() => {
    const options: { category: string; value: string; label: string }[] = []
    for (const [category, opts] of Object.entries(filters)) {
      for (const opt of opts) {
        options.push({ category, value: `${category}:${opt.value}`, label: opt.label })
      }
    }
    return options
  }, [filters])

  // Filter characters based on search and active filters
  const filteredCharacters = useMemo(() => {
    let result = characters

    // Search filter
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.bioBrief.toLowerCase().includes(q)
      )
    }

    // Active filter chips
    if (localFilters.length > 0) {
      result = result.filter((c) => {
        return localFilters.every((f) => {
          const [category, value] = f.split(':')
          switch (category) {
            case 'era': return c.era === value
            case 'testament': return c.testament === value
            case 'roleType': return c.roleType === value
            case 'socialStatus': return c.socialStatus === value
            default: return true
          }
        })
      })
    }

    return result
  }, [characters, localSearch, localFilters])

  const handleToggleFilter = (filterKey: string, category: string, value: string) => {
    setLocalFilters((prev) =>
      prev.includes(filterKey)
        ? prev.filter((f) => f !== filterKey)
        : [...prev, filterKey]
    )
    onToggleFilter?.(category, value)
  }

  const handleClearFilters = () => {
    setLocalFilters([])
    onClearFilters?.()
  }

  return (
    <div
      className="h-full overflow-y-auto"
      style={{ padding: '28px 32px' }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Page title */}
        <h1
          style={{
            fontFamily: font.display,
            fontWeight: 300,
            fontSize: '36px',
            letterSpacing: '0.5px',
            color: 'var(--selah-text-1, #E8E2D9)',
            marginBottom: '24px',
          }}
        >
          Characters
        </h1>

        {/* Discover card */}
        <DiscoverCardComponent
          card={discoverCard}
          onOpen={() => onOpenProfile?.(discoverCard.characterId)}
          onRefresh={onRefreshDiscover}
        />

        {/* Search bar */}
        <div
          className="flex items-center gap-3 rounded-lg mb-4"
          style={{
            backgroundColor: 'var(--selah-bg-surface, #1C1917)',
            border: '1px solid var(--selah-border-color, #3D3835)',
            padding: '10px 16px',
          }}
        >
          <Search
            size={16}
            strokeWidth={1.5}
            style={{ color: 'var(--selah-text-3, #6E695F)', flexShrink: 0 }}
          />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value)
              onSearch?.(e.target.value)
            }}
            placeholder="Search characters..."
            className="flex-1 outline-none"
            style={{
              fontFamily: font.body,
              fontSize: '14px',
              color: 'var(--selah-text-1, #E8E2D9)',
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          {localSearch && (
            <button
              onClick={() => {
                setLocalSearch('')
                onSearch?.('')
              }}
              style={{
                color: 'var(--selah-text-3, #6E695F)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <X size={14} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2" style={{ scrollbarWidth: 'none' }}>
          {allFilterOptions.map((opt) => (
            <FilterChip
              key={opt.value}
              label={opt.label}
              isActive={localFilters.includes(opt.value)}
              onToggle={() => handleToggleFilter(opt.value, opt.category, opt.value.split(':')[1])}
            />
          ))}
          {localFilters.length > 0 && (
            <button
              onClick={handleClearFilters}
              className="shrink-0 transition-colors duration-150"
              style={{
                fontFamily: font.body,
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--selah-text-3, #6E695F)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: '2px',
              }}
            >
              Clear all
            </button>
          )}
        </div>

        {/* Results count */}
        <p
          style={{
            fontFamily: font.body,
            fontSize: '12px',
            color: 'var(--selah-text-3, #6E695F)',
            marginBottom: '16px',
          }}
        >
          {filteredCharacters.length} character{filteredCharacters.length !== 1 ? 's' : ''}
          {localFilters.length > 0 || localSearch ? ' matching' : ''}
        </p>

        {/* Character card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onOpen={() => onOpenProfile?.(character.id)}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredCharacters.length === 0 && (
          <div
            className="text-center py-16"
            style={{ color: 'var(--selah-text-3, #6E695F)' }}
          >
            <p
              style={{
                fontFamily: font.display,
                fontSize: '18px',
                fontWeight: 400,
                marginBottom: '8px',
                color: 'var(--selah-text-2, #A39E93)',
              }}
            >
              Nothing matched
            </p>
            <p style={{ fontFamily: font.body, fontSize: '14px' }}>
              Try different terms or adjust your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
