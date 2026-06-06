/**
 * Streaming-safe stripper for inline reasoning blocks.
 *
 * Some local reasoning models (e.g. Gemma/Qwen served via llama.cpp / Unsloth
 * Studio) emit their chain-of-thought inline in the content channel wrapped in
 * `<think>…</think>` tags, rather than in a separate `reasoning_content` field.
 * Left alone, those tags stream straight into the user's answer and pollute
 * citation extraction. This filter removes the tagged regions on the fly,
 * holding back only the minimal suffix that could be the start of a tag split
 * across chunk boundaries.
 *
 * It is deliberately conservative: it strips ONLY the well-known `<think>`
 * block. Untagged text always passes through unchanged.
 */

const OPEN = '<think>'
const CLOSE = '</think>'

/** Longest suffix of `s` that is a proper prefix of `tag` (for split tags). */
function partialSuffixLen(s: string, tag: string): number {
  const max = Math.min(s.length, tag.length - 1)
  for (let n = max; n > 0; n--) {
    if (tag.startsWith(s.slice(s.length - n))) return n
  }
  return 0
}

export interface ThinkStripper {
  /** Feed a streamed chunk; returns the text safe to surface now. */
  push(chunk: string): string
  /** Call once at end of stream; returns any safely-held trailing text. */
  flush(): string
}

export function createThinkStripper(): ThinkStripper {
  let buffer = ''
  let inThink = false

  function process(): string {
    let out = ''
    // Loop until the buffer can't be advanced without more input.
    for (;;) {
      if (!inThink) {
        const i = buffer.indexOf(OPEN)
        if (i === -1) {
          // Emit everything except a possible partial `<think>` at the tail.
          const keep = partialSuffixLen(buffer, OPEN)
          out += buffer.slice(0, buffer.length - keep)
          buffer = buffer.slice(buffer.length - keep)
          break
        }
        out += buffer.slice(0, i)
        buffer = buffer.slice(i + OPEN.length)
        inThink = true
      } else {
        const i = buffer.indexOf(CLOSE)
        if (i === -1) {
          // Discard reasoning; keep only a possible partial `</think>` tail.
          const keep = partialSuffixLen(buffer, CLOSE)
          buffer = buffer.slice(buffer.length - keep)
          break
        }
        buffer = buffer.slice(i + CLOSE.length)
        inThink = false
      }
    }
    return out
  }

  return {
    push(chunk: string): string {
      buffer += chunk
      return process()
    },
    flush(): string {
      // A held tail outside a think block was a false alarm (tag never
      // completed) → emit it. Inside a think block → the reasoning was
      // truncated; drop it.
      if (inThink) {
        buffer = ''
        return ''
      }
      const rest = buffer
      buffer = ''
      return rest
    },
  }
}
