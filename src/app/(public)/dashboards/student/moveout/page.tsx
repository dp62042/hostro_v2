'use client'

import { useState } from 'react'
import { api } from '@/lib/fetcher'

export default function MoveOutPage() {
  const [form, setForm] = useState({ date: '', reason: '' })
  const [ok, setOk] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setOk(null)
    await api('/api/moveout', { method: 'POST', body: JSON.stringify(form) })
    setOk('Move-out request submitted. The owner/admin will review it.')
    setForm({ date: '', reason: '' })
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-semibold">Move-out Request</h2>
      {ok && (
        <div className="mb-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700">
          {ok}
        </div>
      )}
      <form onSubmit={submit} className="grid grid-cols-1 gap-3 md:max-w-lg">
        <input
          type="date"
          required
          className="rounded-lg border px-3 py-2"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <textarea
          required
          className="min-h-[100px] rounded-lg border px-3 py-2"
          placeholder="Reason"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />
        <button className="rounded-lg bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700">
          Submit
        </button>
      </form>
    </div>
  )
}
