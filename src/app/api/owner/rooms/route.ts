// src/app/api/owner/rooms/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import PG from '@/models/PG'
import mongoose from 'mongoose'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'owner' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()

  const url = new URL(req.url)
  const propertyId = url.searchParams.get('propertyId')
  if (!propertyId)
    return NextResponse.json({ message: 'Missing propertyId' }, { status: 400 })

  const pg = await PG.findOne({ _id: propertyId, owner: me._id }).select(
    'rooms name'
  )
  if (!pg)
    return NextResponse.json({ message: 'Property not found' }, { status: 404 })

  return NextResponse.json({ rooms: pg.rooms ?? [] })
}

export async function POST(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'owner' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()

  const { propertyId, room } = await req.json()
  if (!propertyId || !room)
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 })

  const id = new mongoose.Types.ObjectId()
  const pg = await PG.findOneAndUpdate(
    { _id: propertyId, owner: me._id },
    { $push: { rooms: { _id: id, ...room } } },
    { new: true }
  )
  if (!pg)
    return NextResponse.json({ message: 'Property not found' }, { status: 404 })
  return NextResponse.json({ rooms: pg.rooms })
}

export async function PATCH(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'owner' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()

  const { propertyId, roomId, data } = await req.json()
  if (!propertyId || !roomId)
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 })

  const pg = await PG.findOneAndUpdate(
    { _id: propertyId, owner: me._id, 'rooms._id': roomId },
    {
      $set: Object.fromEntries(
        Object.entries(data || {}).map(([k, v]) => [`rooms.$.${k}`, v])
      ),
    },
    { new: true }
  )
  if (!pg)
    return NextResponse.json({ message: 'Room not found' }, { status: 404 })
  return NextResponse.json({ rooms: pg.rooms })
}

export async function DELETE(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'owner' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()

  const { propertyId, roomId } = await req.json()
  if (!propertyId || !roomId)
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 })

  const pg = await PG.findOneAndUpdate(
    { _id: propertyId, owner: me._id },
    { $pull: { rooms: { _id: roomId } } },
    { new: true }
  )
  if (!pg)
    return NextResponse.json({ message: 'Property not found' }, { status: 404 })
  return NextResponse.json({ rooms: pg.rooms })
}
