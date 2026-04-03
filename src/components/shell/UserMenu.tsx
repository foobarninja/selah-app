'use client'

interface UserMenuProps {
  user?: { name: string; avatarUrl?: string }
  isCollapsed: boolean
  onLogout?: () => void
}

export function UserMenu({ user, isCollapsed, onLogout }: UserMenuProps) {
  if (!user) return null

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className="mx-2 mb-2 rounded-md transition-colors duration-150"
      style={{
        borderTop: '1px solid var(--nav-border)',
        paddingTop: '12px',
      }}
    >
      <button
        onClick={onLogout}
        title={isCollapsed ? user.name : undefined}
        className="flex items-center gap-3 w-full rounded-md transition-colors duration-150"
        style={{
          padding: isCollapsed ? '8px 0' : '8px 12px',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          color: 'var(--nav-text)',
        }}
      >
        {/* Avatar */}
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
          <span
            className="text-sm truncate"
            style={{
              fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
              fontWeight: 400,
            }}
          >
            {user.name}
          </span>
        )}
      </button>
    </div>
  )
}
