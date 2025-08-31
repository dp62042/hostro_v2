/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa'

export default function LoginClient() {
  const router = useRouter()
  const qp = useSearchParams()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  useEffect(() => {
    const qEmail = qp.get('email')
    const qMsg = qp.get('msg')
    if (qEmail) setEmail(qEmail)
    if (qMsg) setInfo(qMsg)
  }, [qp])

  const roleDest: Record<string, string> = {
    superadmin: '/dashboards/superadmin',
    admin: '/dashboards/admin',
    owner: '/dashboards/owner',
    student: '/dashboards/student',
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.message || 'Invalid credentials')

      if (data?.token) localStorage.setItem('hostro_token', data.token)

      const next = qp.get('next')
      if (next) {
        router.replace(next)
        return
      }

      const role = (data?.user?.role as string) || 'student'
      router.replace(roleDest[role] ?? '/dashboards/student')
    } catch (err: any) {
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="text-gray-800">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="mt-1 text-gray-600 text-sm">Welcome back!</p>

      {info && (
        <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {info}
        </div>
      )}
      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <div className="mt-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaEnvelope />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <div className="mt-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaLock />
            </span>
            <input
              type={showPw ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border pl-10 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              aria-label="Toggle password visibility"
            >
              {showPw ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-600 text-white py-2.5 font-medium hover:bg-emerald-700 transition disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <div className="flex items-center justify-between text-sm">
          <Link
            href="/auth/reset-password"
            className="text-emerald-700 hover:underline"
          >
            Forgot password?
          </Link>
          <span className="text-gray-600">
            New here?{' '}
            <Link
              href="/auth/register"
              className="text-emerald-700 hover:underline"
            >
              Create account
            </Link>
          </span>
        </div>
      </form>
    </div>
  )
}
