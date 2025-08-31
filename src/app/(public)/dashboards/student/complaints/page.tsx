'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function ComplaintsPage() {
  const [list, setList] = useState<any[]>([])
  const [form, setForm] = useState({ category: 'maintenance', message: '' })
  const [loading, setLoading] = useState(false)

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/complaints?mine=true',
      {},
      { throwOnError: false }
    )
    setList(res?.data || [])
  }

  useEffect(() => {
    load()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api('/api/complaints', {
        method: 'POST',
        body: JSON.stringify(form),
      })
      setForm({ category: 'maintenance', message: '' })
      await load()
    } catch (e: any) {
      alert(e.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-4 shadow">
        <h2 className="mb-3 text-lg font-semibold">Raise a complaint</h2>
        <form
          onSubmit={submit}
          className="grid grid-cols-1 gap-3 md:grid-cols-3"
        >
          <select
            className="rounded-lg border px-3 py-2"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="maintenance">Maintenance</option>
            <option value="cleaning">Cleaning</option>
            <option value="food">Food</option>
            <option value="electricity">Electricity</option>
            <option value="other">Other</option>
          </select>
          <input
            className="md:col-span-2 rounded-lg border px-3 py-2"
            placeholder="Describe the issue"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <div className="md:col-span-3">
            <button
              disabled={loading}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
            >
              {loading ? 'Submitting…' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      <DataTable
        columns={[
          { key: 'id', label: 'Ticket' },
          { key: 'category', label: 'Category' },
          { key: 'status', label: 'Status' },
          { key: 'created', label: 'Created' },
        ]}
        rows={list.map((c) => ({
          id: c.ticketNo || c._id,
          category: c.category,
          status: (
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                c.status === 'resolved'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {c.status}
            </span>
          ),
          created: new Date(c.createdAt).toLocaleString(),
        }))}
        empty="No complaints raised yet"
      />
    </div>
  )
}
