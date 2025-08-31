/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/owner/bookings/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import PG from '@/models/PG'
import Booking from '@/models/Booking'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'owner' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()

  const url = new URL(req.url)
  const limit = Math.min(
    parseInt(url.searchParams.get('limit') || '50', 10),
    200
  )
  const status = url.searchParams.get('status') || undefined

  const pgIds = (await PG.find({ owner: me._id }).select('_id')).map(
    (p) => p._id
  )
  const q: any = { pg: { $in: pgIds } }
  if (status) q.status = status

  const items = await Booking.find(q)
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('_id user pg startDate endDate status amount createdAt')
    .populate('user', '_id name email')

  return NextResponse.json({ items })
}
