'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SuperadminRegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    setupCode: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onChange =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (form.password !== form.confirm || form.password.length < 6) {
      setError('Passwords do not match or are too short (min 6).')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/superadmin-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          setupCode: form.setupCode.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.message || 'Registration failed')
      router.replace('/dashboards/admin')
    } catch (e: any) {
      setError(e?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-emerald-600">
          Create Superadmin
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          Allowed only for the first setup, requires a setup code.
        </p>

        {error && (
          <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            className="w-full rounded-xl border px-3 py-2.5"
            placeholder="Full name"
            value={form.name}
            onChange={onChange('name')}
            required
          />
          <input
            className="w-full rounded-xl border px-3 py-2.5"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={onChange('email')}
            required
          />
          <input
            className="w-full rounded-xl border px-3 py-2.5"
            placeholder="Setup code"
            value={form.setupCode}
            onChange={onChange('setupCode')}
            required
          />
          <input
            className="w-full rounded-xl border px-3 py-2.5"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={onChange('password')}
            minLength={6}
            required
          />
          <input
            className="w-full rounded-xl border px-3 py-2.5"
            placeholder="Confirm password"
            type="password"
            value={form.confirm}
            onChange={onChange('confirm')}
            minLength={6}
            required
          />
          <button
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-2.5 text-white hover:bg-emerald-700"
          >
            {loading ? 'Creating…' : 'Create Superadmin'}
          </button>
        </form>
      </div>
    </div>
  )
}
