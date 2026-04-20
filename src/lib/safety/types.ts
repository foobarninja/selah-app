// src/lib/safety/types.ts
//
// Shared flag types. Imported by scan.ts, marker.ts, thread-store,
// audit queries. Single source of truth for the severity vocabulary.

export type FlagLevel = 'critical' | 'concerning' | 'sensitive'

export type FlagSource = 'keyword' | 'model' | 'both'

export const FLAG_LEVEL_ORDER: Record<FlagLevel, number> = {
  sensitive: 1,
  concerning: 2,
  critical: 3,
}

// Return the higher-severity level, preferring `a` on tie.
// Null inputs are treated as below-sensitive.
export function maxFlagLevel(
  a: FlagLevel | null,
  b: FlagLevel | null,
): FlagLevel | null {
  if (!a && !b) return null
  if (!a) return b
  if (!b) return a
  return FLAG_LEVEL_ORDER[a] >= FLAG_LEVEL_ORDER[b] ? a : b
}
