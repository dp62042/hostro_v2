import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import User from '@/models/User'
import PG from '@/models/PG'
import Booking from '@/models/Booking'
import Payment from '@/models/Payment'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || !['admin', 'superadmin'].includes(me.role))
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  await dbConnect()

  const [
    users,
    owners,
    students,
    pgsActive,
    pgsPending,
    bookings,
    paymentsCaptured,
  ] = await Promise.all([
    User.countDocuments({}),
    User.countDocuments({ role: 'owner' }),
    User.countDocuments({ role: 'student' }),
    PG.countDocuments({ status: 'approved', isActive: true }),
    PG.countDocuments({ status: 'pending' }),
    Booking.countDocuments({}),
    Payment.aggregate([
      { $match: { status: 'captured' } },
      { $group: { _id: null, sum: { $sum: '$amount' } } },
    ]),
  ])

  const revenue = paymentsCaptured?.[0]?.sum || 0

  return NextResponse.json({
    users,
    owners,
    students,
    pgsActive,
    pgsPending,
    bookings,
    revenue,
  })
}
