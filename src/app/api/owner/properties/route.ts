// src/app/api/owner/properties/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import PG from '@/models/PG'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'owner' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const items = await PG.find({ owner: me._id })
    .sort({ createdAt: -1 })
    .select('_id name status address createdAt')
  return NextResponse.json({ items })
}

export async function POST(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'owner' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const body = await req.json()
  const pg = await PG.create({
    owner: me._id,
    name: body.name,
    status: body.status ?? 'pending',
    address: body.address ?? {},
  })
  return NextResponse.json({ pg }, { status: 201 })
}

export async function PATCH(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'owner' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const { id, data } = await req.json()
  if (!id) return NextResponse.json({ message: 'Missing id' }, { status: 400 })
  const pg = await PG.findOneAndUpdate(
    { _id: id, owner: me._id },
    { $set: data },
    { new: true }
  )
  return NextResponse.json({ pg })
}
