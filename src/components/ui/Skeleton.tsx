// Skeleton.tsx — Base Skeleton component + pre-composed page skeletons
// animate-shimmer is defined in tokens.css (gold shimmer sweep, adapts to dark/light mode)

interface SkeletonProps {
  variant: 'text' | 'heading' | 'paragraph' | 'avatar' | 'card'
  lines?: number      // paragraph variant only, default 3
  className?: string  // additional Tailwind classes
}

export function Skeleton({ variant, lines = 3, className = '' }: SkeletonProps) {
  const base = 'animate-shimmer rounded'

  if (variant === 'text') {
    return <div className={`${base} h-3 w-[70%] ${className}`} />
  }

  if (variant === 'heading') {
    return <div className={`${base} h-[18px] w-[40%] ${className}`} />
  }

  if (variant === 'avatar') {
    return <div className={`${base} rounded-full w-10 h-10 ${className}`} />
  }

  if (variant === 'card') {
    return <div className={`${base} h-[120px] w-full rounded-lg ${className}`} />
  }

  // paragraph — multiple bars with staggered animationDelay (0.1s per line)
  // Last line is 75%; others alternate 100% / 92%
  const bars = Array.from({ length: lines }, (_, i) => {
    const isLast = i === lines - 1
    const width = isLast ? '75%' : i % 2 === 0 ? '100%' : '92%'
    return (
      <div
        key={i}
        className={`${base} h-3`}
        style={{ width, animationDelay: `${i * 0.1}s` }}
      />
    )
  })

  return <div className={`flex flex-col gap-2 ${className}`}>{bars}</div>
}

// ── ReaderSkeleton ────────────────────────────────────────────────────────────

export function ReaderSkeleton() {
  const textBars = Array.from({ length: 18 }, (_, i) => (
    <div
      key={i}
      className="animate-shimmer rounded h-3 w-full"
      style={{ animationDelay: `${i * 0.1}s` }}
    />
  ))

  return (
    <div className="flex gap-6 w-full">
      {/* Main content */}
      <div className="flex-1 flex flex-col gap-3">
        <Skeleton variant="heading" />
        {textBars}
      </div>

      {/* Sidebar — hidden on mobile */}
      <div
        className="hidden md:flex flex-col gap-4"
        style={{
          width: '300px',
          flexShrink: 0,
          borderLeft: '1px solid var(--selah-border-color)',
          paddingLeft: '24px',
        }}
      >
        <Skeleton variant="heading" />
        <Skeleton variant="card" />
        <Skeleton variant="card" />
      </div>
    </div>
  )
}

// ── BrowseSkeleton ────────────────────────────────────────────────────────────

function SurfaceBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg"
      style={{
        backgroundColor: 'var(--selah-bg-surface, #1C1917)',
        padding: '20px',
      }}
    >
      {children}
    </div>
  )
}

export function BrowseSkeleton() {
  const cards = Array.from({ length: 9 }, (_, i) => (
    <SurfaceBox key={i}>
      <div className="flex flex-col gap-3">
        <Skeleton variant="text" />
        <Skeleton variant="paragraph" lines={2} />
      </div>
    </SurfaceBox>
  ))

  return (
    <div className="p-6">
      <Skeleton variant="heading" className="mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards}
      </div>
    </div>
  )
}

// ── SettingsSkeleton ──────────────────────────────────────────────────────────

function SettingsRow() {
  return (
    <div className="flex justify-between items-center">
      <div className="animate-shimmer rounded h-3" style={{ width: '30%' }} />
      <div className="animate-shimmer rounded h-3" style={{ width: '40%' }} />
    </div>
  )
}

export function SettingsSkeleton() {
  const sections = Array.from({ length: 3 }, (_, i) => (
    <div key={i} className="flex flex-col gap-4">
      <Skeleton variant="heading" />
      <SurfaceBox>
        <div className="flex flex-col gap-4">
          <SettingsRow />
          <SettingsRow />
          <SettingsRow />
          <SettingsRow />
        </div>
      </SurfaceBox>
    </div>
  ))

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col gap-8">
      {sections}
    </div>
  )
}

// ── DetailSkeleton ────────────────────────────────────────────────────────────

export function DetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col gap-4">
      <Skeleton variant="heading" />
      <Skeleton variant="paragraph" lines={5} />

      {/* Avatar row */}
      <div className="flex items-center gap-3 py-2">
        <Skeleton variant="avatar" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton variant="text" />
          <div className="animate-shimmer rounded h-3 w-[45%]" />
        </div>
      </div>

      <Skeleton variant="paragraph" lines={3} />
    </div>
  )
}
