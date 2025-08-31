// src/utils/constants.ts
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'
export const TOKEN_KEY = 'hostro:token'
export const USER_KEY = 'hostro:user'

// Optional: routes for role-based redirect
export const ROLE_ROUTES: Record<string, string> = {
  superadmin: '/superadmin',
  admin: '/admin',
  owner: '/owner',
  student: '/student',
}

// ImageKit (browser upload)
export const IMAGEKIT = {
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
  // Your backend auth endpoint that returns { signature, expire, token }
  authenticationEndpoint:
    process.env.NEXT_PUBLIC_IMAGEKIT_AUTH_ENDPOINT || '/api/imagekit-auth',
}
