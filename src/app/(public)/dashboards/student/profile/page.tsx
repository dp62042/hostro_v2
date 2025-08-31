'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/fetcher'

export default function ProfilePage() {
  const [me, setMe] = useState<any>(null)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    avatarUrl: '',
    address: { line1: '', line2: '', city: '', state: '', pincode: '' },
  })
  const [ok, setOk] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      const res = await api<{ user: any }>('/api/auth/me')
      setMe(res.user)
      setForm({
        name: res.user.name || '',
        phone: res.user.phone || '',
        avatarUrl: res.user.avatarUrl || '',
        address: {
          line1: res.user.address?.line1 || '',
          line2: res.user.address?.line2 || '',
          city: res.user.address?.city || '',
          state: res.user.address?.state || '',
          pincode: res.user.address?.pincode || '',
        },
      })
    })()
  }, [])

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setOk(null)
    await api('/api/auth/me', { method: 'PATCH', body: JSON.stringify(form) })
    setOk('Profile updated')
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-4 shadow">
        <h2 className="text-lg font-semibold">My Profile</h2>
        <p className="text-sm text-gray-600">{me?.email}</p>
      </div>

      <form onSubmit={save} className="grid grid-cols-1 gap-3 md:max-w-2xl">
        {ok && (
          <div className="mb-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700">
            {ok}
          </div>
        )}
        <input
          className="rounded-lg border px-3 py-2"
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="rounded-lg border px-3 py-2"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          className="rounded-lg border px-3 py-2"
          placeholder="Avatar URL"
          value={form.avatarUrl}
          onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
        />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            className="rounded-lg border px-3 py-2"
            placeholder="Address line 1"
            value={form.address.line1}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, line1: e.target.value },
              })
            }
          />
          <input
            className="rounded-lg border px-3 py-2"
            placeholder="Address line 2"
            value={form.address.line2}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, line2: e.target.value },
              })
            }
          />
          <input
            className="rounded-lg border px-3 py-2"
            placeholder="City"
            value={form.address.city}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, city: e.target.value },
              })
            }
          />
          <input
            className="rounded-lg border px-3 py-2"
            placeholder="State"
            value={form.address.state}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, state: e.target.value },
              })
            }
          />
          <input
            className="rounded-lg border px-3 py-2"
            placeholder="Pincode"
            value={form.address.pincode}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, pincode: e.target.value },
              })
            }
          />
        </div>
        <button className="mt-2 w-fit rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
          Save
        </button>
      </form>
    </div>
  )
}
