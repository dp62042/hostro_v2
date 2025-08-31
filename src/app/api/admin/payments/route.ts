/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import Payment from '@/models/Payment'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()

  const url = new URL(req.url)
  const limit = Math.min(
    parseInt(url.searchParams.get('limit') || '50', 10),
    200
  )
  const status = url.searchParams.get('status') || undefined

  const q: any = {}
  if (status) q.status = status

  const items = await Payment.find(q)
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('_id amount status user pg method createdAt')

  return NextResponse.json({ items })
}
