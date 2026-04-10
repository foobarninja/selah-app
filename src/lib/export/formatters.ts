import { BOOK_NAMES } from '@/lib/constants'

/** Format an ISO datetime string as a human-readable date. */
export function formatDate(isoStr: string, style: 'long' | 'short' = 'long'): string {
  try {
    const date = new Date(isoStr)
    if (isNaN(date.getTime())) return isoStr
    if (style === 'long') {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return isoStr
  }
}

/** Format an ISO datetime string as hour:minute. Returns empty string on failure. */
export function formatTime(isoStr: string): string {
  try {
    const date = new Date(isoStr)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

/** Format a verse reference using the book display name. */
export function formatVerseRef(
  bookId: string,
  chapter: number,
  verse: number,
  endVerse?: number,
): string {
  const bookName = BOOK_NAMES[bookId] ?? bookId
  if (endVerse && endVerse !== verse) {
    return `${bookName} ${chapter}:${verse}-${endVerse}`
  }
  return `${bookName} ${chapter}:${verse}`
}

/** Format a list of ISO dates as a single date or an en-dash range. */
export function formatDateRange(isoDates: string[]): string {
  if (isoDates.length === 0) return 'No entries'
  const sorted = [...isoDates].sort((a, b) => a.localeCompare(b))
  const first = formatDate(sorted[0], 'short')
  const last = formatDate(sorted[sorted.length - 1], 'short')
  return first === last ? first : `${first} – ${last}`
}
