import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  return NextResponse.json({ items: [] })
}

export async function POST(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  const { channel, to, template, data } = await req.json()
  // TODO: send via email/SMS/push
  return NextResponse.json(
    { ok: true, queued: { channel, to, template, data } },
    { status: 202 }
  )
}
