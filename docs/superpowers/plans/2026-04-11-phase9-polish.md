# Phase 9: Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship-ready polish — skeleton loading screens, error boundaries, animations, responsive fixes, and Docker HEALTHCHECK across the entire Selah app.

**Architecture:** Component-first approach. Build four reusable UI primitives (Skeleton, Toast, ConfirmDialog, PageTransition), then deploy them across every route. CSS-only animations via tokens.css keyframes — no animation library. Toast/ConfirmDialog use React context for app-wide access.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Vitest (node environment — existing tests in `tests/`)

**Design Spec:** `docs/superpowers/specs/2026-04-11-phase9-polish-design.md`

---

### Task 1: Add keyframes, variables, and utility classes to tokens.css

**Files:**
- Modify: `src/app/styles/tokens.css`

- [ ] **Step 1: Add shimmer gradient variables and resurface-quote variable to `:root`**

Add after line 82 (after `--selah-radius-lg: 12px;`), still inside the `:root` block:

```css
  /* ── Skeleton Shimmer ── */
  --selah-shimmer-low: rgba(198,162,60,0.12);
  --selah-shimmer-high: rgba(245,228,184,0.4);

  /* ── Resurfacing Quote ── */
  --selah-resurface-quote: var(--selah-gold-100);
```

- [ ] **Step 2: Add light-mode overrides for shimmer and resurface-quote**

Add inside the `[data-theme="light"], .light` block (after line 106, before the closing `}`):

```css
  --selah-shimmer-low: rgba(198,162,60,0.1);
  --selah-shimmer-high: rgba(198,162,60,0.25);
  --selah-resurface-quote: var(--selah-gold-700);
```

Add inside the `@media (prefers-color-scheme: light) { [data-theme="system"]` block (after line 132, before the closing `}`):

```css
  --selah-shimmer-low: rgba(198,162,60,0.1);
  --selah-shimmer-high: rgba(198,162,60,0.25);
  --selah-resurface-quote: var(--selah-gold-700);
```

- [ ] **Step 3: Add keyframes and utility classes after the closing of the last media query block**

Append to the end of `tokens.css`:

```css
/* ── Keyframes ── */

@keyframes selahShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes selahResurface {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes selahPageEnter {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes selahToastIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes selahToastOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(12px); }
}

/* ── Animation Utilities ── */

.animate-shimmer {
  background: linear-gradient(90deg, var(--selah-shimmer-low) 25%, var(--selah-shimmer-high) 50%, var(--selah-shimmer-low) 75%);
  background-size: 200% 100%;
  animation: selahShimmer 2s ease-in-out infinite;
}

.animate-resurface {
  animation: selahResurface 400ms ease-out forwards;
}

.animate-page-enter {
  animation: selahPageEnter 450ms ease-out forwards;
}

.animate-toast-in {
  animation: selahToastIn 250ms ease-out forwards;
}

.animate-toast-out {
  animation: selahToastOut 250ms ease-in forwards;
}
```

- [ ] **Step 4: Verify the dev server loads without CSS errors**

Run: `npm run dev` and open the app in a browser. Check the browser console for any CSS parse errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/styles/tokens.css
git commit -m "style: add keyframes, shimmer variables, and animation utilities to tokens"
```

---

### Task 2: Create the Skeleton component

**Files:**
- Create: `src/components/ui/Skeleton.tsx`

- [ ] **Step 1: Create the base Skeleton component with all variants and page skeletons**

```tsx
import { font } from '@/components/ui/fonts'

/* ── Base skeleton bar ── */

interface SkeletonProps {
  variant: 'text' | 'heading' | 'paragraph' | 'avatar' | 'card'
  lines?: number
  className?: string
}

export function Skeleton({ variant, lines = 3, className = '' }: SkeletonProps) {
  const base = 'animate-shimmer rounded'

  switch (variant) {
    case 'text':
      return <div className={`${base} h-3 w-[70%] ${className}`} />
    case 'heading':
      return <div className={`${base} h-[18px] w-[40%] ${className}`} />
    case 'paragraph':
      return (
        <div className={`space-y-2 ${className}`}>
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              className={`${base} h-[11px]`}
              style={{
                width: i === lines - 1 ? '75%' : i % 2 === 0 ? '100%' : '92%',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )
    case 'avatar':
      return <div className={`${base} rounded-full w-10 h-10 ${className}`} />
    case 'card':
      return <div className={`${base} h-[120px] w-full rounded-lg ${className}`} />
  }
}

/* ── Pre-composed page skeletons ── */

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg ${className}`}
      style={{
        backgroundColor: 'var(--selah-bg-surface, #1C1917)',
        padding: '20px',
      }}
    >
      {children}
    </div>
  )
}

export function ReaderSkeleton() {
  return (
    <div className="flex h-full">
      <div className="flex-1 p-6 space-y-3">
        <Skeleton variant="heading" className="mb-6" />
        {Array.from({ length: 18 }, (_, i) => (
          <div key={i} className="animate-shimmer rounded h-3 w-full" style={{ animationDelay: `${i * 0.05}s` }} />
        ))}
      </div>
      <div className="hidden md:block w-[300px] p-4 space-y-4" style={{ borderLeft: '1px solid var(--selah-border-color, #3D3835)' }}>
        <Skeleton variant="heading" />
        <Skeleton variant="card" />
        <Skeleton variant="card" />
      </div>
    </div>
  )
}

export function BrowseSkeleton() {
  return (
    <div className="p-6">
      <Skeleton variant="heading" className="mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }, (_, i) => (
          <Section key={i}>
            <Skeleton variant="text" className="mb-3" />
            <Skeleton variant="paragraph" lines={2} />
          </Section>
        ))}
      </div>
    </div>
  )
}

export function SettingsSkeleton() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-10">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i}>
          <Skeleton variant="heading" className="mb-4" />
          <Section>
            <div className="space-y-4">
              {Array.from({ length: 4 }, (_, j) => (
                <div key={j} className="flex items-center justify-between">
                  <Skeleton variant="text" className="w-[30%]" />
                  <Skeleton variant="text" className="w-[40%]" />
                </div>
              ))}
            </div>
          </Section>
        </div>
      ))}
    </div>
  )
}

export function DetailSkeleton() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Skeleton variant="heading" className="mb-6" />
      <Skeleton variant="paragraph" lines={5} className="mb-8" />
      <div className="flex items-center gap-3 mb-8">
        <Skeleton variant="avatar" />
        <div className="space-y-2">
          <Skeleton variant="text" className="w-32" />
          <Skeleton variant="text" className="w-20" />
        </div>
      </div>
      <Skeleton variant="paragraph" lines={3} />
    </div>
  )
}
```

- [ ] **Step 2: Verify the component renders**

Open the browser dev tools, temporarily import `<BrowseSkeleton />` in any page to confirm the shimmer animation works in both dark and light mode. Remove the temporary import after verifying.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Skeleton.tsx
git commit -m "feat(ui): add Skeleton component with shimmer animation and page skeletons"
```

---

### Task 3: Create the Toast system

**Files:**
- Create: `src/components/ui/ToastProvider.tsx`

- [ ] **Step 1: Create the Toast provider, hook, and Toast component in a single file**

```tsx
'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { X } from 'lucide-react'

/* ── Types ── */

type ToastType = 'error' | 'success' | 'info'

interface ToastItem {
  id: number
  type: ToastType
  title: string
  message?: string
}

interface ToastContextValue {
  toast: {
    error: (title: string, message?: string) => void
    success: (title: string, message?: string) => void
    info: (title: string, message?: string) => void
  }
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue['toast'] {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx.toast
}

/* ── Styling ── */

const typeStyles: Record<ToastType, { border: string; icon: string; iconColor: string }> = {
  error: { border: '#D4836B', icon: '⚠', iconColor: '#D4836B' },
  success: { border: '#4A9E88', icon: '✓', iconColor: '#4A9E88' },
  info: { border: '#C6A23C', icon: 'ℹ', iconColor: '#C6A23C' },
}

const AUTO_DISMISS_MS: Record<ToastType, number> = {
  error: 5000,
  success: 3000,
  info: 3000,
}

/* ── Toast Item ── */

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const style = typeStyles[item.type]
  const [exiting, setExiting] = useState(false)

  const handleDismiss = useCallback(() => {
    setExiting(true)
    setTimeout(onDismiss, 250)
  }, [onDismiss])

  // Auto-dismiss
  useState(() => {
    const timer = setTimeout(handleDismiss, AUTO_DISMISS_MS[item.type])
    return () => clearTimeout(timer)
  })

  return (
    <div
      className={exiting ? 'animate-toast-out' : 'animate-toast-in'}
      style={{
        backgroundColor: 'var(--selah-bg-elevated, #292524)',
        border: '1px solid var(--selah-border-color, #3D3835)',
        borderLeft: `3px solid ${style.border}`,
        borderRadius: '6px',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      <span style={{ color: style.iconColor, fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>
        {style.icon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
            color: 'var(--selah-text-1, #E8E2D9)',
            fontSize: '13px',
            fontWeight: 600,
            marginBottom: item.message ? '4px' : 0,
          }}
        >
          {item.title}
        </div>
        {item.message && (
          <div
            style={{
              fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
              color: 'var(--selah-text-3, #6E695F)',
              fontSize: '12px',
              lineHeight: 1.5,
            }}
          >
            {item.message}
          </div>
        )}
      </div>
      <button
        onClick={handleDismiss}
        style={{
          color: 'var(--selah-text-3, #6E695F)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          flexShrink: 0,
          padding: '2px',
        }}
      >
        <X size={14} strokeWidth={1.5} />
      </button>
    </div>
  )
}

/* ── Provider ── */

let nextId = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const add = useCallback((type: ToastType, title: string, message?: string) => {
    const id = nextId++
    setToasts((prev) => [...prev, { id, type, title, message }])
  }, [])

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = {
    error: (title: string, message?: string) => add('error', title, message),
    success: (title: string, message?: string) => add('success', title, message),
    info: (title: string, message?: string) => add('info', title, message),
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container — fixed at bottom-right */}
      <div
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((item) => (
          <div key={item.id} style={{ pointerEvents: 'auto' }}>
            <ToastCard item={item} onDismiss={() => remove(item.id)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ToastProvider.tsx
git commit -m "feat(ui): add Toast notification system with provider and useToast hook"
```

---

### Task 4: Create the ConfirmDialog component

**Files:**
- Create: `src/components/ui/ConfirmDialog.tsx`

- [ ] **Step 1: Create the ConfirmDialog component**

```tsx
'use client'

import { useCallback, useEffect, useRef } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) confirmRef.current?.focus()
  }, [open])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    },
    [onCancel],
  )

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(15, 13, 11, 0.6)' }}
      onClick={onCancel}
      onKeyDown={handleKeyDown}
    >
      <div
        className="animate-page-enter"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--selah-bg-elevated, #292524)',
          border: '1px solid var(--selah-border-color, #3D3835)',
          borderRadius: '10px',
          padding: '24px',
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        <h3
          style={{
            fontFamily: "var(--selah-font-display, 'Cormorant Garamond', serif)",
            fontSize: '20px',
            fontWeight: 500,
            color: 'var(--selah-text-1, #E8E2D9)',
            marginBottom: '8px',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
            fontSize: '14px',
            color: 'var(--selah-text-2, #A39E93)',
            lineHeight: 1.6,
            marginBottom: '24px',
          }}
        >
          {message}
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{
              fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
              fontSize: '13px',
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid var(--selah-border-color, #3D3835)',
              backgroundColor: 'transparent',
              color: 'var(--selah-text-1, #E8E2D9)',
              cursor: 'pointer',
            }}
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            style={{
              fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
              fontSize: '13px',
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'var(--selah-gold-500, #C6A23C)',
              color: '#1C1917',
              cursor: 'pointer',
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ConfirmDialog.tsx
git commit -m "feat(ui): add ConfirmDialog component for inline confirmation modals"
```

---

### Task 5: Create the PageTransition wrapper

**Files:**
- Create: `src/components/ui/PageTransition.tsx`

- [ ] **Step 1: Create the PageTransition component**

```tsx
export function PageTransition({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-enter">{children}</div>
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/PageTransition.tsx
git commit -m "feat(ui): add PageTransition wrapper for route fade-in animation"
```

---

### Task 6: Create error boundary pages

**Files:**
- Create: `src/app/(shell)/error.tsx`
- Create: `src/app/(shell)/not-found.tsx`

- [ ] **Step 1: Create the 500 error boundary**

```tsx
'use client'

import Link from 'next/link'

export default function ShellError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6"
      style={{ minHeight: 'calc(100vh - 56px)' }}
    >
      <div style={{ fontSize: '48px', marginBottom: '8px', opacity: 0.6 }}>🕊️</div>
      <h1
        style={{
          fontFamily: "var(--selah-font-display, 'Cormorant Garamond', serif)",
          fontSize: '24px',
          fontWeight: 400,
          color: 'var(--selah-text-1, #E8E2D9)',
          marginBottom: '12px',
        }}
      >
        Something stumbled along the way.
      </h1>
      <p
        style={{
          fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
          fontSize: '14px',
          color: 'var(--selah-text-3, #6E695F)',
          lineHeight: 1.6,
          maxWidth: '420px',
          marginBottom: '28px',
        }}
      >
        An unexpected error interrupted your study. Your work is safe — try
        refreshing, or head back and pick up where you left off.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={reset}
          style={{
            fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
            fontSize: '13px',
            fontWeight: 600,
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: 'var(--selah-gold-500, #C6A23C)',
            color: '#1C1917',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
        <Link
          href="/"
          style={{
            fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
            fontSize: '13px',
            padding: '10px 20px',
            borderRadius: '6px',
            border: '1px solid var(--selah-border-color, #3D3835)',
            color: 'var(--selah-text-1, #E8E2D9)',
            textDecoration: 'none',
          }}
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create the 404 page**

```tsx
import Link from 'next/link'

export default function ShellNotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6"
      style={{ minHeight: 'calc(100vh - 56px)' }}
    >
      <div style={{ fontSize: '48px', marginBottom: '8px', opacity: 0.6 }}>📖</div>
      <h1
        style={{
          fontFamily: "var(--selah-font-display, 'Cormorant Garamond', serif)",
          fontSize: '24px',
          fontWeight: 400,
          color: 'var(--selah-text-1, #E8E2D9)',
          marginBottom: '12px',
        }}
      >
        This page has turned to a chapter we can&apos;t find.
      </h1>
      <p
        style={{
          fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
          fontSize: '14px',
          color: 'var(--selah-text-3, #6E695F)',
          lineHeight: 1.6,
          maxWidth: '400px',
          marginBottom: '28px',
        }}
      >
        The path you followed may have changed, or this passage hasn&apos;t been
        written yet. Let&apos;s get you back to familiar ground.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link
          href="/"
          style={{
            fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
            fontSize: '13px',
            fontWeight: 600,
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: 'var(--selah-gold-500, #C6A23C)',
            color: '#1C1917',
            textDecoration: 'none',
          }}
        >
          Return Home
        </Link>
        <Link
          href="/search"
          style={{
            fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
            fontSize: '13px',
            padding: '10px 20px',
            borderRadius: '6px',
            border: '1px solid var(--selah-border-color, #3D3835)',
            color: 'var(--selah-text-1, #E8E2D9)',
            textDecoration: 'none',
          }}
        >
          Search
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Test both pages**

Test the 404 by navigating to `http://localhost:3000/nonexistent-page` in the browser. Verify the pastoral message, gold button, and layout render correctly in both dark and light mode.

The 500 error boundary can be tested by temporarily throwing an error in a page component — but this is optional, as the structure mirrors the 404 page.

- [ ] **Step 4: Commit**

```bash
git add src/app/(shell)/error.tsx src/app/(shell)/not-found.tsx
git commit -m "feat(ui): add pastoral error boundary and 404 pages"
```

---

### Task 7: Wire ToastProvider into the shell layout

**Files:**
- Modify: `src/app/(shell)/layout.tsx`

- [ ] **Step 1: Wrap shell children with ToastProvider**

The current layout (19 lines) wraps children in `<AppShell>`. Add `ToastProvider` inside the shell. Since `ToastProvider` is a client component and layout.tsx is a server component, we need a client wrapper.

Create `src/components/shell/ShellProviders.tsx`:

```tsx
'use client'

import { ToastProvider } from '@/components/ui/ToastProvider'

export function ShellProviders({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
```

Then modify `src/app/(shell)/layout.tsx` to:

```tsx
import { AppShell } from '@/components/shell'
import { ShellProviders } from '@/components/shell/ShellProviders'
import { getAIConfig } from '@/lib/settings/queries'

export default async function ShellLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const aiConfig = await getAIConfig()

  return (
    <ShellProviders>
      <AppShell
        user={{ name: 'Study User' }}
        isAIConfigured={aiConfig.isConfigured}
      >
        {children}
      </AppShell>
    </ShellProviders>
  )
}
```

- [ ] **Step 2: Verify ToastProvider renders**

Open browser dev tools → Elements panel. Confirm the fixed toast container div (bottom-right, z-9999) exists in the DOM.

- [ ] **Step 3: Commit**

```bash
git add src/components/shell/ShellProviders.tsx src/app/(shell)/layout.tsx
git commit -m "feat(ui): wire ToastProvider into shell layout"
```

---

### Task 8: Deploy loading.tsx skeletons across all routes

**Files:**
- Create: `src/app/(shell)/read/loading.tsx`
- Create: `src/app/(shell)/characters/loading.tsx`
- Create: `src/app/(shell)/themes/loading.tsx`
- Create: `src/app/(shell)/word-study/loading.tsx`
- Create: `src/app/(shell)/daily-bread/loading.tsx`
- Create: `src/app/(shell)/journal/loading.tsx`
- Create: `src/app/(shell)/settings/loading.tsx`
- Create: `src/app/(shell)/loading.tsx`

- [ ] **Step 1: Create reader loading skeleton**

`src/app/(shell)/read/loading.tsx`:
```tsx
import { ReaderSkeleton } from '@/components/ui/Skeleton'

export default function ReadLoading() {
  return <ReaderSkeleton />
}
```

- [ ] **Step 2: Create browse loading skeletons (characters, themes, word-study, journal)**

`src/app/(shell)/characters/loading.tsx`:
```tsx
import { BrowseSkeleton } from '@/components/ui/Skeleton'

export default function CharactersLoading() {
  return <BrowseSkeleton />
}
```

`src/app/(shell)/themes/loading.tsx`:
```tsx
import { BrowseSkeleton } from '@/components/ui/Skeleton'

export default function ThemesLoading() {
  return <BrowseSkeleton />
}
```

`src/app/(shell)/word-study/loading.tsx`:
```tsx
import { BrowseSkeleton } from '@/components/ui/Skeleton'

export default function WordStudyLoading() {
  return <BrowseSkeleton />
}
```

`src/app/(shell)/journal/loading.tsx`:
```tsx
import { BrowseSkeleton } from '@/components/ui/Skeleton'

export default function JournalLoading() {
  return <BrowseSkeleton />
}
```

- [ ] **Step 3: Create detail and settings loading skeletons**

`src/app/(shell)/daily-bread/loading.tsx`:
```tsx
import { DetailSkeleton } from '@/components/ui/Skeleton'

export default function DailyBreadLoading() {
  return <DetailSkeleton />
}
```

`src/app/(shell)/settings/loading.tsx`:
```tsx
import { SettingsSkeleton } from '@/components/ui/Skeleton'

export default function SettingsLoading() {
  return <SettingsSkeleton />
}
```

- [ ] **Step 4: Create shell-level fallback loading skeleton**

`src/app/(shell)/loading.tsx`:
```tsx
import { BrowseSkeleton } from '@/components/ui/Skeleton'

export default function ShellLoading() {
  return <BrowseSkeleton />
}
```

- [ ] **Step 5: Verify skeleton loading states**

In the browser, do a hard refresh on several pages (characters, settings, daily-bread). On slow connections or cold starts, the gold shimmer skeletons should flash briefly before the page content loads. You can simulate slow loading by throttling in Chrome DevTools (Network → Slow 3G).

- [ ] **Step 6: Commit**

```bash
git add src/app/(shell)/read/loading.tsx src/app/(shell)/characters/loading.tsx src/app/(shell)/themes/loading.tsx src/app/(shell)/word-study/loading.tsx src/app/(shell)/daily-bread/loading.tsx src/app/(shell)/journal/loading.tsx src/app/(shell)/settings/loading.tsx src/app/(shell)/loading.tsx
git commit -m "feat(ui): add gold shimmer skeleton loading states to all routes"
```

---

### Task 9: Add ResurfacingCard animation and color fix

**Files:**
- Modify: `src/components/reader/ReaderView.tsx` (lines 378-380)

- [ ] **Step 1: Add the animation class to the ResurfacingCard**

In `src/components/reader/ReaderView.tsx`, find the ResurfacingCard `<button>` element (line 378). Change:

```tsx
      className="block w-full text-left rounded-md"
```

to:

```tsx
      className="block w-full text-left rounded-md animate-resurface"
```

The `--selah-resurface-quote` variable was already added to `tokens.css` in Task 1, and the component already references it at line 411. No other changes needed — the color fix is purely CSS.

- [ ] **Step 2: Verify in browser**

Navigate to a passage in the reader that has a resurfacing card (a chapter where you have journal notes). The card should:
1. Fade in with an 8px upward translate over 400ms
2. Show gold-100 (#F5E4B8) quote text in dark mode
3. Show gold-700 (#7A5C1F) quote text in light mode

- [ ] **Step 3: Commit**

```bash
git add src/components/reader/ReaderView.tsx
git commit -m "fix(reader): add entrance animation and fix light-mode quote color on ResurfacingCard"
```

---

### Task 10: Add max-width constraint to AppShell

**Files:**
- Modify: `src/components/shell/AppShell.tsx` (lines 146-154)

- [ ] **Step 1: Add max-width wrapper to the content area**

In `src/components/shell/AppShell.tsx`, find the `<main>` content area (lines 146-154). Change:

```tsx
      <main
        className="flex-1 overflow-auto relative"
        style={{
          paddingTop: '0',
        }}
      >
        {/* Mobile spacer for top bar */}
        <div className="h-14 md:hidden" />

        {children}
      </main>
```

to:

```tsx
      <main
        className="flex-1 overflow-auto relative"
        style={{
          paddingTop: '0',
        }}
      >
        {/* Mobile spacer for top bar */}
        <div className="h-14 md:hidden" />

        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
```

- [ ] **Step 2: Verify on wide screens**

Open the app on a wide monitor (or resize browser to 1920px+). Content should cap at 1280px and center. Check that the reader page still fills its available width — the reader has its own flex layout that will naturally fill the max-width container.

- [ ] **Step 3: Commit**

```bash
git add src/components/shell/AppShell.tsx
git commit -m "style: add max-w-7xl content constraint for wide screens"
```

---

### Task 11: Settings page mobile responsive fix

**Files:**
- Modify: `src/components/settings/SettingsView.tsx` (line 35)

- [ ] **Step 1: Make LabelRow responsive**

In `src/components/settings/SettingsView.tsx`, find the `LabelRow` component (line 34-36). Change:

```tsx
function LabelRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div className="flex items-center justify-between py-1"><span style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-1, #E8E2D9)' }}>{label}</span>{children}</div>)
}
```

to:

```tsx
function LabelRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-1 md:flex-row md:items-center md:justify-between">
      <span style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-1, #E8E2D9)' }}>{label}</span>
      <div className="w-full md:w-auto">{children}</div>
    </div>
  )
}
```

- [ ] **Step 2: Verify at mobile width**

In Chrome DevTools, toggle the device toolbar and set width to 375px (iPhone). Navigate to Settings. Verify:
- Labels appear above controls (not side-by-side)
- Sliders and dropdowns span full width
- No horizontal overflow

- [ ] **Step 3: Commit**

```bash
git add src/components/settings/SettingsView.tsx
git commit -m "style: make Settings form rows stack on mobile"
```

---

### Task 12: Replace alert() and confirm() calls

**Files:**
- Modify: `src/app/(shell)/journal/[id]/JournalDetailClient.tsx`
- Modify: `src/components/settings/SettingsView.tsx`
- Modify: `src/components/study-builder/ProjectLanding.tsx`

- [ ] **Step 1: Replace alerts and confirms in JournalDetailClient**

In `src/app/(shell)/journal/[id]/JournalDetailClient.tsx`:

Add imports at the top of the file:
```tsx
import { useToast } from '@/components/ui/ToastProvider'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
```

Inside the component function, add:
```tsx
const toast = useToast()
const [confirmDelete, setConfirmDelete] = useState(false)
```

Replace the `handleDeleteJournal` function (lines 70-78):

```tsx
  async function handleDeleteJournal() {
    setConfirmDelete(false)
    const res = await fetch(`/api/journals/${journal.id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/journal')
    } else {
      const body = await res.json().catch(() => ({}))
      toast.error("Couldn't remove that journal", body.error)
    }
  }
```

Replace the `handleExport` function's `alert` calls (lines 85, 91) with:
```tsx
toast.info('Export is coming soon')
```

Where the delete button was previously calling `handleDeleteJournal()` directly with a `confirm()` guard, change it to call `setConfirmDelete(true)` instead.

Add the ConfirmDialog to the component's JSX return (before the closing fragment or wrapper div):
```tsx
<ConfirmDialog
  open={confirmDelete}
  title="Remove this journal?"
  message={`"${journal.name}" will be removed and its notes will move to the default journal. This can't be undone.`}
  confirmLabel="Remove"
  cancelLabel="Keep it"
  onConfirm={handleDeleteJournal}
  onCancel={() => setConfirmDelete(false)}
/>
```

- [ ] **Step 2: Replace confirm in SettingsView**

In `src/components/settings/SettingsView.tsx`, find the restore backup file input (line 427). Replace:

```tsx
if (f && confirm(`Restore from "${f.name}"? This will replace all current data.`)) onRestoreBackup?.(f)
```

with a pattern using local state. Add state near the top of the `SettingsView` function:

```tsx
const [restoreFile, setRestoreFile] = useState<File | null>(null)
```

Replace the file input's onChange to:
```tsx
onChange={(e) => { const f = e.target.files?.[0]; if (f) setRestoreFile(f) }}
```

Add the ConfirmDialog to the return JSX:
```tsx
<ConfirmDialog
  open={!!restoreFile}
  title="Restore from backup?"
  message={`This will replace all your current data with the backup "${restoreFile?.name}". Your existing notes, journals, and settings will be overwritten.`}
  confirmLabel="Restore"
  cancelLabel="Cancel"
  onConfirm={() => { if (restoreFile) onRestoreBackup?.(restoreFile); setRestoreFile(null) }}
  onCancel={() => setRestoreFile(null)}
/>
```

Add imports for `ConfirmDialog` and `useToast` at the top. Replace the success/error alerts in the restore handler (in the parent `page.tsx` or wherever the callback resolves) to use `toast.success` / `toast.error` respectively.

- [ ] **Step 3: Replace confirm in ProjectLanding**

In `src/components/study-builder/ProjectLanding.tsx`, find line 33. The current inline `confirm()`:

```tsx
onClick={(e) => { e.stopPropagation(); if (confirm(`Delete "${project.topic}"?`)) onDelete?.() }}
```

This requires state at the `ProjectCard` level. Modify the `ProjectCard` component:

Add `useState` to the imports, then inside `ProjectCard`:

```tsx
const [showConfirm, setShowConfirm] = useState(false)
```

Change the delete button's onClick to:
```tsx
onClick={(e) => { e.stopPropagation(); setShowConfirm(true) }}
```

Add inside the `ProjectCard` return, after the delete button:
```tsx
<ConfirmDialog
  open={showConfirm}
  title="Remove this study project?"
  message={`"${project.topic}" and all its assembled items will be removed. This can't be undone.`}
  confirmLabel="Remove"
  cancelLabel="Keep it"
  onConfirm={() => { setShowConfirm(false); onDelete?.() }}
  onCancel={() => setShowConfirm(false)}
/>
```

Add the import at the top:
```tsx
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
```

- [ ] **Step 4: Test all replacements in browser**

1. Go to a journal → click Delete → verify the ConfirmDialog appears with pastoral phrasing
2. Go to Settings → try to restore a backup → verify the ConfirmDialog appears
3. Go to Study Builder → click delete on a project → verify the ConfirmDialog appears
4. Trigger an error (e.g. disconnect network, try to delete) → verify toast appears instead of browser alert

- [ ] **Step 5: Commit**

```bash
git add src/app/(shell)/journal/[id]/JournalDetailClient.tsx src/components/settings/SettingsView.tsx src/components/study-builder/ProjectLanding.tsx
git commit -m "fix(ui): replace all alert() and confirm() calls with Toast and ConfirmDialog"
```

---

### Task 13: Add PageTransition to page components

**Files:**
- Modify: `src/app/(shell)/page.tsx`
- Modify: other page components as found

- [ ] **Step 1: Wrap the home page in PageTransition**

In `src/app/(shell)/page.tsx`, change:

```tsx
import { Suspense } from 'react'
import { getDailyBread, getRecentHistory, getRecentNotes } from '@/lib/home/queries'
import { isFirstLaunch } from '@/lib/settings/queries'
import HomeClient from './HomeClient'

export default async function HomePage() {
  const [dailyBread, history, recentNotes, firstLaunch] = await Promise.all([
    getDailyBread(),
    getRecentHistory(6),
    getRecentNotes(4),
    isFirstLaunch(),
  ])

  return (
    <Suspense>
      <HomeClient
        dailyBread={dailyBread}
        history={history}
        recentNotes={recentNotes}
        isFirstLaunch={firstLaunch}
      />
    </Suspense>
  )
}
```

to:

```tsx
import { Suspense } from 'react'
import { getDailyBread, getRecentHistory, getRecentNotes } from '@/lib/home/queries'
import { isFirstLaunch } from '@/lib/settings/queries'
import { PageTransition } from '@/components/ui/PageTransition'
import HomeClient from './HomeClient'

export default async function HomePage() {
  const [dailyBread, history, recentNotes, firstLaunch] = await Promise.all([
    getDailyBread(),
    getRecentHistory(6),
    getRecentNotes(4),
    isFirstLaunch(),
  ])

  return (
    <PageTransition>
      <Suspense>
        <HomeClient
          dailyBread={dailyBread}
          history={history}
          recentNotes={recentNotes}
          isFirstLaunch={firstLaunch}
        />
      </Suspense>
    </PageTransition>
  )
}
```

- [ ] **Step 2: Add PageTransition to remaining page components**

Apply the same pattern to each page's server component (the `page.tsx` file). Wrap the top-level return content in `<PageTransition>`. Target pages:

- `src/app/(shell)/characters/page.tsx`
- `src/app/(shell)/themes/page.tsx`
- `src/app/(shell)/word-study/page.tsx`
- `src/app/(shell)/daily-bread/page.tsx`
- `src/app/(shell)/journal/page.tsx`
- `src/app/(shell)/settings/page.tsx`
- `src/app/(shell)/read/[translationId]/[bookId]/[chapter]/page.tsx`
- `src/app/(shell)/search/page.tsx`

For each: import `PageTransition` and wrap the outermost JSX element in the return.

- [ ] **Step 3: Verify page transitions in browser**

Navigate between several pages (Home → Characters → Themes → Settings). Each page should fade in with a subtle 6px upward lift over 450ms. The skeleton shows first, then the content fades in over it.

- [ ] **Step 4: Commit**

```bash
git add src/app/(shell)/page.tsx src/app/(shell)/characters/page.tsx src/app/(shell)/themes/page.tsx src/app/(shell)/word-study/page.tsx src/app/(shell)/daily-bread/page.tsx src/app/(shell)/journal/page.tsx src/app/(shell)/settings/page.tsx src/app/(shell)/read/ src/app/(shell)/search/page.tsx
git commit -m "feat(ui): add fade+lift page transition to all routes"
```

---

### Task 14: Docker HEALTHCHECK

**Files:**
- Modify: `Dockerfile` (after line 40)

- [ ] **Step 1: Add HEALTHCHECK instruction**

In the Dockerfile, add after `EXPOSE 3000` (line 40) and before `ENTRYPOINT`:

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1
```

- [ ] **Step 2: Commit**

```bash
git add Dockerfile
git commit -m "ops: add Docker HEALTHCHECK for container health monitoring"
```

---

### Task 15: Panel transition audit

**Files:**
- Modify: `src/components/shell/AppShell.tsx` (line 89)

- [ ] **Step 1: Verify sidebar transition uses correct timing**

In `src/components/shell/AppShell.tsx` line 89, the sidebar already uses `duration-250 ease-out` which matches the `--selah-transition-panel` token (250ms). No change needed here.

- [ ] **Step 2: Check context drawer and bottom sheet transitions**

Search `src/components/reader/ReaderView.tsx` for any `duration-150` or `duration-200` on panel-level elements (the context drawer, bottom sheet). If found, update to `duration-[250ms]` to match the panel token. Leave `duration-150` on hover effects (buttons, opacity reveals) — those correctly use the hover token.

- [ ] **Step 3: Commit (only if changes were needed)**

```bash
git add src/components/reader/ReaderView.tsx
git commit -m "style: align panel transition durations with --selah-transition-panel token"
```

---

### Task 16: Final verification

- [ ] **Step 1: Run the test suite**

```bash
npm test
```

All existing tests should still pass. The changes are purely UI/CSS additions — no business logic was modified.

- [ ] **Step 2: Full manual walkthrough**

Open the app in the browser and verify:

1. **Skeletons:** Hard refresh on Characters, Settings, Reader. Gold shimmer should appear briefly.
2. **Error pages:** Navigate to `/nonexistent`. Verify 404 with pastoral message.
3. **Page transitions:** Navigate Home → Characters → Themes. Content fades in with lift.
4. **Resurfacing card:** Open a chapter with journal notes. Card should animate in. Check light mode quote color.
5. **Toast:** Trigger an error in journal (delete with network disconnected). Toast should appear at bottom-right.
6. **ConfirmDialog:** Delete a project in Study Builder. Inline dialog should appear.
7. **Max-width:** Resize browser to 1920px+. Content should cap at 1280px.
8. **Settings mobile:** DevTools → 375px width on Settings. Labels should stack above controls.
9. **Dark/light mode:** Toggle theme in Settings. All new components should adapt.

- [ ] **Step 3: Commit any fixes found during verification**

```bash
git add -A
git commit -m "fix: address issues found during Phase 9 verification pass"
```
