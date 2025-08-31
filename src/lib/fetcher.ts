// src/lib/fetcher.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, '') || ''

/** Read token once per call (or replace with cookies only) */
function getToken() {
  try {
    return localStorage.getItem('hostro:token') || ''
  } catch {
    return ''
  }
}

export type ApiJson = Record<string, any>
export type ApiInit = RequestInit & { json?: ApiJson; auth?: boolean }
export type ApiExtra = { throwOnError?: boolean }

export async function api<T = any>(
  pathOrUrl: string,
  init: ApiInit = {},
  extra: ApiExtra = {}
): Promise<T> {
  const url = pathOrUrl.startsWith('http')
    ? pathOrUrl
    : `${API_BASE}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`

  const headers = new Headers(init.headers || {})
  headers.set('Accept', 'application/json')
  if (init.json && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  // Optional auth: add Bearer token if auth=true (default true)
  const shouldAuth = init.auth !== false
  if (shouldAuth && !headers.has('Authorization')) {
    const token = getToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(url, {
    ...init,
    headers,
    credentials: 'include', // keep if you also use httpOnly cookies
    cache: 'no-store',
    body: init.json ? JSON.stringify(init.json) : init.body,
  })

  const text = await res.text()
  let data: any = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    // non-JSON
  }

  if (!res.ok && extra.throwOnError !== false) {
    const message =
      data?.message || data?.error || `Request failed (${res.status})`
    throw new Error(message)
  }

  return (data as T) ?? ({} as T)
}

/** Optional convenience helpers */
export const apiGet = <T = any>(p: string, i: ApiInit = {}, e?: ApiExtra) =>
  api<T>(p, { ...i, method: 'GET' }, e)
export const apiPost = <T = any>(
  p: string,
  json?: ApiJson,
  i: ApiInit = {},
  e?: ApiExtra
) => api<T>(p, { ...i, method: 'POST', json }, e)
export const apiPatch = <T = any>(
  p: string,
  json?: ApiJson,
  i: ApiInit = {},
  e?: ApiExtra
) => api<T>(p, { ...i, method: 'PATCH', json }, e)
export const apiDelete = <T = any>(p: string, i: ApiInit = {}, e?: ApiExtra) =>
  api<T>(p, { ...i, method: 'DELETE' }, e)

/** Back-compat alias if you previously imported apiFetch */
export const apiFetch = api
