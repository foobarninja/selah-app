import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const apiKey = request.nextUrl.searchParams.get('key')
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
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
