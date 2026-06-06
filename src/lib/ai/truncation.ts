/**
 * Truncation detection for streamed AI responses.
 *
 * Provider adapters normalize their SDK's terminal signal into a `FinishReason`
 * and return it from `stream()`. The send routes use the helpers here to decide
 * whether a response that *looked* complete (the stream ended without throwing)
 * was actually cut short — so the UI can say so instead of silently presenting a
 * half-finished answer.
 */

/**
 * Normalized terminal reason for a streamed completion.
 * - `'stop'`   — clean, natural completion (model emitted end-of-turn).
 * - `'length'` — the model hit the max-tokens cap mid-thought.
 * - `null`     — the adapter ran to completion but the upstream stream ended
 *                without ever signaling a finish reason. That means the
 *                connection was severed mid-generation (e.g. the model server
 *                dropped the request). This is the silent-truncation case.
 */
export type FinishReason = 'stop' | 'length' | null

/**
 * Whether a finished stream was actually truncated.
 *
 * `undefined` means the adapter does not report finish reasons at all — we
 * cannot tell, so we do NOT flag it (avoiding false positives on providers
 * that have not been wired up).
 */
export function isTruncated(finishReason: FinishReason | undefined): boolean {
  return finishReason === 'length' || finishReason === null
}

/**
 * A user-facing notice explaining the truncation, or `null` if the response
 * completed normally (or we cannot tell).
 */
export function truncationNotice(finishReason: FinishReason | undefined): string | null {
  if (!isTruncated(finishReason)) return null
  if (finishReason === 'length') {
    return 'This response was cut off because it reached the maximum length. Increase the max-tokens setting or ask for a shorter answer.'
  }
  // finishReason === null → the connection ended before the model finished.
  return 'This response was cut off before it finished — the connection to the model ended unexpectedly. On very large prompts, try reducing the grounding context, then retry.'
}

/**
 * Normalize an OpenAI-style `finish_reason` (also used by OpenRouter and most
 * OpenAI-compatible servers). Unknown/absent values collapse to `null`.
 */
export function normalizeOpenAIFinish(reason: string | null | undefined): FinishReason {
  if (reason === 'stop' || reason === 'length') return reason
  return null
}

/** Normalize an Anthropic `stop_reason`. */
export function normalizeAnthropicFinish(reason: string | null | undefined): FinishReason {
  if (reason === 'max_tokens') return 'length'
  if (reason === 'end_turn' || reason === 'stop_sequence') return 'stop'
  return null
}

/** Normalize a Google Gemini `finishReason`. */
export function normalizeGoogleFinish(reason: string | null | undefined): FinishReason {
  if (reason === 'MAX_TOKENS') return 'length'
  if (reason === 'STOP') return 'stop'
  return null
}

/** Normalize an Ollama `done_reason`. */
export function normalizeOllamaFinish(reason: string | null | undefined): FinishReason {
  if (reason === 'length') return 'length'
  if (reason === 'stop') return 'stop'
  return null
}
