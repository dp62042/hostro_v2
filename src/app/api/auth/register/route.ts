import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import User from '@/models/User'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { name, email, password, role, phone, address } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
    }

    // Only allow student/owner from public register
    const publicRole = role === 'owner' ? 'owner' : 'student'

    await dbConnect()
    const exists = await User.findOne({ email: email.toLowerCase().trim() })
    if (exists)
      return NextResponse.json(
        { message: 'Email already used' },
        { status: 409 }
      )

    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password, // hashed via pre('save')
      role: publicRole,
      phone,
      address,
    })
    return NextResponse.json({ user: user.toJSON() }, { status: 201 })
  } catch (e: any) {
    if (e?.code === 11000) {
      return NextResponse.json(
        { message: 'Email already used' },
        { status: 409 }
      )
    }
    console.error('Register error:', e)
    return NextResponse.json({ message: 'Internal error' }, { status: 500 })
  }
}
