// src/lib/jwt.ts
import jwt from 'jsonwebtoken'

function getSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    // Don’t crash app at import time; fail when called with a clear message
    throw new Error('JWT_SECRET is not set. Add it to .env.local and restart.')
  }
  return secret
}

export type JWTPayload = { uid: string; role: string; email?: string }

export function signJwt(payload: JWTPayload, expiresIn = '7d') {
  return jwt.sign(payload, getSecret(), { expiresIn })
}

export function verifyJwt<T = JWTPayload>(token: string): T | null {
  try {
    return jwt.verify(token, getSecret()) as T
  } catch {
    return null
  }
}
