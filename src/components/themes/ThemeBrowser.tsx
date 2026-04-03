'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { Search, X, RefreshCw } from 'lucide-react'
import type {
  ThemesProps,
  CategoryGroup,
  ThemeSummary,
  ChildTheme,
} from './types'

/* ── Fonts ── */
const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

/* ── Thread prompt (discover equivalent) ── */
function ThreadPromptCard({
  prompt,
  onOpen,
  onRefresh,
}: {
  prompt: ThemesProps['threadPrompt']
  onOpen?: () => void
  onRefresh?: () => void
}) {
  return (
    <div
      className="rounded-xl relative overflow-hidden"
      style={{
        backgroundColor: 'var(--selah-bg-elevated, #292524)',
        borderLeft: '4px solid var(--selah-teal-400, #4A9E88)',
        padding: '24px 28px',
        marginBottom: '24px',
      }}
    >
      <button
        onClick={onRefresh}
        title="Show another thread"
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
          color: 'var(--selah-teal-400, #4A9E88)',
          marginBottom: '10px',
        }}
      >
        Trace this thread
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
        {prompt.hook}
      </p>

      <button
        onClick={onOpen}
        className="transition-colors duration-150"
        style={{
          fontFamily: font.body,
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--selah-teal-400, #4A9E88)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
        }}
      >
        Explore {prompt.name} &rarr;
      </button>
    </div>
  )
}

/* ── Child theme pill ── */
function ChildPill({
  child,
  onOpen,
}: {
  child: ChildTheme
  onOpen?: () => void
}) {
  return (
    <button
      onClick={onOpen}
      className="transition-opacity duration-150 hover:opacity-80"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: '10px',
        fontSize: '12px',
        fontWeight: 500,
        fontFamily: font.body,
        backgroundColor: 'var(--selah-teal-800, #1A4539)',
        color: 'var(--selah-teal-200, #93CBBD)',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {child.name}
    </button>
  )
}

/* ── Theme row in the clustered map ── */
function ThemeRow({
  theme,
  onOpen,
  onOpenChild,
}: {
  theme: ThemeSummary
  onOpen?: () => void
  onOpenChild?: (childId: string) => void
}) {
  return (
    <div className="mb-4">
      <button
        onClick={onOpen}
        className="block w-full text-left group transition-colors duration-150"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <span
          className="group-hover:underline"
          style={{
            fontFamily: font.display,
            fontSize: '18px',
            fontWeight: 500,
            color: 'var(--selah-text-1, #E8E2D9)',
            textUnderlineOffset: '3px',
            textDecorationColor: 'var(--selah-teal-400, #4A9E88)',
          }}
        >
          {theme.name}
        </span>
        <span
          className="block mt-1"
          style={{
            fontFamily: font.body,
            fontSize: '13px',
            lineHeight: 1.5,
            color: 'var(--selah-text-3, #6E695F)',
          }}
        >
          {theme.modernFraming}
        </span>
      </button>

      {theme.children.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2 pl-4">
          {theme.children.map((child) => (
            <ChildPill
              key={child.id}
              child={child}
              onOpen={() => onOpenChild?.(child.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Category section ── */
function CategorySection({
  category,
  onOpenTheme,
}: {
  category: CategoryGroup
  onOpenTheme?: (themeId: string) => void
}) {
  return (
    <section id={`theme-cat-${category.id}`} className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <span
          style={{
            width: '3px',
            height: '20px',
            borderRadius: '2px',
            backgroundColor: 'var(--selah-teal-400, #4A9E88)',
            flexShrink: 0,
          }}
        />
        <h2
          style={{
            fontFamily: font.display,
            fontSize: '24px',
            fontWeight: 400,
            color: 'var(--selah-text-1, #E8E2D9)',
          }}
        >
          {category.label}
        </h2>
        <span
          style={{
            fontFamily: font.body,
            fontSize: '12px',
            color: 'var(--selah-text-3, #6E695F)',
          }}
        >
          {category.themes.length}
        </span>
      </div>

      <div className="pl-2">
        {category.themes.map((theme) => (
          <ThemeRow
            key={theme.id}
            theme={theme}
            onOpen={() => onOpenTheme?.(theme.id)}
            onOpenChild={(childId) => onOpenTheme?.(childId)}
          />
        ))}
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   Main ThemeBrowser Component
   ════════════════════════════════════════════ */

export function ThemeBrowser({
  threadPrompt,
  categories,
  activeFilters,
  searchQuery,
  onOpenProfile,
  onSearch,
  onToggleFilter,
  onClearFilters,
  onRefreshThread,
}: ThemesProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery || '')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const allThemes = useMemo(() => {
    const result: { theme: ThemeSummary; categoryLabel: string }[] = []
    for (const cat of categories) {
      for (const theme of cat.themes) {
        result.push({ theme, categoryLabel: cat.label })
      }
    }
    return result
  }, [categories])

  const searchResults = useMemo(() => {
    if (!localSearch.trim()) return null
    const q = localSearch.toLowerCase()
    return allThemes.filter(
      ({ theme }) =>
        theme.name.toLowerCase().includes(q) ||
        theme.modernFraming.toLowerCase().includes(q) ||
        theme.children.some((c) => c.name.toLowerCase().includes(q))
    )
  }, [allThemes, localSearch])

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId)
    const el = document.getElementById(`theme-cat-${catId}`)
    if (el && scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const offset = el.offsetTop - container.offsetTop - 120
      container.scrollTo({ top: offset, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop + 160
      let current: string | null = null
      for (const cat of categories) {
        const el = document.getElementById(`theme-cat-${cat.id}`)
        if (el && el.offsetTop - container.offsetTop <= scrollTop) {
          current = cat.id
        }
      }
      if (current !== activeCategory) {
        setActiveCategory(current)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [categories, activeCategory])

  return (
    <div
      ref={scrollContainerRef}
      className="h-full overflow-y-auto"
      style={{ padding: '28px 32px' }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
          Themes
        </h1>

        <ThreadPromptCard
          prompt={threadPrompt}
          onOpen={() => onOpenProfile?.(threadPrompt.themeId)}
          onRefresh={onRefreshThread}
        />

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
            placeholder="Search themes..."
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

        <div
          className="sticky z-10 flex items-center gap-1 overflow-x-auto pb-3 mb-6"
          style={{
            top: 0,
            paddingTop: '8px',
            backgroundColor: 'var(--selah-bg-page, #0F0D0B)',
            scrollbarWidth: 'none',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className="shrink-0 transition-all duration-150"
              style={{
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 500,
                fontFamily: font.body,
                cursor: 'pointer',
                border: 'none',
                backgroundColor:
                  activeCategory === cat.id
                    ? 'var(--selah-teal-800, #1A4539)'
                    : 'transparent',
                color:
                  activeCategory === cat.id
                    ? 'var(--selah-teal-200, #93CBBD)'
                    : 'var(--selah-text-3, #6E695F)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {searchResults ? (
          <div>
            <p
              style={{
                fontFamily: font.body,
                fontSize: '12px',
                color: 'var(--selah-text-3, #6E695F)',
                marginBottom: '16px',
              }}
            >
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &ldquo;{localSearch}&rdquo;
            </p>
            {searchResults.map(({ theme, categoryLabel }) => (
              <div key={theme.id} className="mb-4">
                <span
                  style={{
                    fontFamily: font.body,
                    fontSize: '10px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--selah-teal-400, #4A9E88)',
                  }}
                >
                  {categoryLabel}
                </span>
                <ThemeRow
                  theme={theme}
                  onOpen={() => onOpenProfile?.(theme.id)}
                  onOpenChild={(childId) => onOpenProfile?.(childId)}
                />
              </div>
            ))}
            {searchResults.length === 0 && (
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
                  Try different terms or explore a category.
                </p>
              </div>
            )}
          </div>
        ) : (
          categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              onOpenTheme={onOpenProfile}
            />
          ))
        )}
      </div>
    </div>
  )
}
