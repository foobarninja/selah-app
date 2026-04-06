import { NextResponse } from 'next/server'
import { getProvider } from '@/lib/ai/provider-factory'

export async function GET() {
  const provider = await getProvider()
  if (!provider) {
    return NextResponse.json({ ok: false, error: 'No AI provider configured' })
  }

  const result = await provider.testConnection()
  return NextResponse.json(result)
}
