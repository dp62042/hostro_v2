'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function CouponsPage() {
  const [rows, setRows] = useState<any[]>([])
  const [form, setForm] = useState({ code: '', percent: 10, maxUses: 100 })

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/admin/coupons',
      {},
      { throwOnError: false }
    )
    setRows(res?.data || [])
  }
  useEffect(() => {
    load()
  }, [])

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    await api('/api/admin/coupons', {
      method: 'POST',
      body: JSON.stringify(form),
    })
    setForm({ code: '', percent: 10, maxUses: 100 })
    await load()
  }
  const toggle = async (id: string) => {
    await api(`/api/admin/coupons/${id}/toggle`, { method: 'PATCH' })
    await load()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Coupons</h2>

      <form
        onSubmit={create}
        className="grid grid-cols-1 gap-3 md:max-w-xl md:grid-cols-4"
      >
        <input
          className="rounded-lg border px-3 py-2"
          placeholder="CODE"
          value={form.code}
          onChange={(e) =>
            setForm({ ...form, code: e.target.value.toUpperCase() })
          }
          required
        />
        <input
          type="number"
          className="rounded-lg border px-3 py-2"
          placeholder="%"
          value={form.percent}
          onChange={(e) =>
            setForm({ ...form, percent: Number(e.target.value) })
          }
        />
        <input
          type="number"
          className="rounded-lg border px-3 py-2"
          placeholder="Max uses"
          value={form.maxUses}
          onChange={(e) =>
            setForm({ ...form, maxUses: Number(e.target.value) })
          }
        />
        <button className="rounded-lg bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700">
          Create
        </button>
      </form>

      <DataTable
        columns={[
          { key: 'code', label: 'Code' },
          { key: 'percent', label: 'Percent' },
          { key: 'used', label: 'Used' },
          { key: 'active', label: 'Active' },
          { key: 'actions', label: 'Actions' },
        ]}
        rows={rows.map((c) => ({
          code: c.code,
          percent: `${c.percent}%`,
          used: `${c.used || 0}/${c.maxUses}`,
          active: String(c.active),
          actions: (
            <button
              className="rounded-lg border px-3 py-1 text-sm"
              onClick={() => toggle(c._id)}
            >
              {c.active ? 'Disable' : 'Enable'}
            </button>
          ),
        }))}
        empty="No coupons"
      />
    </div>
  )
}
