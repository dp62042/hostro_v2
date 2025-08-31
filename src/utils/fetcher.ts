// src/utils/fetcher.ts
'use client'
import { BASE_URL, TOKEN_KEY } from './constants'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

function isBrowser() {
  return typeof window !== 'undefined'
}

export function getToken(): string | null {
  if (!isBrowser()) return null
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token: string) {
  if (!isBrowser()) return
  localStorage.setItem(TOKEN_KEY, token)
  // Set a simple cookie for SSR-friendly reads (non-HTTPOnly)
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}`
}

export function clearToken() {
  if (!isBrowser()) return
  localStorage.removeItem(TOKEN_KEY)
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`
}

export async function apiFetch<T = any>(
  path: string,
  opts: RequestInit = {}
): Promise<T> {
  const token = getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(opts.headers || {}),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, {
    ...opts,
    headers,
    cache: 'no-store',
  })

  if (!res.ok) {
    let msg = `Request failed (${res.status})`
    try {
      const data = await res.json()
      msg = data?.message || msg
    } catch {}
    throw new Error(msg)
  }

  // Some endpoints may return empty responses
  const text = await res.text()
  try {
    return text ? (JSON.parse(text) as T) : ({} as T)
  } catch {
    return text as unknown as T
  }
}
