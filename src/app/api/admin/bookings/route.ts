import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import Booking from '@/models/Booking'

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

  const items = await Booking.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('_id user pg startDate endDate status amount createdAt')

  return NextResponse.json({ items })
}
