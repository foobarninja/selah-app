'use client'

import { useEffect, useRef } from 'react'

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
    if (open) {
      confirmRef.current?.focus()
    }
  }, [open])

  if (!open) return null

  function handleBackdropKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') onCancel()
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onCancel()
  }

  return (
    <div
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        backgroundColor: 'rgba(15, 13, 11, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="animate-page-enter"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
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
        <p
          id="confirm-dialog-title"
          style={{
            fontFamily: "var(--selah-font-display, 'Cormorant Garamond', serif)",
            fontSize: '20px',
            fontWeight: 500,
            color: 'var(--selah-text-1)',
            marginBottom: '8px',
          }}
        >
          {title}
        </p>

        <p
          style={{
            fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
            fontSize: '14px',
            color: 'var(--selah-text-2)',
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
              border: '1px solid var(--selah-border-color)',
              background: 'transparent',
              color: 'var(--selah-text-1)',
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
