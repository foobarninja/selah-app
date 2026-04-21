// src/lib/ai/sanitize-error.ts
//
// Safe provider-error-to-user-message mapping. Every AI route should funnel
// provider errors through this helper instead of echoing err.message — raw
// messages from fetch / OpenAI / Anthropic / Google can contain API keys,
// bearer tokens, internal URLs, or long stack traces.

const INVALID_KEY_MESSAGE = 'Invalid API key. Check your settings.'
const RATE_LIMIT_MESSAGE = 'Rate limited. Try again in a moment.'
const CONTEXT_LENGTH_MESSAGE =
  'Message too long. Try a shorter question or start a new conversation.'
const GENERIC_MESSAGE =
  'The AI provider returned an error. Check your settings or try again.'

export function sanitizeProviderError(err: unknown): string {
  const raw = err instanceof Error ? err.message : typeof err === 'string' ? err : ''
  if (!raw) return GENERIC_MESSAGE

  const lower = raw.toLowerCase()
  if (
    lower.includes('401') ||
    lower.includes('unauthorized') ||
    lower.includes('invalid_api_key') ||
    lower.includes('invalid api key')
  ) {
    return INVALID_KEY_MESSAGE
  }
  if (lower.includes('429') || lower.includes('rate_limit') || lower.includes('rate limit')) {
    return RATE_LIMIT_MESSAGE
  }
  if (lower.includes('context_length') || lower.includes('context length') || lower.includes('token limit')) {
    return CONTEXT_LENGTH_MESSAGE
  }

  // For unclassified errors, refuse to leak the raw message — it may contain
  // bearer tokens, URLs with keys, or multi-paragraph stack traces. The log
  // still has the full text; the user just sees a generic notice.
  return GENERIC_MESSAGE
}
