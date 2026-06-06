import { describe, it, expect } from 'vitest'
import { createThinkStripper } from '@/lib/ai/think-filter'

/** Feed a list of chunks, return the fully-stripped output. */
function strip(chunks: string[]): string {
  const s = createThinkStripper()
  let out = ''
  for (const c of chunks) out += s.push(c)
  out += s.flush()
  return out
}

describe('createThinkStripper', () => {
  it('passes through plain text unchanged', () => {
    expect(strip(['Hello ', 'world.'])).toBe('Hello world.')
  })

  it('removes a think block fully inside one chunk', () => {
    expect(strip(['<think>reasoning here</think>The answer.'])).toBe('The answer.')
  })

  it('keeps text before and after a think block', () => {
    expect(strip(['Intro. <think>hidden</think> Outro.'])).toBe('Intro.  Outro.')
  })

  it('handles a think block split across many chunks', () => {
    expect(strip(['Pre <thi', 'nk>secret rea', 'soning</thi', 'nk> Post'])).toBe('Pre  Post')
  })

  it('handles the open tag split right at the boundary', () => {
    expect(strip(['answer<', 'think>x</think>!'])).toBe('answer!')
  })

  it('strips multiple think blocks', () => {
    expect(strip(['<think>a</think>X<think>b</think>Y'])).toBe('XY')
  })

  it('drops an unclosed think block (model ran out mid-reasoning)', () => {
    // The whole budget went to reasoning that never closed → no answer.
    expect(strip(['<think>still thinking and then the stream just ends'])).toBe('')
  })

  it('emits content that follows a closed block even if reasoning was long', () => {
    expect(strip(['<think>', 'lots ', 'of ', 'thought', '</think>', 'Final answer (Canon).'])).toBe('Final answer (Canon).')
  })

  it('does not hold back a lone < that is not a tag', () => {
    expect(strip(['2 < 3 is true'])).toBe('2 < 3 is true')
  })

  it('emits a dangling partial-tag-like tail that never completes', () => {
    // Ends looking like it might start a tag but never does.
    expect(strip(['done <thi'])).toBe('done <thi')
  })

  it('streams answer tokens immediately (no buffering of clean text)', () => {
    const s = createThinkStripper()
    expect(s.push('The ')).toBe('The ')
    expect(s.push('quick ')).toBe('quick ')
    expect(s.push('fox.')).toBe('fox.')
    expect(s.flush()).toBe('')
  })
})
