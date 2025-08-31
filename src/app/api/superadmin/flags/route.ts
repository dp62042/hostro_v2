/* eslint-disable prefer-const */
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

let FLAGS: Record<string, boolean> = {
  enableNewSearch: false,
  showOwnerInsights: false,
}

export async function GET() {
  const me = await getCurrentUser()
  if (!me || me.role !== 'superadmin')
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  return NextResponse.json({ flags: FLAGS })
}

export async function PATCH(req: Request) {
  const me = await getCurrentUser()
  if (!me || me.role !== 'superadmin')
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  const body = await req.json()
  if (typeof body === 'object' && body) {
    for (const [k, v] of Object.entries(body)) {
      if (typeof v === 'boolean') FLAGS[k] = v
    }
  }
  return NextResponse.json({ flags: FLAGS })
}
