import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { dbConnect } from '@/lib/db'
import User from '@/models/User'
import { signToken, verifyToken, setAuthCookie } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { name, email, password, inviteCode } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
    }

    await dbConnect()

    const tok = (await cookies()).get('hostro_token')?.value
    const payload = verifyToken(tok)
    const isSuperAdmin = payload?.role === 'superadmin'
    const inviteMatches =
      !!inviteCode && inviteCode === process.env.ADMIN_INVITE_CODE

    if (!isSuperAdmin && !inviteMatches) {
      return NextResponse.json(
        { message: 'Not authorized to create admin' },
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
      password, // hashed via pre('save')
      role: 'admin',
      isActive: true,
    })

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
      { status: 201 }
    )
    setAuthCookie(token)
    return res
  } catch (e: any) {
    console.error('admin-register error:', e?.message || e)
    return NextResponse.json({ message: 'Internal error' }, { status: 500 })
  }
}
