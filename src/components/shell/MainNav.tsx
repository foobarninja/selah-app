'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type LucideIcon, ChevronsLeft, ChevronsRight, Circle } from 'lucide-react'

export interface NavigationItem {
  id: string
  label: string
  icon?: LucideIcon
  href: string
}

interface MainNavProps {
  items: NavigationItem[]
  isCollapsed: boolean
  onToggleCollapse: () => void
  onNavClick?: () => void
}

export function MainNav({
  items,
  isCollapsed,
  onToggleCollapse,
  onNavClick,
}: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col flex-1 py-2 gap-0.5 overflow-y-auto">
      {items.map((item, index) => {
        const Icon = item.icon || Circle
        const itemId = item.id || item.href || `nav-${index}`
        const isActive =
          item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href)

        return (
          <Link
            key={itemId}
            href={item.href}
            onClick={onNavClick}
            title={isCollapsed ? item.label : undefined}
            className="group relative flex items-center gap-3 rounded-md mx-2 transition-colors duration-150"
            style={{
              padding: isCollapsed ? '10px 0' : '10px 12px',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              backgroundColor: isActive
                ? 'var(--nav-active-bg)'
                : 'transparent',
              color: isActive
                ? 'var(--nav-active-text)'
                : 'var(--nav-text)',
            }}
          >
            {/* Active indicator — gold left border */}
            {isActive && (
              <span
                className="absolute left-0 top-2 bottom-2 rounded-r-sm"
                style={{
                  width: '3px',
                  backgroundColor: 'var(--selah-gold-500, #C6A23C)',
                }}
              />
            )}

            <Icon
              size={20}
              strokeWidth={isActive ? 2 : 1.5}
              style={{
                flexShrink: 0,
                color: isActive
                  ? 'var(--selah-gold-500, #C6A23C)'
                  : undefined,
              }}
            />

            {!isCollapsed && (
              <span
                className="text-sm truncate"
                style={{
                  fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {item.label}
              </span>
            )}
          </Link>
        )
      })}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Collapse toggle */}
      <button
        onClick={onToggleCollapse}
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="flex items-center gap-3 rounded-md mx-2 transition-colors duration-150"
        style={{
          padding: isCollapsed ? '10px 0' : '10px 12px',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          color: 'var(--nav-text-secondary)',
        }}
      >
        {isCollapsed ? (
          <ChevronsRight size={18} strokeWidth={1.5} />
        ) : (
          <>
            <ChevronsLeft size={18} strokeWidth={1.5} />
            <span
              className="text-xs"
              style={{
                fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
              }}
            >
              Collapse
            </span>
          </>
        )}
      </button>
    </nav>
  )
}
