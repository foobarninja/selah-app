// src/lib/safety/marker.ts
//
// Parse the optional [SAFETY:CRITICAL] / [SAFETY:CONCERNING] marker
// from the FIRST LINE of an assistant response. The marker is stripped
// from the user-facing output and surfaced to the audit system.
//
// Important: this function runs ONLY on assistant messages, never on
// user input. A user typing "[SAFETY:CRITICAL]" as their message must
// not produce a flag. The stream route enforces this by calling
// extractSafetyMarker exclusively on the accumulated assistant output.

import type { FlagLevel } from './types'

const MARKER_RE = /^\[SAFETY:(CRITICAL|CONCERNING)\]\s*\n/

export interface ExtractResult {
  level: FlagLevel | null
  stripped: string
}

export function extractSafetyMarker(text: string): ExtractResult {
  if (!text) return { level: null, stripped: '' }

  const match = text.match(MARKER_RE)
  if (!match) return { level: null, stripped: text }

  const token = match[1]
  const level: FlagLevel = token === 'CRITICAL' ? 'critical' : 'concerning'
  const afterMarker = text.slice(match[0].length)
  const stripped = afterMarker.startsWith('\n') ? afterMarker.slice(1) : afterMarker
  return { level, stripped }
}
