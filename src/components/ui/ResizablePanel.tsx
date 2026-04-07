'use client'

import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react'

interface ResizablePanelProps {
  children: ReactNode
  defaultWidth: number
  minWidth?: number
  maxWidth?: number
  side: 'left' | 'right'
  storageKey?: string
  className?: string
  style?: React.CSSProperties
}

export function ResizablePanel({
  children,
  defaultWidth,
  minWidth = 240,
  maxWidth = 700,
  side,
  storageKey,
  className = '',
  style,
}: ResizablePanelProps) {
  const [width, setWidth] = useState(defaultWidth)
  const [hydrated, setHydrated] = useState(false)
  const dragging = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  useEffect(() => {
    if (storageKey) {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = parseInt(stored, 10)
        if (!isNaN(parsed) && parsed >= minWidth && parsed <= maxWidth) setWidth(parsed)
      }
    }
    setHydrated(true)
  }, [storageKey, minWidth, maxWidth])

  useEffect(() => {
    if (hydrated && storageKey) localStorage.setItem(storageKey, String(width))
  }, [width, hydrated, storageKey])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragging.current = true
    startX.current = e.clientX
    startWidth.current = width
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [width])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      const delta = side === 'right'
        ? startX.current - e.clientX
        : e.clientX - startX.current
      const newWidth = Math.min(maxWidth, Math.max(minWidth, startWidth.current + delta))
      setWidth(newWidth)
    }

    const onMouseUp = () => {
      if (!dragging.current) return
      dragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [side, minWidth, maxWidth])

  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '5px',
    cursor: 'col-resize',
    zIndex: 10,
    ...(side === 'right' ? { left: 0 } : { right: 0 }),
  }

  const handleHoverStyle = `
    .selah-resize-handle:hover, .selah-resize-handle:active {
      background-color: var(--selah-gold-500, #C6A23C);
      opacity: 0.4;
    }
  `

  return (
    <div
      className={className}
      style={{
        ...style,
        width: `${width}px`,
        position: 'relative',
        flexShrink: 0,
        transition: hydrated ? undefined : 'none',
      }}
    >
      <style>{handleHoverStyle}</style>
      <div
        className="selah-resize-handle"
        style={handleStyle}
        onMouseDown={onMouseDown}
      />
      {children}
    </div>
  )
}
