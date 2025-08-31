/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/owner/complaints/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import PG from '@/models/PG'
import Complaint from '@/models/Complaint'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'owner' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()

  const url = new URL(req.url)
  const status = url.searchParams.get('status') || undefined

  const pgIds = (await PG.find({ owner: me._id }).select('_id')).map(
    (p) => p._id
  )
  const q: any = { pg: { $in: pgIds } }
  if (status) q.status = status

  const items = await Complaint.find(q)
    .sort({ createdAt: -1 })
    .limit(100)
    .select('_id user pg category priority status subject createdAt')
    .populate('user', '_id name email')

  return NextResponse.json({ items })
}

export async function PATCH(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'owner' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const { id, status, note } = await req.json()
  if (!id || !status)
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })

  const allowed = ['open', 'in_progress', 'resolved', 'closed', 'escalated']
  if (!allowed.includes(status)) {
    return NextResponse.json({ message: 'Invalid status' }, { status: 400 })
  }

  const doc = await Complaint.findOneAndUpdate(
    { _id: id },
    { $set: { status, ownerNote: note ?? undefined } },
    { new: true }
  )
  return NextResponse.json({ complaint: doc })
}
