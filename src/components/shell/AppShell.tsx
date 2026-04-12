'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { MainNav } from './MainNav'
import { UserMenu } from './UserMenu'
import { navigationItems } from './navigation'

interface AppShellProps {
  children: React.ReactNode
  user?: { name: string; avatarUrl?: string }
  isAIConfigured?: boolean
  onLogout?: () => void
}

const COLLAPSE_KEY = 'selah-sidebar-collapsed'
const SIDEBAR_EXPANDED = 240
const SIDEBAR_COLLAPSED = 64

export default function AppShell({
  children,
  user,
  isAIConfigured = false,
  onLogout,
}: AppShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COLLAPSE_KEY) === 'true'
    setIsCollapsed(stored)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(COLLAPSE_KEY, String(isCollapsed))
  }, [isCollapsed, hydrated])

  const sidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED

  return (
    <div
      className="h-screen flex overflow-hidden"
      style={{
        backgroundColor: 'var(--selah-bg-page, #0F0D0B)',
        color: 'var(--selah-text-1, #E8E2D9)',
      }}
    >
      {/* Mobile top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-40 flex items-center md:hidden"
        style={{
          height: '56px',
          backgroundColor: 'var(--selah-bg-surface, #1C1917)',
          borderBottom: '1px solid var(--selah-border-color, #3D3835)',
        }}
      >
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-4"
          style={{ color: 'var(--selah-text-2, #A39E93)' }}
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
        <span
          className="mx-auto"
          style={{
            fontFamily: "var(--selah-font-display, 'Cormorant Garamond', serif)",
            fontWeight: 300,
            fontSize: '18px',
            letterSpacing: '8px',
            textTransform: 'uppercase' as const,
            color: 'var(--selah-text-1, #E8E2D9)',
          }}
        >
          S
        </span>
        <div className="w-12" /> {/* Balance the hamburger */}
      </div>

      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(15, 13, 11, 0.6)' }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col ${hydrated ? 'transition-all duration-250 ease-out' : ''} md:relative md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{
          width: `${isMobileOpen ? SIDEBAR_EXPANDED : sidebarWidth}px`,
          backgroundColor: 'var(--selah-bg-surface, #1C1917)',
          borderRight: '1px solid var(--selah-border-color, #3D3835)',
          '--nav-text': 'var(--selah-text-1, #E8E2D9)',
          '--nav-text-secondary': 'var(--selah-text-3, #6E695F)',
          '--nav-border': 'var(--selah-border-color, #3D3835)',
          '--nav-active-bg': 'var(--selah-gold-active-bg, var(--selah-gold-900, #4A3711))',
          '--nav-active-text': 'var(--selah-gold-active-text, var(--selah-gold-300, #E8C767))',
        } as React.CSSProperties}
      >
        {/* Mobile close button */}
        <div className="md:hidden flex justify-end p-2">
          <button
            onClick={() => setIsMobileOpen(false)}
            style={{ color: 'var(--selah-text-3, #6E695F)' }}
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Brand */}
        <div
          className="flex items-center shrink-0"
          style={{
            height: '64px',
            padding: isCollapsed && !isMobileOpen ? '0' : '0 20px',
            justifyContent: isCollapsed && !isMobileOpen ? 'center' : 'flex-start',
          }}
        >
          <span
            style={{
              fontFamily: "var(--selah-font-display, 'Cormorant Garamond', serif)",
              fontWeight: 300,
              fontSize: isCollapsed && !isMobileOpen ? '24px' : '16px',
              letterSpacing: isCollapsed && !isMobileOpen ? '4px' : '12px',
              textTransform: 'uppercase' as const,
              color: 'var(--selah-text-1, #E8E2D9)',
            }}
          >
            {isCollapsed && !isMobileOpen ? 'S' : 'Selah'}
          </span>
        </div>

        {/* Navigation */}
        <MainNav
          items={navigationItems}
          isCollapsed={isCollapsed && !isMobileOpen}
          onToggleCollapse={() => {
            setIsCollapsed((c) => !c)
            setIsMobileOpen(false)
          }}
          onNavClick={() => setIsMobileOpen(false)}
        />

        {/* User menu */}
        <UserMenu
          user={user}
          isCollapsed={isCollapsed && !isMobileOpen}
          onLogout={onLogout}
        />
      </aside>

      {/* Content area */}
      <main
        className="flex-1 overflow-auto relative"
        style={{
          paddingTop: '0',
        }}
      >
        {/* Mobile spacer for top bar */}
        <div className="h-14 md:hidden" />

        <div className="max-w-7xl mx-auto w-full h-full">
          {children}
        </div>
      </main>
    </div>
  )
}
