// src/app/api/owner/payouts/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import PG from '@/models/PG'
import Payment from '@/models/Payment'

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

  const pgIds = (await PG.find({ owner: me._id }).select('_id')).map(
    (p) => p._id
  )

  const items = await Payment.find({
    pg: { $in: pgIds },
    status: { $in: ['paid', 'settled'] },
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('_id amount status method pg user createdAt')
    .populate('pg', '_id name')
    .populate('user', '_id name email')

  const totals = await Payment.aggregate([
    { $match: { pg: { $in: pgIds }, status: 'paid' } },
    { $group: { _id: null, sum: { $sum: '$amount' } } },
  ]).then((a) => a[0]?.sum || 0)

  return NextResponse.json({ items, totals })
}
