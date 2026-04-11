'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { X } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

type ToastType = 'error' | 'success' | 'info'

interface ToastItem {
  id: number
  type: ToastType
  title: string
  message?: string
}

interface ToastContextValue {
  add: (type: ToastType, title: string, message?: string) => void
  remove: (id: number) => void
}

// ─── ID counter ──────────────────────────────────────────────────────────────

let nextId = 0

// ─── Context ─────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null)

// ─── Type config ─────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<ToastType, { color: string; icon: string; dismissMs: number }> = {
  error:   { color: '#D4836B', icon: '⚠', dismissMs: 5000 },
  success: { color: '#4A9E88', icon: '✓', dismissMs: 3000 },
  info:    { color: '#C6A23C', icon: 'ℹ', dismissMs: 3000 },
}

// ─── ToastCard ────────────────────────────────────────────────────────────────

interface ToastCardProps {
  toast: ToastItem
  onRemove: (id: number) => void
}

function ToastCard({ toast, onRemove }: ToastCardProps) {
  const [exiting, setExiting] = useState(false)
  const config = TYPE_CONFIG[toast.type]

  const dismiss = useCallback(() => {
    setExiting(true)
    setTimeout(() => onRemove(toast.id), 250)
  }, [toast.id, onRemove])

  // Auto-dismiss timer
  useEffect(() => {
    const timer = setTimeout(dismiss, config.dismissMs)
    return () => clearTimeout(timer)
  }, [dismiss, config.dismissMs])

  return (
    <div
      className={exiting ? 'animate-toast-out' : 'animate-toast-in'}
      style={{
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        maxWidth: '420px',
        width: '100%',
        background: 'var(--selah-bg-elevated, #292524)',
        border: '1px solid var(--selah-border-color, #3D3835)',
        borderLeft: `3px solid ${config.color}`,
        borderRadius: '6px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        padding: '10px 12px',
        boxSizing: 'border-box',
      }}
    >
      {/* Type icon */}
      <span
        aria-hidden="true"
        style={{
          color: config.color,
          fontSize: '14px',
          lineHeight: '1',
          marginTop: '1px',
          flexShrink: 0,
          fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
        }}
      >
        {config.icon}
      </span>

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
            color: 'var(--selah-text-1, #E8E0D8)',
            fontSize: '13px',
            fontWeight: 600,
            lineHeight: '1.4',
          }}
        >
          {toast.title}
        </p>
        {toast.message && (
          <p
            style={{
              margin: '3px 0 0',
              fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
              color: 'var(--selah-text-3, #8A7F78)',
              fontSize: '12px',
              lineHeight: '1.5',
            }}
          >
            {toast.message}
          </p>
        )}
      </div>

      {/* Dismiss button */}
      <button
        onClick={dismiss}
        aria-label="Dismiss notification"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '2px',
          color: 'var(--selah-text-3, #8A7F78)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '1px',
          borderRadius: '3px',
          lineHeight: '1',
        }}
      >
        <X size={14} />
      </button>
    </div>
  )
}

// ─── ToastProvider ────────────────────────────────────────────────────────────

interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const add = useCallback((type: ToastType, title: string, message?: string) => {
    const id = nextId++
    setToasts(prev => [...prev, { id, type, title, message }])
  }, [])

  const remove = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ add, remove }}>
      {children}

      {/* Toast container */}
      <div
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        {toasts.map(toast => (
          <ToastCard key={toast.id} toast={toast} onRemove={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// ─── useToast hook ────────────────────────────────────────────────────────────

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return {
    error: (title: string, message?: string) => ctx.add('error', title, message),
    success: (title: string, message?: string) => ctx.add('success', title, message),
    info: (title: string, message?: string) => ctx.add('info', title, message),
  }
}
