'use client'

import { useState } from 'react'
import { LogOut } from 'lucide-react'

interface UserMenuProps {
  user?: { name: string; avatarUrl?: string }
  isCollapsed: boolean
}

export function UserMenu({ user, isCollapsed }: UserMenuProps) {
  const [loggingOut, setLoggingOut] = useState(false)

  if (!user) return null

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const logout = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    try {
      await fetch('/api/profiles/logout', { method: 'POST' })
    } finally {
      // Hard navigation so middleware re-runs against the now-cleared cookie
      // and server components re-render with no active profile.
      window.location.href = '/profiles'
    }
  }

  return (
    <div
      className="mx-2 mb-2 rounded-md transition-colors duration-150"
      style={{
        borderTop: '1px solid var(--nav-border)',
        paddingTop: '12px',
      }}
    >
      <button
        onClick={logout}
        disabled={loggingOut}
        title={isCollapsed ? `Sign out (${user.name})` : 'Sign out'}
        aria-label={`Sign out ${user.name}`}
        className="flex items-center gap-3 w-full rounded-md transition-colors duration-150 hover:bg-white/5"
        style={{
          padding: isCollapsed ? '8px 0' : '8px 12px',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          color: 'var(--nav-text)',
          cursor: loggingOut ? 'default' : 'pointer',
          opacity: loggingOut ? 0.6 : 1,
          background: 'transparent',
          border: 'none',
        }}
      >
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'var(--selah-gold-900, #4A3711)',
            color: 'var(--selah-gold-300, #E8C767)',
            fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        {!isCollapsed && (
          <>
            <span
              className="text-sm truncate flex-1 text-left"
              style={{
                fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
                fontWeight: 400,
              }}
            >
              {user.name}
            </span>
            <LogOut
              size={16}
              strokeWidth={1.5}
              style={{ color: 'var(--nav-text-secondary)' }}
            />
          </>
        )}
      </button>
    </div>
  )
}
