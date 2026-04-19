'use client'

const font = {
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

interface ProfileAvatarProps {
  name: string
  color: string
  size?: number
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function ProfileAvatar({ name, color, size = 56 }: ProfileAvatarProps) {
  const initials = initialsOf(name)
  return (
    <div
      aria-hidden
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: color,
        color: 'var(--selah-bg-page, #0F0D0B)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: font.body,
        fontWeight: 600,
        fontSize: `${Math.round(size * 0.4)}px`,
        letterSpacing: '0.5px',
      }}
    >
      {initials}
    </div>
  )
}
