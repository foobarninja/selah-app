import { describe, it, expect } from 'vitest'
import { parseSearchQuery } from '@/lib/search/parser'

describe('parseSearchQuery', () => {
  describe('empty and trivial inputs', () => {
    it('empty string returns null expression and empty term lists', () => {
      const r = parseSearchQuery('')
      expect(r.ftsExpression).toBeNull()
      expect(r.positiveTerms).toEqual([])
      expect(r.negativeTerms).toEqual([])
    })

    it('whitespace-only returns null', () => {
      const r = parseSearchQuery('   \t\n ')
      expect(r.ftsExpression).toBeNull()
    })

    it('single bare term', () => {
      const r = parseSearchQuery('jesus')
      expect(r.positiveTerms).toEqual(['jesus'])
      expect(r.negativeTerms).toEqual([])
      expect(r.ftsExpression).toBe('"jesus"')
    })
  })

  describe('implicit and explicit AND', () => {
    it('two bare terms are implicit AND', () => {
      const r = parseSearchQuery('jesus john')
      expect(r.positiveTerms).toEqual(['jesus', 'john'])
      expect(r.ftsExpression).toBe('"jesus" AND "john"')
    })

    it('& symbol is AND', () => {
      const r = parseSearchQuery('jesus & john')
      expect(r.ftsExpression).toBe('"jesus" AND "john"')
    })

    it('"and" keyword is AND (case-insensitive)', () => {
      const r = parseSearchQuery('jesus AND john')
      expect(r.ftsExpression).toBe('"jesus" AND "john"')
    })

    it('three-term compound', () => {
      const r = parseSearchQuery('jesus & john & miracles')
      expect(r.positiveTerms).toEqual(['jesus', 'john', 'miracles'])
      expect(r.ftsExpression).toBe('"jesus" AND "john" AND "miracles"')
    })
  })

  describe('OR', () => {
    it('| symbol is OR', () => {
      const r = parseSearchQuery('jesus | moses')
      expect(r.positiveTerms).toEqual(['jesus', 'moses'])
      expect(r.ftsExpression).toBe('("jesus") OR ("moses")')
    })

    it('"or" keyword is OR', () => {
      const r = parseSearchQuery('jesus or moses')
      expect(r.ftsExpression).toBe('("jesus") OR ("moses")')
    })
  })

  describe('NOT', () => {
    it('-term prefix is NOT', () => {
      const r = parseSearchQuery('jesus -luke')
      expect(r.positiveTerms).toEqual(['jesus'])
      expect(r.negativeTerms).toEqual(['luke'])
      expect(r.ftsExpression).toBe('"jesus" NOT "luke"')
    })

    it('"not" keyword is NOT', () => {
      const r = parseSearchQuery('jesus not luke')
      expect(r.positiveTerms).toEqual(['jesus'])
      expect(r.negativeTerms).toEqual(['luke'])
      expect(r.ftsExpression).toBe('"jesus" NOT "luke"')
    })

    it('only-negative query yields null FTS expression but keeps negative term', () => {
      const r = parseSearchQuery('-luke')
      expect(r.ftsExpression).toBeNull()
      expect(r.positiveTerms).toEqual([])
      expect(r.negativeTerms).toEqual(['luke'])
    })

    it('multiple negatives on same group', () => {
      const r = parseSearchQuery('jesus -luke -mark')
      expect(r.positiveTerms).toEqual(['jesus'])
      expect(r.negativeTerms).toEqual(['luke', 'mark'])
      expect(r.ftsExpression).toBe('"jesus" NOT "luke" NOT "mark"')
    })
  })

  describe('complex compound with precedence', () => {
    it('(A AND B) OR (C NOT D) — the spec example', () => {
      const r = parseSearchQuery('jesus & john or matthew not luke')
      expect(r.ftsExpression).toBe('("jesus" AND "john") OR ("matthew" NOT "luke")')
      expect(r.positiveTerms).toEqual(['jesus', 'john', 'matthew'])
      expect(r.negativeTerms).toEqual(['luke'])
    })

    it('mixed symbol / keyword operators', () => {
      const r = parseSearchQuery('jesus & john | matthew -luke')
      expect(r.ftsExpression).toBe('("jesus" AND "john") OR ("matthew" NOT "luke")')
    })
  })

  describe('quoted phrases', () => {
    it('phrase as a single term', () => {
      const r = parseSearchQuery('"son of man"')
      expect(r.positiveTerms).toEqual(['son of man'])
      expect(r.ftsExpression).toBe('"son of man"')
    })

    it('phrase escapes operator keywords inside', () => {
      const r = parseSearchQuery('"do not kill"')
      expect(r.positiveTerms).toEqual(['do not kill'])
      expect(r.negativeTerms).toEqual([])
      expect(r.ftsExpression).toBe('"do not kill"')
    })

    it('phrase combined with other terms', () => {
      const r = parseSearchQuery('"son of man" -daniel')
      expect(r.positiveTerms).toEqual(['son of man'])
      expect(r.negativeTerms).toEqual(['daniel'])
      expect(r.ftsExpression).toBe('"son of man" NOT "daniel"')
    })

    it('negated phrase via - prefix', () => {
      const r = parseSearchQuery('jesus -"son of david"')
      expect(r.positiveTerms).toEqual(['jesus'])
      expect(r.negativeTerms).toEqual(['son of david'])
      expect(r.ftsExpression).toBe('"jesus" NOT "son of david"')
    })

    it('unclosed quote captures remainder', () => {
      const r = parseSearchQuery('"unclosed phrase')
      expect(r.positiveTerms).toEqual(['unclosed phrase'])
    })
  })

  describe('edge cases that should not be misread as operators', () => {
    it('"sand" is a term, not AND', () => {
      const r = parseSearchQuery('sand')
      expect(r.positiveTerms).toEqual(['sand'])
    })

    it('"nothing" is a term, not NOT', () => {
      const r = parseSearchQuery('nothing')
      expect(r.positiveTerms).toEqual(['nothing'])
    })

    it('"order" is a term, not OR', () => {
      const r = parseSearchQuery('order')
      expect(r.positiveTerms).toEqual(['order'])
    })

    it('case-insensitive keywords', () => {
      const r = parseSearchQuery('Jesus AND John NOT Luke')
      expect(r.ftsExpression).toBe('"Jesus" AND "John" NOT "Luke"')
      expect(r.positiveTerms).toEqual(['Jesus', 'John'])
      expect(r.negativeTerms).toEqual(['Luke'])
    })

    it('trailing operator is ignored', () => {
      const r = parseSearchQuery('jesus and')
      expect(r.positiveTerms).toEqual(['jesus'])
      expect(r.ftsExpression).toBe('"jesus"')
    })

    it('leading operator is ignored', () => {
      const r = parseSearchQuery('and jesus')
      expect(r.positiveTerms).toEqual(['jesus'])
    })
  })
})
