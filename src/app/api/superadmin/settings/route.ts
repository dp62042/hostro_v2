/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import Setting from '@/models/Setting'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PLATFORM_KEY = 'platform'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || me.role !== 'superadmin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  await dbConnect()

  // Find existing, otherwise seed with defaults
  let doc = await Setting.findOne({ key: PLATFORM_KEY })
  if (!doc) {
    doc = await Setting.create({
      key: PLATFORM_KEY,
      value: {
        defaultCommissionPct: 10,
        paymentGateway: { provider: 'razorpay', keyId: '', keySecret: '' },
      },
    })
  }

  return NextResponse.json({ settings: doc.value })
}

export async function PATCH(req: Request) {
  const me = await getCurrentUser()
  if (!me || me.role !== 'superadmin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  await dbConnect()
  const body = await req.json()

  // Build a safe update object (whitelist)
  const set: any = {}
  if (typeof body.defaultCommissionPct === 'number') {
    set['value.defaultCommissionPct'] = body.defaultCommissionPct
  }
  if (body.paymentGateway) {
    if (['razorpay', 'stripe', 'none'].includes(body.paymentGateway.provider)) {
      set['value.paymentGateway.provider'] = body.paymentGateway.provider
    }
    if (typeof body.paymentGateway.keyId === 'string') {
      set['value.paymentGateway.keyId'] = body.paymentGateway.keyId
    }
    if (typeof body.paymentGateway.keySecret === 'string') {
      set['value.paymentGateway.keySecret'] = body.paymentGateway.keySecret
    }
  }

  const doc = await Setting.findOneAndUpdate(
    { key: PLATFORM_KEY },
    {
      $set: set,
      $setOnInsert: {
        key: PLATFORM_KEY,
        value: {
          defaultCommissionPct: 10,
          paymentGateway: { provider: 'razorpay', keyId: '', keySecret: '' },
        },
      },
    },
    { new: true, upsert: true }
  )

  return NextResponse.json({ ok: true, settings: doc.value })
}
