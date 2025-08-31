// src/lib/auth.ts
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { dbConnect } from '@/lib/db'
import User, { type IUser, type Role } from '@/models/User'

/** ---- Config ---- */
const TOKEN_NAME = 'hostro_token'
const JWT_SECRET = process.env.JWT_SECRET as string
if (!JWT_SECRET) throw new Error('JWT_SECRET is not set')
const DEFAULT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

/** ---- Types ---- */
type JWTPayload = { uid: string; role: Role }

/** ---- JWT helpers ---- */
export function signToken(
  payload: JWTPayload,
  expiresIn: string = DEFAULT_EXPIRES_IN
): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export function verifyToken(token?: string | null): JWTPayload | null {
  if (!token) return null
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

/** ---- Cookie helpers ---- */
export async function setAuthCookie(token: string) {
  const store = await cookies()
  store.set({
    name: TOKEN_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function clearAuthCookie() {
  const store = await cookies()
  store.set({
    name: TOKEN_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}

/** Get the raw JWT from request (Route Handler) or from server cookies */
export async function getTokenFromRequest(
  req?: NextRequest
): Promise<string | null> {
  if (req) return req.cookies.get(TOKEN_NAME)?.value ?? null
  const store = await cookies()
  return store.get(TOKEN_NAME)?.value ?? null
}

/** ---- Current user helper (server) ---- */
export async function getCurrentUser(req?: NextRequest): Promise<IUser | null> {
  const token = await getTokenFromRequest(req)
  const payload = verifyToken(token)
  if (!payload?.uid) return null

  await dbConnect()
  const user = await User.findById(payload.uid).select('+password')
  return user ?? null
}

/** Optional: simple role guard for server handlers */
export function assertRole(payload: JWTPayload | null, ...allowed: Role[]) {
  if (!payload || !allowed.includes(payload.role)) {
    const err = new Error('Forbidden')
    // @ts-ignore
    err.status = 403
    throw err
  }
}

export async function GET() {
  const me = await getCurrentUser() // ← await
  if (!me || me.role !== 'superadmin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  // ...
}
