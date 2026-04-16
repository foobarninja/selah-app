export const AI_TIER = "ai_assisted" as const;

const SESSION_ID = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export function sessionId(): string {
  return SESSION_ID;
}

export function buildSourceNotes(opts: { model?: string; revisionOf?: string | null } = {}): string {
  const parts = [
    `selah-ai-mcp v1`,
    new Date().toISOString(),
    `session:${SESSION_ID}`,
  ];
  if (opts.model) parts.push(`model:${opts.model}`);
  if (opts.revisionOf) parts.push(`revisionOf:${opts.revisionOf}`);
  return parts.join(" | ");
}

export function appendRevisionMarker(existing: string | null | undefined, marker: string): string {
  if (!existing || existing.trim().length === 0) return marker;
  return `${existing}\n---\n${marker}`;
}
