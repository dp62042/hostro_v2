/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import Vendor from '@/models/Vendor'

export async function GET(req: Request) {
  const me = await getCurrentUser()
  if (!me || me.role !== 'superadmin')
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') || undefined
  const q = searchParams.get('q') || ''
  const filter: any = {}
  if (status) filter.status = status
  if (q)
    filter.$or = [
      { name: new RegExp(q, 'i') },
      { 'contact.person': new RegExp(q, 'i') },
    ]
  const data = await Vendor.find(filter).sort({ createdAt: -1 })
  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  const me = await getCurrentUser()
  if (!me || me.role !== 'superadmin')
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  await dbConnect()
  const body = await req.json()
  const doc = await Vendor.create(body)
  return NextResponse.json({ ok: true, vendor: doc })
}
