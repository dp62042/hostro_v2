/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
// import KYC from '@/models/KYC'  // when you add it
// import { dbConnect } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  // await dbConnect()
  // const items = await KYC.find({ status: 'pending' })
  const items: any[] = []
  return NextResponse.json({ items })
}

export async function PATCH(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  const { id, action } = await req.json()
  if (!id || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })
  }
  // await dbConnect()
  // const status = action === 'approve' ? 'approved' : 'rejected'
  // const doc = await KYC.findByIdAndUpdate(id, { $set: { status } }, { new: true })
  // return NextResponse.json({ kyc: doc })
  return NextResponse.json({ ok: true }) // stub
}
