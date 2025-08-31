import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import User from '@/models/User'
import { signJwt } from '@/lib/jwt'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { name, email, password, setupCode } = await req.json()

    if (!name || !email || !password || !setupCode) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
    }
    if (setupCode !== process.env.SUPERADMIN_SETUP_CODE) {
      return NextResponse.json(
        { message: 'Invalid setup code' },
        { status: 403 }
      )
    }

    await dbConnect()

    // allow only if there is NO existing superadmin
    const superAdmins = await User.countDocuments({ role: 'superadmin' })
    if (superAdmins > 0) {
      return NextResponse.json(
        { message: 'Superadmin already exists' },
        { status: 403 }
      )
    }

    const exists = await User.findOne({ email: email.toLowerCase().trim() })
    if (exists)
      return NextResponse.json(
        { message: 'Email already used' },
        { status: 409 }
      )

    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password, // hashed by model pre('save')
      role: 'superadmin',
      isActive: true,
    })

    // auto-login
    const token = signJwt({
      uid: String(user._id),
      role: user.role,
      email: user.email,
    })
    const res = NextResponse.json(
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    )
    res.cookies.set('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })
    return res
  } catch (e: any) {
    console.error('superadmin-register error:', e?.message || e)
    return NextResponse.json({ message: 'Internal error' }, { status: 500 })
  }
}
