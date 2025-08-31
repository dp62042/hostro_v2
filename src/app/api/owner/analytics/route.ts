// src/app/api/owner/analytics/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import PG from '@/models/PG'
import Booking from '@/models/Booking'
import Payment from '@/models/Payment'
import Complaint from '@/models/Complaint'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'owner' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  await dbConnect()

  // Find this owner's PG ids
  const pgs = await PG.find({ owner: me._id }).select('_id')
  const pgIds = pgs.map((p) => p._id)

  const [properties, bookings, openComplaints, revenue] = await Promise.all([
    PG.countDocuments({ owner: me._id }),
    Booking.countDocuments({ pg: { $in: pgIds } }),
    Complaint.countDocuments({ pg: { $in: pgIds }, status: 'open' }),
    Payment.aggregate([
      { $match: { pg: { $in: pgIds }, status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]).then((a) => a[0]?.total || 0),
  ])

  return NextResponse.json({
    properties,
    bookings,
    openComplaints,
    revenue,
    updatedAt: new Date().toISOString(),
  })
}
