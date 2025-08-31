/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaMapMarkerAlt,
} from 'react-icons/fa'

const ROLES = ['student', 'owner'] as const
type Role = (typeof ROLES)[number]

type FormState = {
  name: string
  email: string
  phone: string
  password: string
  confirm: string
  role: Role
  address: {
    line1: string
    line2: string
    city: string
    state: string
    pincode: string
  }
}

const isEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim().toLowerCase())

const isPhone = (v: string) => v === '' || /^[6-9][0-9]{9}$/.test(v.trim())
const isPin = (v: string) => v === '' || /^[1-9][0-9]{5}$/.test(v.trim())

export default function RegisterClient() {
  const router = useRouter()
  const search = useSearchParams()
  const next = search.get('next') || ''
  const defaultRole =
    (search.get('role') as Role) === 'owner' ? 'owner' : 'student'

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
    role: defaultRole,
    address: { line1: '', line2: '', city: '', state: '', pincode: '' },
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPwd, setShowPwd] = useState(false)

  const onChange =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }))

  const onAddrChange =
    (k: keyof FormState['address']) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, address: { ...f.address, [k]: e.target.value } }))

  const roleDestination: Record<Role, string> = {
    student: '/dashboards/student',
    owner: '/dashboards/owner',
  }

  const hasAddress = useMemo(
    () => Object.values(form.address).some((v) => (v ?? '').trim().length > 0),
    [form.address]
  )

  const passwordsMatch =
    form.password.length >= 6 && form.password === form.confirm
  const emailOK = isEmail(form.email)
  const phoneOK = isPhone(form.phone)
  const pinOK = isPin(form.address.pincode)

  const formValid =
    form.name.trim().length > 0 && emailOK && phoneOK && pinOK && passwordsMatch

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setError(null)

    if (!formValid) {
      if (!emailOK) return setError('Enter a valid email address.')
      if (!phoneOK)
        return setError('Enter a valid 10-digit Indian mobile number.')
      if (!pinOK) return setError('Enter a valid 6-digit Indian pincode.')
      if (!passwordsMatch)
        return setError('Passwords do not match or are too short (min 6).')
    }

    setLoading(true)
    try {
      const payload: any = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      }
      if (form.phone.trim()) payload.phone = form.phone.trim()
      if (hasAddress) {
        const { line1, line2, city, state, pincode } = form.address
        const clean = (v: string) => v.trim()
        payload.address = Object.fromEntries(
          Object.entries({ line1, line2, city, state, pincode })
            .filter(([, v]) => (v ?? '').trim() !== '')
            .map(([k, v]) => [k, clean(v as string)])
        )
      }

      // 1) Register
      const regRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const regData = await regRes.json().catch(() => ({}))
      if (!regRes.ok) {
        throw new Error(regData?.message || 'Registration failed')
      }

      // 2) Owners must sign in; Students auto-login
      if (payload.role === 'owner') {
        const qs = new URLSearchParams({
          role: 'owner',
          next: next || roleDestination.owner,
          msg: 'Account created. Please sign in.',
        })
        router.replace(`/auth/login?${qs}`)
        return
      }

      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ensure auth cookie set
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      })
      const loginData = await loginRes.json().catch(() => ({}))
      if (!loginRes.ok) {
        throw new Error(loginData?.message || 'Login failed')
      }

      // 3) Post-login redirect
      if (next) {
        router.replace(next)
      } else {
        const role = (loginData?.user?.role ?? form.role) as Role
        router.replace(roleDestination[role] ?? '/')
      }
    } catch (err: any) {
      setError(
        typeof err?.message === 'string'
          ? err.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="text-gray-800">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <p className="mt-1 text-gray-600 text-sm">
        Join Hostro to book PGs, pay rent, and more.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {/* Name */}
        <div>
          <label className="text-sm font-medium">Full name</label>
          <div className="mt-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaUser />
            </span>
            <input
              required
              value={form.name}
              onChange={onChange('name')}
              placeholder="Your name"
              className="w-full rounded-xl border pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <div className="mt-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaEnvelope />
            </span>
            <input
              type="email"
              required
              value={form.email}
              onChange={onChange('email')}
              placeholder="you@example.com"
              className={`w-full rounded-xl border pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200 ${
                form.email && !emailOK ? 'border-red-400' : ''
              }`}
            />
          </div>
        </div>

        {/* Phone (optional) */}
        <div>
          <label className="text-sm font-medium">Phone</label>
          <div className="mt-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaPhone />
            </span>
            <input
              type="tel"
              pattern="[6-9][0-9]{9}"
              title="Enter a valid 10-digit Indian mobile number"
              value={form.phone}
              onChange={onChange('phone')}
              placeholder="9876543210"
              className={`w-full rounded-xl border pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200 ${
                form.phone && !phoneOK ? 'border-red-400' : ''
              }`}
            />
          </div>
        </div>

        {/* Password + Confirm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="mt-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaLock />
              </span>
              <input
                type={showPwd ? 'text' : 'password'}
                minLength={6}
                required
                value={form.password}
                onChange={onChange('password')}
                placeholder="••••••••"
                className="w-full rounded-xl border pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Confirm password</label>
            <input
              type={showPwd ? 'text' : 'password'}
              minLength={6}
              required
              value={form.confirm}
              onChange={onChange('confirm')}
              placeholder="••••••••"
              className={`mt-1 w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200 ${
                form.confirm && !passwordsMatch ? 'border-red-400' : ''
              }`}
            />
            <div className="mt-1 text-xs text-gray-500">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  onChange={(e) => setShowPwd(e.target.checked)}
                  className="accent-emerald-600"
                />
                Show password
              </label>
            </div>
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="text-sm font-medium">Role</label>
          <select
            value={form.role}
            onChange={onChange('role')}
            className="mt-1 w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200 bg-white"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r[0].toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Admin / Superadmin are created by the company.
          </p>
        </div>

        {/* Address (optional) */}
        <div>
          <label className="text-sm font-medium">Address (optional)</label>
          <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="col-span-1 sm:col-span-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaMapMarkerAlt />
              </span>
              <input
                value={form.address.line1}
                onChange={onAddrChange('line1')}
                placeholder="Address line 1"
                className="w-full rounded-xl border pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>
            <input
              value={form.address.line2}
              onChange={onAddrChange('line2')}
              placeholder="Address line 2 (optional)"
              className="w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <input
              value={form.address.city}
              onChange={onAddrChange('city')}
              placeholder="City"
              className="w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <input
              value={form.address.state}
              onChange={onAddrChange('state')}
              placeholder="State"
              className="w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <input
              value={form.address.pincode}
              onChange={onAddrChange('pincode')}
              placeholder="Pincode"
              pattern="^[1-9][0-9]{5}$"
              title="Enter a valid 6-digit Indian pincode"
              className={`w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200 ${
                form.address.pincode && !pinOK ? 'border-red-400' : ''
              }`}
            />
          </div>
        </div>

        {/* Error */}
        {error && <div className="text-sm text-red-600">{error}</div>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !formValid}
          className="w-full rounded-xl bg-emerald-600 text-white py-2.5 font-medium hover:bg-emerald-700 transition disabled:opacity-60"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>

        <div className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-emerald-700 hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  )
}
