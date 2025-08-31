// src/app/api/student/moveout/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import Booking from '@/models/Booking'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const me = await getCurrentUser()
  if (!me || me.role !== 'student') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const { bookingId, reason } = await req.json()
  if (!bookingId)
    return NextResponse.json({ message: 'Missing bookingId' }, { status: 400 })

  const doc = await Booking.findOneAndUpdate(
    { _id: bookingId, user: me._id },
    { $set: { status: 'moveout_requested', moveoutReason: reason ?? '' } },
    { new: true }
  )
  if (!doc)
    return NextResponse.json({ message: 'Booking not found' }, { status: 404 })
  return NextResponse.json({ booking: doc })
}
