// Vendored from src/lib/search/parser.ts — kept in-sync manually.
// See that file for the canonical grammar docs.

export interface ParsedSearchQuery {
  ftsExpression: string | null;
  positiveTerms: string[];
  negativeTerms: string[];
  raw: string;
}

type Token = { kind: "term"; text: string; negated: boolean } | { kind: "or" };
interface Group { positive: string[]; negative: string[] }

export function parseSearchQuery(raw: string): ParsedSearchQuery {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ftsExpression: null, positiveTerms: [], negativeTerms: [], raw: trimmed };
  }
  const tokens = tokenize(trimmed);
  if (tokens.length === 0) {
    return { ftsExpression: null, positiveTerms: [], negativeTerms: [], raw: trimmed };
  }
  const groups: Group[] = [{ positive: [], negative: [] }];
  for (const tok of tokens) {
    if (tok.kind === "or") {
      groups.push({ positive: [], negative: [] });
      continue;
    }
    const g = groups[groups.length - 1];
    if (tok.negated) g.negative.push(tok.text);
    else g.positive.push(tok.text);
  }
  const positiveTerms = groups.flatMap((g) => g.positive);
  const negativeTerms = groups.flatMap((g) => g.negative);

  const usable = groups.filter((g) => g.positive.length > 0);
  let ftsExpression: string | null;
  if (usable.length === 0) ftsExpression = null;
  else if (usable.length === 1) ftsExpression = buildFtsGroup(usable[0]);
  else ftsExpression = usable.map((g) => `(${buildFtsGroup(g)})`).join(" OR ");

  return { ftsExpression, positiveTerms, negativeTerms, raw: trimmed };
}

function buildFtsGroup(g: Group): string {
  let expr = g.positive.map(quoteFtsPhrase).join(" AND ");
  for (const neg of g.negative) expr += " NOT " + quoteFtsPhrase(neg);
  return expr;
}

function quoteFtsPhrase(term: string): string {
  return '"' + term.replace(/"/g, '""') + '"';
}

function tokenize(query: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let nextNegated = false;
  const pushTerm = (text: string) => {
    if (!text) return;
    tokens.push({ kind: "term", text, negated: nextNegated });
    nextNegated = false;
  };
  while (i < query.length) {
    const c = query[i];
    if (c === " " || c === "\t" || c === "\n" || c === "\r") { i++; continue; }
    if (c === '"') {
      const end = query.indexOf('"', i + 1);
      const raw = end === -1 ? query.slice(i + 1) : query.slice(i + 1, end);
      const phrase = raw.trim();
      if (phrase) pushTerm(phrase);
      i = end === -1 ? query.length : end + 1;
      continue;
    }
    if (c === "|") { tokens.push({ kind: "or" }); nextNegated = false; i++; continue; }
    if (c === "&") { i++; continue; }
    if (c === "-" && i + 1 < query.length) {
      const next = query[i + 1];
      if (next !== " " && next !== "\t" && next !== "\n" && next !== "-") {
        nextNegated = true; i++; continue;
      }
    }
    let end = i;
    while (end < query.length) {
      const ch = query[end];
      if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") break;
      if (ch === "&" || ch === "|" || ch === '"') break;
      end++;
    }
    const word = query.slice(i, end);
    i = end;
    const lower = word.toLowerCase();
    if (lower === "and") continue;
    if (lower === "or") { tokens.push({ kind: "or" }); nextNegated = false; continue; }
    if (lower === "not") { nextNegated = true; continue; }
    const cleaned = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
    if (cleaned) pushTerm(cleaned);
  }
  return tokens;
}
