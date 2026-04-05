import { NextRequest, NextResponse } from 'next/server'
import { getThemesByCategory } from '@/lib/themes/queries'

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('q') ?? undefined
  const categories = await getThemesByCategory(search)
  return NextResponse.json(categories)
}
