# Phase 9: Polish — Design Spec

## Overview

Ship-ready polish pass across all 8 items from the implementation guide. Component-first approach: build reusable primitives, then deploy across the app.

**Decisions:**
- All 8 items to spec (ship-ready)
- Pastoral error voice
- Gold shimmer sweep skeletons
- CSS-only page fade + lift (no animation library)
- Max-width + settings mobile responsive fix
- Docker HEALTHCHECK included

---

## 1. Skeleton Component

### Base Component: `src/components/ui/Skeleton.tsx`

Single component with variant prop:

| Variant | Description | Dimensions |
|---------|-------------|------------|
| `text` | Single line placeholder | 70% width, 12px height |
| `heading` | Title bar | 40% width, 18px height |
| `paragraph` | Multi-line block | Full width, configurable `lines` (default 3) |
| `avatar` | Circular placeholder | 40px diameter |
| `card` | Rectangular block | Full width, 120px height |

**Props:**
```typescript
interface SkeletonProps {
  variant: 'text' | 'heading' | 'paragraph' | 'avatar' | 'card'
  lines?: number        // paragraph variant only, default 3
  className?: string    // additional Tailwind classes
}
```

**Animation:** Gold shimmer sweep — a moving gold highlight sweeps across the bar.

```css
@keyframes selahShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

- Dark mode gradient: `rgba(198,162,60,0.12)` → `rgba(245,228,184,0.4)` → `rgba(198,162,60,0.12)`
- Light mode gradient: `rgba(198,162,60,0.1)` → `rgba(198,162,60,0.25)` → `rgba(198,162,60,0.1)`
- Duration: 2s ease-in-out infinite
- Background-size: 200% 100%
- Stagger: paragraph lines offset by 0.1s each via `animation-delay`
- Mode switching: Use CSS custom properties for the gradient stops (`--selah-shimmer-low`, `--selah-shimmer-high`) defined in `:root` and overridden in `[data-theme="light"]`, so the component uses a single `background` declaration

### Pre-Composed Page Skeletons

Thin wrappers composing base primitives into page-shaped layouts:

| Component | Used By | Composition |
|-----------|---------|-------------|
| `ReaderSkeleton` | `read/loading.tsx` | Heading + 20 text lines + sidebar card placeholder |
| `BrowseSkeleton` | `characters/`, `themes/`, `journal/`, `word-study/loading.tsx` | Heading + 3×3 grid of card variants |
| `SettingsSkeleton` | `settings/loading.tsx` | 3 section blocks, each with heading + 4 text lines |
| `DetailSkeleton` | `daily-bread/loading.tsx` | Heading + paragraph(5) + avatar row + paragraph(3) |

All live in `src/components/ui/Skeleton.tsx` as named exports alongside the base `Skeleton`.

---

## 2. Error State Components

### Full-Page Error Boundaries

**`src/app/(shell)/error.tsx`** — Runtime error boundary (500):
- Dove emoji (🕊️)
- Heading: "Something stumbled along the way."
- Body: "An unexpected error interrupted your study. Your work is safe — try refreshing, or head back and pick up where you left off."
- Actions: "Try Again" (primary gold button, calls `reset()`) + "Return Home" (secondary outline button)
- Centered layout, max-width 420px

**`src/app/(shell)/not-found.tsx`** — 404 page:
- Book emoji (📖)
- Heading: "This page has turned to a chapter we can't find."
- Body: "The path you followed may have changed, or this passage hasn't been written yet. Let's get you back to familiar ground."
- Actions: "Return Home" (primary gold button) + "Search" (secondary outline button)
- Centered layout, max-width 400px

Both use Cormorant Garamond for headings (matching brand), system text colors, gold accent buttons.

### Toast Component: `src/components/ui/Toast.tsx`

Inline notification replacing all browser `alert()` and `confirm()` calls.

**Toast types:**
| Type | Left border | Icon | Color |
|------|-------------|------|-------|
| `error` | Terracotta (#D4836B) | ⚠ | Terracotta |
| `success` | Teal (#4A9E88) | ✓ | Teal |
| `info` | Gold (#C6A23C) | ℹ | Gold |

**Behavior:**
- Slides in at bottom of page
- Auto-dismiss after 5s (errors) / 3s (success, info)
- Dismissible via X button
- Stacks if multiple (newest on bottom)
- Background: `--selah-bg-elevated` with type-colored left border (3px)

**Toast context:** `src/components/ui/ToastProvider.tsx` wrapping the shell layout, exposing `useToast()` hook with `toast.error(title, message?)`, `toast.success(title, message?)`, `toast.info(title, message?)`.

### Confirm Dialog: `src/components/ui/ConfirmDialog.tsx`

Inline modal replacing browser `confirm()`:
- Semi-transparent backdrop
- Centered card with heading, body text, two action buttons
- Pastoral phrasing per context
- Returns a Promise<boolean> for easy await usage

### Alert Replacement Map

| Current | Replacement |
|---------|-------------|
| `alert("Failed to delete journal.")` (JournalDetailClient:77) | `toast.error("Couldn't remove that journal")` |
| `alert("Export not available yet.")` (JournalDetailClient:85,96) | `toast.info("Export is coming soon")` |
| `alert("Restore failed: ...")` (Settings:221) | `toast.error("Couldn't restore — is the file valid?")` |
| `alert("Backup restored...")` (Settings:218) | `toast.success("Backup restored", "Reload the page to see your restored data.")` |
| `confirm("Delete journal?")` (JournalDetailClient:71) | `ConfirmDialog` with pastoral phrasing |
| `confirm("Delete project?")` (ProjectLanding) | `ConfirmDialog` with pastoral phrasing |
| `confirm("Restore backup?")` (SettingsView) | `ConfirmDialog` with pastoral phrasing |

---

## 3. Animations & Transitions

### New Keyframes (added to `tokens.css`)

```css
/* Resurfacing card entrance */
@keyframes selahResurface {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Page content fade-in */
@keyframes selahPageEnter {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Skeleton shimmer */
@keyframes selahShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Toast slide-in */
@keyframes selahToastIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Animation Application

| Element | Keyframes | Duration | Easing |
|---------|-----------|----------|--------|
| Resurfacing card | `selahResurface` | 400ms | ease-out |
| Page content mount | `selahPageEnter` | 450ms | ease-out |
| Skeleton bars | `selahShimmer` | 2s | ease-in-out infinite |
| Toast notification | `selahToastIn` | 250ms | ease-out |

### PageTransition Wrapper: `src/components/ui/PageTransition.tsx`

Minimal wrapper applying the `selahPageEnter` animation:

```typescript
export function PageTransition({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-enter">{children}</div>
}
```

Corresponding Tailwind utility added via `tokens.css`:
```css
.animate-page-enter {
  animation: selahPageEnter 450ms ease-out forwards;
}
```

Applied in each page component's top-level return. The skeleton-to-content swap (via `loading.tsx` → page mount) creates the transition effect.

### Panel Transition Audit

Verify all panel open/close animations reference `--selah-transition-panel` (250ms ease-out). Specific targets:
- Context drawer (ReaderView) — desktop slide-in
- Mobile bottom sheet — slide-up
- AI panel (ResizablePanel)
- Sidebar collapse/expand

Update any hardcoded `duration-150` or `duration-200` on panel elements to use the token.

### Resurfacing Card Animation

Add CSS class `animate-resurface` to the ResurfacingCard component:
```css
.animate-resurface {
  animation: selahResurface 400ms ease-out forwards;
}
```

---

## 4. Resurfacing Card Color Fix

### tokens.css Addition

```css
:root {
  --selah-resurface-quote: var(--selah-gold-100);  /* #F5E4B8 — light on dark */
}

[data-theme="light"], .light {
  --selah-resurface-quote: var(--selah-gold-700);  /* #7A5C1F — dark on parchment */
}

@media (prefers-color-scheme: light) {
  [data-theme="system"] {
    --selah-resurface-quote: var(--selah-gold-700);
  }
}
```

The ResurfacingCard already references `var(--selah-resurface-quote)` at line 413 of ReaderView.tsx — once the variable is defined, both modes work correctly with no component changes needed.

---

## 5. Responsive Layout

### Max-Width Constraint

Add `max-w-7xl mx-auto` to the main content area inside AppShell. The sidebar remains fixed/absolute; only the content region is constrained.

**Excluded:** Reader view — it has its own panel-based layout (reading pane + context drawer + AI panel) that should fill available width.

### Settings Mobile Fix

Settings form rows switch layout below `md:` breakpoint:
- Desktop (`md:+`): `flex-row` — label left, control right
- Mobile (`<md`): `flex-col` — label above, control full-width

Specific changes in `SettingsView.tsx`:
- Slider containers: add `w-full md:w-auto` 
- Select dropdowns: add `w-full md:w-auto`
- Row layout: `flex flex-col md:flex-row md:items-center md:justify-between`
- Section padding: tighten on mobile

---

## 6. Performance — Route-Level Loading

Add `loading.tsx` files at each route segment using pre-composed skeletons:

| Route | Skeleton |
|-------|----------|
| `src/app/(shell)/read/loading.tsx` | `<ReaderSkeleton />` |
| `src/app/(shell)/characters/loading.tsx` | `<BrowseSkeleton />` |
| `src/app/(shell)/themes/loading.tsx` | `<BrowseSkeleton />` |
| `src/app/(shell)/word-study/loading.tsx` | `<BrowseSkeleton />` |
| `src/app/(shell)/daily-bread/loading.tsx` | `<DetailSkeleton />` |
| `src/app/(shell)/journal/loading.tsx` | `<BrowseSkeleton />` |
| `src/app/(shell)/settings/loading.tsx` | `<SettingsSkeleton />` |

Next.js automatically wraps each route segment in a Suspense boundary when `loading.tsx` is present. This provides:
- Route-level code splitting (automatic)
- Skeleton fallback during async data loading
- Smooth skeleton → content transition via PageTransition wrapper

No additional `next/dynamic` imports or manual Suspense boundaries needed.

---

## 7. Docker HEALTHCHECK

Add to Dockerfile (runner stage):

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1
```

Uses `wget` (available in Alpine) instead of `curl`. Starts checking 10s after container boot, retries 3 times at 30s intervals before marking unhealthy.

---

## Files Changed Summary

### New Files
| File | Purpose |
|------|---------|
| `src/components/ui/Skeleton.tsx` | Base skeleton + pre-composed page skeletons |
| `src/components/ui/Toast.tsx` | Toast notification component |
| `src/components/ui/ToastProvider.tsx` | Toast context provider + useToast hook |
| `src/components/ui/ConfirmDialog.tsx` | Inline confirmation dialog |
| `src/components/ui/PageTransition.tsx` | Page fade+lift wrapper |
| `src/app/(shell)/error.tsx` | 500 error boundary |
| `src/app/(shell)/not-found.tsx` | 404 page |
| `src/app/(shell)/read/loading.tsx` | Reader skeleton |
| `src/app/(shell)/characters/loading.tsx` | Browse skeleton |
| `src/app/(shell)/themes/loading.tsx` | Browse skeleton |
| `src/app/(shell)/word-study/loading.tsx` | Browse skeleton |
| `src/app/(shell)/daily-bread/loading.tsx` | Detail skeleton |
| `src/app/(shell)/journal/loading.tsx` | Browse skeleton |
| `src/app/(shell)/settings/loading.tsx` | Settings skeleton |

### Modified Files
| File | Changes |
|------|---------|
| `src/app/styles/tokens.css` | Add keyframes (shimmer, resurface, page-enter, toast-in), `--selah-resurface-quote` variable, animation utility classes |
| `src/components/reader/ReaderView.tsx` | Add `animate-resurface` class to ResurfacingCard |
| `src/components/shell/AppShell.tsx` | Add `max-w-7xl mx-auto` to content wrapper |
| `src/app/(shell)/layout.tsx` | Wrap children with ToastProvider |
| `src/components/settings/SettingsView.tsx` | Mobile-responsive form rows, replace alert/confirm calls |
| `src/app/(shell)/journal/[id]/JournalDetailClient.tsx` | Replace alert/confirm with toast/ConfirmDialog |
| `src/components/study-builder/ProjectLanding.tsx` | Replace confirm with ConfirmDialog |
| `Dockerfile` | Add HEALTHCHECK instruction |

---

## Implementation Order

1. **tokens.css** — All keyframes, variables, utility classes
2. **Skeleton.tsx** — Base component + page skeletons
3. **Toast + ConfirmDialog** — Notification infrastructure
4. **PageTransition.tsx** — Fade wrapper
5. **error.tsx + not-found.tsx** — Error boundaries
6. **loading.tsx files** — Deploy skeletons across routes
7. **ResurfacingCard** — Animation class + color fix (already works via CSS var)
8. **AppShell** — Max-width constraint
9. **SettingsView** — Mobile responsive fix
10. **Alert replacements** — Swap all alert/confirm calls
11. **Panel transition audit** — Verify token usage
12. **Dockerfile** — HEALTHCHECK
13. **Page components** — Wrap top-level returns in PageTransition
