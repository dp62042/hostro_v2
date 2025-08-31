import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import Vendor from '@/models/Vendor'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const me = await getCurrentUser()
  if (!me || me.role !== 'superadmin')
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  await dbConnect()
  const body = await req.json()
  const doc = await Vendor.findByIdAndUpdate(params.id, body, { new: true })
  if (!doc) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true, vendor: doc })
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const me = await getCurrentUser()
  if (!me || me.role !== 'superadmin')
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  await dbConnect()
  await Vendor.findByIdAndDelete(params.id)
  return NextResponse.json({ ok: true })
}
