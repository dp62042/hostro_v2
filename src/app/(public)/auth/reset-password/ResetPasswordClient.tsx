/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaEnvelope, FaLock } from 'react-icons/fa'

export default function ResetPasswordClient() {
  const router = useRouter()
  const qp = useSearchParams()
  const token = qp.get('token') // if link has ?token=...
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const requestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMsg(null)
    setLoading(true)
    try {
      const res = await fetch(`/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.message || 'Could not send reset link')
      setMsg('Reset link sent. Check your email.')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const doReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMsg(null)
    if (password !== confirm) return setError('Passwords do not match')
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE ?? ''}/api/auth/reset-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, password }),
        }
      )
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.message || 'Reset failed')
      setMsg('Password updated. You can sign in now.')
      setTimeout(() => router.replace('/auth/login'), 1000)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    // STEP 1: Request reset link
    return (
      <div>
        <h1 className="text-2xl font-semibold">Forgot password</h1>
        <p className="mt-1 text-gray-600 text-sm">
          We’ll email you a reset link.
        </p>

        <form onSubmit={requestReset} className="mt-6 space-y-4">
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

          {error && <div className="text-sm text-red-600">{error}</div>}
          {msg && <div className="text-sm text-emerald-700">{msg}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 text-white py-2.5 font-medium hover:bg-emerald-700 transition disabled:opacity-60"
          >
            {loading ? 'Sending…' : 'Send reset link'}
          </button>

          <div className="text-sm text-gray-600">
            Remembered it?{' '}
            <Link
              href="/auth/login"
              className="text-emerald-700 hover:underline"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    )
  }

  // STEP 2: Set new password
  return (
    <div>
      <h1 className="text-2xl font-semibold">Set new password</h1>
      <p className="mt-1 text-gray-600 text-sm">
        Enter your new password below.
      </p>

      <form onSubmit={doReset} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium">New password</label>
          <div className="mt-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaLock />
            </span>
            <input
              type="password"
              minLength={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Confirm password</label>
          <div className="mt-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaLock />
            </span>
            <input
              type="password"
              minLength={6}
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}
        {msg && <div className="text-sm text-emerald-700">{msg}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-600 text-white py-2.5 font-medium hover:bg-emerald-700 transition disabled:opacity-60"
        >
          {loading ? 'Updating…' : 'Update password'}
        </button>

        <div className="text-sm text-gray-600">
          Back to{' '}
          <Link href="/auth/login" className="text-emerald-700 hover:underline">
            login
          </Link>
        </div>
      </form>
    </div>
  )
}
