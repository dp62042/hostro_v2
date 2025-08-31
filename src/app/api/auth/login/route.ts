import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import User from '@/models/User'
import { setAuthCookie, signToken } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing credentials' },
        { status: 400 }
      )
    }

    await dbConnect()

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }
    if (!user.isActive) {
      return NextResponse.json({ message: 'Account disabled' }, { status: 403 })
    }

    const token = signToken({ uid: String(user._id), role: user.role })
    const res = NextResponse.json(
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    )
    await setAuthCookie(token) // sets 'hostro_token'
    return res
  } catch (e: any) {
    console.error('Login error:', e?.message || e)
    return NextResponse.json({ message: 'Internal error' }, { status: 500 })
  }
}
