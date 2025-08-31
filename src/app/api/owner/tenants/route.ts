// src/app/api/owner/tenants/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import PG from '@/models/PG'
import Booking from '@/models/Booking'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'owner' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()

  const pgIds = (await PG.find({ owner: me._id }).select('_id')).map(
    (p) => p._id
  )

  const items = await Booking.find({
    pg: { $in: pgIds },
    status: { $in: ['active', 'confirmed'] }, // adjust to your statuses
  })
    .select('_id user pg startDate endDate status createdAt')
    .populate('user', '_id name email phone')
    .populate('pg', '_id name')

  return NextResponse.json({ items })
}
