import { NextRequest, NextResponse } from 'next/server'
import { getSetting } from '@/lib/settings/queries'
import { sanitizeProviderError } from '@/lib/ai/sanitize-error'

export async function GET(request: NextRequest) {
  // Allow URL override via query param (for settings UI before saving), fall back to stored setting
  const urlParam = request.nextUrl.searchParams.get('url')
  const storedUrl = await getSetting('ollama_url')
  const baseUrl = urlParam || storedUrl || 'http://localhost:11434'

  try {
    const response = await fetch(`${baseUrl}/api/tags`, { signal: AbortSignal.timeout(5000) })
    if (!response.ok) {
      return NextResponse.json({ error: `Ollama returned ${response.status}` }, { status: 502 })
    }
    const data = await response.json()
    const models = (data.models || []).map((m: { name: string; size: number; modified_at: string }) => ({
      name: m.name,
      size: m.size,
      modified: m.modified_at,
    }))
    return NextResponse.json({ models })
  } catch (err: unknown) {
    console.error('[ai/ollama/models] error:', err instanceof Error ? err.message : err)
    return NextResponse.json(
      { error: `Ollama unreachable at ${baseUrl}. Is it running? (${sanitizeProviderError(err)})` },
      { status: 502 }
    )
  }
}
