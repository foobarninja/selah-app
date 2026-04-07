import { NextResponse } from 'next/server'
import { getAIModels } from '@/lib/settings/queries'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ providerId: string }> },
) {
  const { providerId } = await params
  const models = await getAIModels(providerId)
  return NextResponse.json(models)
}
