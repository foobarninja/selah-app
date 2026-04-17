import { describe, it, expect } from 'vitest'
import { findOpenRouterPreset, OPENROUTER_PRESETS } from '@/lib/ai/model-presets'

describe('findOpenRouterPreset', () => {
  describe('Qwen Plus matching', () => {
    it('matches qwen/qwen3.5-plus-02-15 (the dated flagship)', () => {
      const p = findOpenRouterPreset('qwen/qwen3.5-plus-02-15')
      expect(p).toBeDefined()
      expect(p?.label).toBe('Qwen Plus (dense flagship)')
      expect(p?.params.temperature).toBe(0.02)
      expect(p?.params.freqPenalty).toBe(0.3)
      expect(p?.params.presPenalty).toBe(0.3)
    })

    it('matches qwen/qwen-plus (no version)', () => {
      const p = findOpenRouterPreset('qwen/qwen-plus')
      expect(p?.params.temperature).toBe(0.02)
    })

    it('matches qwen/qwen3-plus-2025-01-25', () => {
      const p = findOpenRouterPreset('qwen/qwen3-plus-2025-01-25')
      expect(p?.params.temperature).toBe(0.02)
    })

    it('case-insensitive', () => {
      const p = findOpenRouterPreset('QWEN/Qwen-Plus-Latest')
      expect(p?.params.temperature).toBe(0.02)
    })
  })

  describe('Anthropic Claude matching', () => {
    it('matches anthropic/claude-sonnet-4', () => {
      const p = findOpenRouterPreset('anthropic/claude-sonnet-4')
      expect(p).toBeDefined()
      expect(p?.label).toBe('Anthropic Claude')
      expect(p?.params.temperature).toBe(1)
      expect(p?.params.freqPenalty).toBe(0)
      expect(p?.params.presPenalty).toBe(0)
    })

    it('matches anthropic/claude-opus-4-6', () => {
      const p = findOpenRouterPreset('anthropic/claude-opus-4-6')
      expect(p?.label).toBe('Anthropic Claude')
    })

    it('matches anthropic/claude-haiku-4-5-20251001', () => {
      const p = findOpenRouterPreset('anthropic/claude-haiku-4-5-20251001')
      expect(p?.label).toBe('Anthropic Claude')
    })

    it('case-insensitive', () => {
      const p = findOpenRouterPreset('Anthropic/Claude-Sonnet-4')
      expect(p?.label).toBe('Anthropic Claude')
    })
  })

  describe('non-matches', () => {
    it('does not match qwen/qwen-2.5-72b-instruct (open-weight, not Plus)', () => {
      expect(findOpenRouterPreset('qwen/qwen-2.5-72b-instruct')).toBeUndefined()
    })

    it('does not match qwen/qwen-max', () => {
      expect(findOpenRouterPreset('qwen/qwen-max')).toBeUndefined()
    })

    it('does not match qwen/qwen3-30b-a3b (MoE open-weight)', () => {
      expect(findOpenRouterPreset('qwen/qwen3-30b-a3b')).toBeUndefined()
    })

    it('does not match google/gemma-4-36b', () => {
      expect(findOpenRouterPreset('google/gemma-4-36b')).toBeUndefined()
    })
  })

  describe('edge cases', () => {
    it('returns undefined for empty string', () => {
      expect(findOpenRouterPreset('')).toBeUndefined()
    })

    it('preset list is non-empty', () => {
      expect(OPENROUTER_PRESETS.length).toBeGreaterThan(0)
    })

    it('every preset has a non-empty label and reason', () => {
      for (const p of OPENROUTER_PRESETS) {
        expect(p.label.length).toBeGreaterThan(0)
        expect(p.reason.length).toBeGreaterThan(0)
      }
    })

    it('every preset has plausible parameter values', () => {
      for (const p of OPENROUTER_PRESETS) {
        expect(p.params.temperature).toBeGreaterThanOrEqual(0)
        expect(p.params.temperature).toBeLessThanOrEqual(2)
        expect(p.params.topP).toBeGreaterThan(0)
        expect(p.params.topP).toBeLessThanOrEqual(1)
        expect(p.params.maxTokens).toBeGreaterThan(0)
        expect(p.params.freqPenalty).toBeGreaterThanOrEqual(-2)
        expect(p.params.freqPenalty).toBeLessThanOrEqual(2)
        expect(p.params.presPenalty).toBeGreaterThanOrEqual(-2)
        expect(p.params.presPenalty).toBeLessThanOrEqual(2)
      }
    })
  })
})
