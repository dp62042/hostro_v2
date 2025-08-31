'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function NotificationsPage() {
  const [rows, setRows] = useState<any[]>([])
  const [form, setForm] = useState({ channel: 'email', title: '', message: '' })

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/admin/notifications',
      {},
      { throwOnError: false }
    )
    setRows(res?.data || [])
  }
  useEffect(() => {
    load()
  }, [])

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    await api('/api/admin/notifications', {
      method: 'POST',
      body: JSON.stringify(form),
    })
    setForm({ channel: 'email', title: '', message: '' })
    await load()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Notifications</h2>
      <form
        onSubmit={send}
        className="grid grid-cols-1 gap-3 md:max-w-2xl md:grid-cols-3"
      >
        <select
          className="rounded-lg border px-3 py-2"
          value={form.channel}
          onChange={(e) => setForm({ ...form, channel: e.target.value })}
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
        <input
          className="md:col-span-2 rounded-lg border px-3 py-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="md:col-span-3 min-h-[120px] rounded-lg border px-3 py-2"
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <div>
          <button className="rounded-lg bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700">
            Send
          </button>
        </div>
      </form>

      <DataTable
        columns={[
          { key: 'channel', label: 'Channel' },
          { key: 'title', label: 'Title' },
          { key: 'status', label: 'Status' },
          { key: 'createdAt', label: 'Created' },
        ]}
        rows={rows.map((n) => ({
          channel: n.channel,
          title: n.title,
          status: n.status,
          createdAt: new Date(n.createdAt).toLocaleString(),
        }))}
        empty="No notifications yet"
      />
    </div>
  )
}
