'use client'

import { useEffect, useState } from 'react'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface PinPadProps {
  onSubmit: (pin: string) => void
  onCancel?: () => void
  error?: boolean  // trigger shake
  disabled?: boolean
}

export function PinPad({ onSubmit, onCancel, error, disabled }: PinPadProps) {
  const [pin, setPin] = useState('')
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (error) {
      setShake(true)
      setPin('')
      const t = setTimeout(() => setShake(false), 400)
      return () => clearTimeout(t)
    }
  }, [error])

  useEffect(() => {
    if (pin.length === 4 && !disabled) {
      onSubmit(pin)
    }
  }, [pin, onSubmit, disabled])

  const press = (d: string) => {
    if (disabled || pin.length >= 4) return
    setPin((p) => p + d)
  }

  const backspace = () => {
    if (disabled) return
    setPin((p) => p.slice(0, -1))
  }

  const digits = ['1','2','3','4','5','6','7','8','9']

  return (
    <div
      style={{
        animation: shake ? 'selahPinShake 0.4s' : undefined,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '18px' }}>
        {[0,1,2,3].map((i) => (
          <div
            key={i}
            style={{
              width: '14px', height: '14px', borderRadius: '50%',
              backgroundColor: i < pin.length ? 'var(--selah-gold-500, #C6A23C)' : 'var(--selah-border-color, #3D3835)',
              transition: 'background 120ms',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 72px)', gap: '10px', justifyContent: 'center' }}>
        {digits.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => press(d)}
            disabled={disabled}
            style={{
              width: '72px', height: '72px', borderRadius: '50%',
              backgroundColor: 'var(--selah-bg-elevated, #292524)',
              color: 'var(--selah-text-1, #E8E2D9)',
              border: '1px solid var(--selah-border-color, #3D3835)',
              fontFamily: font.body, fontSize: '22px', fontWeight: 500,
              cursor: disabled ? 'default' : 'pointer',
            }}
          >
            {d}
          </button>
        ))}
        <button
          type="button"
          onClick={onCancel}
          disabled={disabled || !onCancel}
          aria-label="Cancel"
          style={{
            width: '72px', height: '72px', borderRadius: '50%',
            backgroundColor: 'transparent',
            color: 'var(--selah-text-3, #6E695F)',
            border: '1px solid var(--selah-border-color, #3D3835)',
            fontFamily: font.body, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px',
            cursor: !onCancel || disabled ? 'default' : 'pointer',
            opacity: onCancel ? 1 : 0.3,
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => press('0')}
          disabled={disabled}
          style={{
            width: '72px', height: '72px', borderRadius: '50%',
            backgroundColor: 'var(--selah-bg-elevated, #292524)',
            color: 'var(--selah-text-1, #E8E2D9)',
            border: '1px solid var(--selah-border-color, #3D3835)',
            fontFamily: font.body, fontSize: '22px', fontWeight: 500,
            cursor: disabled ? 'default' : 'pointer',
          }}
        >
          0
        </button>
        <button
          type="button"
          onClick={backspace}
          disabled={disabled}
          aria-label="Backspace"
          style={{
            width: '72px', height: '72px', borderRadius: '50%',
            backgroundColor: 'transparent',
            color: 'var(--selah-text-3, #6E695F)',
            border: '1px solid var(--selah-border-color, #3D3835)',
            fontFamily: font.body, fontSize: '18px',
            cursor: disabled ? 'default' : 'pointer',
          }}
        >
          ⌫
        </button>
      </div>
      <style>{`@keyframes selahPinShake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }`}</style>
    </div>
  )
}
