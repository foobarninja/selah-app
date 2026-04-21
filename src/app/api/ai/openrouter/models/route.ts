import { NextRequest, NextResponse } from 'next/server'
import { getSetting } from '@/lib/settings/queries'
import { decryptValue, isEncrypted } from '@/lib/crypto'
import { sanitizeProviderError } from '@/lib/ai/sanitize-error'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  let apiKey = request.nextUrl.searchParams.get('key')

  // Fall back to the stored key so the user doesn't have to retype it every visit.
  if (!apiKey) {
    const stored =
      (await getSetting('ai_api_key_openrouter')) ||
      (await getSetting('ai_api_key')) ||
      ''
    apiKey = stored ? (isEncrypted(stored) ? decryptValue(stored) : stored) : null
  }

  if (!apiKey) {
    return NextResponse.json({ error: 'API key required' }, { status: 400 })
  }

  try {
    const res = await fetch('https://openrouter.ai/api/v1/models', {
      headers: { Authorization: `Bearer ${apiKey}` },
    })
    if (!res.ok) {
      return NextResponse.json({ error: `OpenRouter returned ${res.status}` }, { status: res.status })
    }
    const data = await res.json()

    const models = (data.data ?? [])
      .filter((m: { pricing?: { prompt?: string; completion?: string } }) =>
        m.pricing?.prompt && m.pricing?.completion
      )
      .map((m: { id: string; name: string; context_length: number; pricing: { prompt: string; completion: string } }) => ({
        id: m.id,
        name: m.name,
        contextLength: m.context_length,
        promptCost: m.pricing.prompt,
        completionCost: m.pricing.completion,
      }))
      .sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name))

    return NextResponse.json(models)
  } catch (err: unknown) {
    console.error('[ai/openrouter/models] provider error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: sanitizeProviderError(err) }, { status: 500 })
  }
}
