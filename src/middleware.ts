import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const protectedRoots = ['/superadmin', '/admin', '/owner', '/student']
  const needsAuth = protectedRoots.some((p) => pathname.startsWith(p))
  if (!needsAuth) return NextResponse.next()

  const token = req.cookies.get('hostro_token')?.value
  if (!token) return NextResponse.redirect(new URL('/auth/login', req.url))

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const role = payload.role as string

    if (pathname.startsWith('/superadmin') && role !== 'superadmin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
    if (
      pathname.startsWith('/admin') &&
      !['admin', 'superadmin'].includes(role)
    ) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    if (
      pathname.startsWith('/owner') &&
      !['owner', 'admin', 'superadmin'].includes(role)
    ) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    if (
      pathname.startsWith('/student') &&
      !['student', 'owner', 'admin', 'superadmin'].includes(role)
    ) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }
}

export const config = {
  matcher: [
    '/superadmin/:path*',
    '/admin/:path*',
    '/owner/:path*',
    '/student/:path*',
  ],
}
