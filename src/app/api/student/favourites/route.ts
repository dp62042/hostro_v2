/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/student/favourites/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import User from '@/models/User'
import PG from '@/models/PG'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'student' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const user = await User.findById(me._id).select('favorites').lean()
  const favIds = (user as any)?.favorites ?? []
  const items = await PG.find({ _id: { $in: favIds } }).select(
    '_id name address status'
  )
  return NextResponse.json({ items })
}

export async function POST(req: Request) {
  const me = await getCurrentUser()
  if (!me || me.role !== 'student') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const { pgId } = await req.json()
  if (!pgId)
    return NextResponse.json({ message: 'Missing pgId' }, { status: 400 })

  await User.updateOne({ _id: me._id }, { $addToSet: { favorites: pgId } })
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  const me = await getCurrentUser()
  if (!me || me.role !== 'student') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const { pgId } = await req.json()
  if (!pgId)
    return NextResponse.json({ message: 'Missing pgId' }, { status: 400 })
  await User.updateOne({ _id: me._id }, { $pull: { favorites: pgId } })
  return NextResponse.json({ ok: true })
}
