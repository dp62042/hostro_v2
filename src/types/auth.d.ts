// types/auth.d.ts

import type { Role } from '@/utils/constants'

// Shape of the user object returned by API
export interface AuthUser {
  _id: string
  name: string
  email: string
  role: Role
  phone?: string
  avatarUrl?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

// Shape of login/register payload
export interface AuthCredentials {
  email: string
  password: string
}

// Shape of JWT payload
export interface JwtPayload {
  sub: string // user id
  role: Role
  iat?: number
  exp?: number
}

// Auth context type (if using React Context for auth state)
export interface AuthContextType {
  user: AuthUser | null
  token: string | null
  loading: boolean
  login: (credentials: AuthCredentials) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}
