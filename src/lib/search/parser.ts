/**
 * Compound search query parser.
 *
 * Accepts a freeform user query with boolean operators and produces:
 *   - an FTS5-compatible boolean expression for full-text search buckets
 *     (verses, narrative units)
 *   - flat lists of positive and negative terms for LIKE-based entity
 *     buckets (characters, themes, Strong's)
 *
 * Grammar (informal):
 *
 *   query    := (term | operator)*
 *   term     := bareWord | phrase
 *   phrase   := '"' .* '"'
 *   operator := and | or | not
 *   and      := 'and' | '&' | (implicit between adjacent terms)
 *   or       := 'or'  | '|'
 *   not      := 'not' | '-' (prefix on the next term, no space between)
 *
 * Precedence: NOT > AND > OR (standard Lucene/FTS5).
 *
 * Quoted phrases escape all operator recognition — so `"do not kill"` is a
 * single literal phrase, not a NOT expression.
 */

export interface ParsedSearchQuery {
  /** FTS5-compatible boolean expression, or null if there are no usable positive terms. */
  ftsExpression: string | null
  /** Positive terms flattened across all OR groups, for entity LIKE search. */
  positiveTerms: string[]
  /** Negative terms flattened across all OR groups, for entity exclusion. */
  negativeTerms: string[]
  /** The original (trimmed) query. */
  raw: string
}

type Token =
  | { kind: 'term'; text: string; negated: boolean }
  | { kind: 'or' }

interface Group {
  positive: string[]
  negative: string[]
}

export function parseSearchQuery(raw: string): ParsedSearchQuery {
  const trimmed = raw.trim()
  if (!trimmed) {
    return { ftsExpression: null, positiveTerms: [], negativeTerms: [], raw: trimmed }
  }

  const tokens = tokenize(trimmed)
  if (tokens.length === 0) {
    return { ftsExpression: null, positiveTerms: [], negativeTerms: [], raw: trimmed }
  }

  // Split into OR groups. Implicit AND is handled by adjacency inside a group.
  const groups: Group[] = [{ positive: [], negative: [] }]
  for (const tok of tokens) {
    if (tok.kind === 'or') {
      groups.push({ positive: [], negative: [] })
      continue
    }
    const g = groups[groups.length - 1]
    if (tok.negated) g.negative.push(tok.text)
    else g.positive.push(tok.text)
  }

  // Flatten for entity search.
  const positiveTerms = groups.flatMap((g) => g.positive)
  const negativeTerms = groups.flatMap((g) => g.negative)

  // Build FTS5 expression. Only groups with at least one positive term are
  // usable — FTS5's NOT is binary, so a bare negation has no left operand.
  const usable = groups.filter((g) => g.positive.length > 0)
  let ftsExpression: string | null
  if (usable.length === 0) {
    ftsExpression = null
  } else if (usable.length === 1) {
    ftsExpression = buildFtsGroup(usable[0])
  } else {
    ftsExpression = usable.map((g) => `(${buildFtsGroup(g)})`).join(' OR ')
  }

  return { ftsExpression, positiveTerms, negativeTerms, raw: trimmed }
}

function buildFtsGroup(g: Group): string {
  let expr = g.positive.map(quoteFtsPhrase).join(' AND ')
  for (const neg of g.negative) {
    expr += ' NOT ' + quoteFtsPhrase(neg)
  }
  return expr
}

/**
 * Wrap any term as an FTS5 phrase. Phrase syntax is the safest escaping —
 * it handles multi-word terms, punctuation, and avoids collisions with
 * FTS5 operator keywords.
 */
function quoteFtsPhrase(term: string): string {
  return '"' + term.replace(/"/g, '""') + '"'
}

/**
 * Tokenize a query string into terms and OR separators. AND is implicit
 * between adjacent terms; NOT is folded into the `negated` flag on the
 * following term.
 */
function tokenize(query: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  let nextNegated = false

  const pushTerm = (text: string) => {
    if (!text) return
    tokens.push({ kind: 'term', text, negated: nextNegated })
    nextNegated = false
  }

  while (i < query.length) {
    const c = query[i]

    // Whitespace
    if (c === ' ' || c === '\t' || c === '\n' || c === '\r') {
      i++
      continue
    }

    // Quoted phrase
    if (c === '"') {
      const end = query.indexOf('"', i + 1)
      const raw = end === -1 ? query.slice(i + 1) : query.slice(i + 1, end)
      const phrase = raw.trim()
      if (phrase) pushTerm(phrase)
      i = end === -1 ? query.length : end + 1
      continue
    }

    // OR symbol
    if (c === '|') {
      tokens.push({ kind: 'or' })
      nextNegated = false
      i++
      continue
    }

    // AND symbol — implicit AND already, so just consume
    if (c === '&') {
      i++
      continue
    }

    // NOT prefix — only when glued to the next term char (no space after -)
    if (c === '-' && i + 1 < query.length) {
      const next = query[i + 1]
      if (next !== ' ' && next !== '\t' && next !== '\n' && next !== '-') {
        nextNegated = true
        i++
        continue
      }
    }

    // Bare word — scan until whitespace or special character
    let end = i
    while (end < query.length) {
      const ch = query[end]
      if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') break
      if (ch === '&' || ch === '|' || ch === '"') break
      end++
    }
    const word = query.slice(i, end)
    i = end

    // Check for operator keywords (case-insensitive)
    const lower = word.toLowerCase()
    if (lower === 'and') {
      // no-op — implicit AND between adjacent terms
      continue
    }
    if (lower === 'or') {
      tokens.push({ kind: 'or' })
      nextNegated = false
      continue
    }
    if (lower === 'not') {
      nextNegated = true
      continue
    }

    // Strip leading/trailing punctuation (but preserve Unicode letters/digits and apostrophes)
    const cleaned = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')
    if (cleaned) pushTerm(cleaned)
  }

  return tokens
}
