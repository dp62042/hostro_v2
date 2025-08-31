'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/fetcher'

export default function AdminOverview() {
  const [cards, setCards] = useState([
    { label: 'Total Earnings', value: '—' },
    { label: 'Active PGs', value: '—' },
    { label: 'Pending Approvals', value: '—' },
    { label: 'Open Complaints', value: '—' },
  ])

  useEffect(() => {
    ;(async () => {
      const kpis = await api<any>('/api/admin/', {}, { throwOnError: false })
      if (kpis)
        setCards([
          {
            label: 'Total Earnings',
            value: `₹ ${
              kpis.earnings?.toLocaleString?.() ?? kpis.earnings ?? '—'
            }`,
          },
          { label: 'Active PGs', value: kpis.activePGs ?? '—' },
          { label: 'Pending Approvals', value: kpis.pendingApprovals ?? '—' },
          { label: 'Open Complaints', value: kpis.openComplaints ?? '—' },
        ])
    })()
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl bg-white p-4 shadow">
            <div className="text-sm text-gray-500">{c.label}</div>
            <div className="mt-1 text-xl font-semibold">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-4 shadow">
        <div className="mb-2 text-lg font-semibold">Recent Activity</div>
        <ul className="list-disc space-y-1 pl-6 text-sm text-gray-700">
          <li>
            Latest bookings, approvals, and escalations will appear here (hook
            `/api/admin/activity`).
          </li>
        </ul>
      </div>
    </div>
  )
}
