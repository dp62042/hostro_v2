'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/fetcher'

export default function SettingsPage() {
  const [form, setForm] = useState({
    commission: 10,
    branding: { name: 'Hostro', primary: '#059669' },
    domains: '',
  })
  const [ok, setOk] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      const s = await api(
        '/api/superadmin/settings',
        {},
        { throwOnError: false }
      )
      if (s)
        setForm({
          commission: s.commission ?? 10,
          branding: s.branding ?? form.branding,
          domains: (s.domains || []).join(','),
        })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setOk(null)
    const payload = {
      ...form,
      domains: form.domains
        .split(',')
        .map((d) => d.trim())
        .filter(Boolean),
    }
    await api('/api/superadmin/settings', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    setOk('Settings saved')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Platform Settings</h2>
      {ok && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700">
          {ok}
        </div>
      )}
      <form onSubmit={save} className="grid grid-cols-1 gap-3 md:max-w-2xl">
        <label className="text-sm">Commission %</label>
        <input
          type="number"
          className="rounded-lg border px-3 py-2"
          value={form.commission}
          onChange={(e) =>
            setForm({ ...form, commission: Number(e.target.value) })
          }
        />
        <label className="text-sm">Brand Name</label>
        <input
          className="rounded-lg border px-3 py-2"
          value={form.branding.name}
          onChange={(e) =>
            setForm({
              ...form,
              branding: { ...form.branding, name: e.target.value },
            })
          }
        />
        <label className="text-sm">Primary Color</label>
        <input
          className="rounded-lg border px-3 py-2"
          value={form.branding.primary}
          onChange={(e) =>
            setForm({
              ...form,
              branding: { ...form.branding, primary: e.target.value },
            })
          }
        />
        <label className="text-sm">Allowed Domains (comma-separated)</label>
        <input
          className="rounded-lg border px-3 py-2"
          value={form.domains}
          onChange={(e) => setForm({ ...form, domains: e.target.value })}
        />
        <button className="mt-2 w-fit rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
          Save
        </button>
      </form>
    </div>
  )
}
