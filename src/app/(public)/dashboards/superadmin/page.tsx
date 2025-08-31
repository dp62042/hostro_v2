'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/fetcher'

export default function SuperAdminOverview() {
  const [kpis, setKpis] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const data = await api(
        '/api/superadmin/kpis',
        {},
        { throwOnError: false }
      )
      setKpis(data || {})
    })()
  }, [])

  const cards = [
    {
      label: 'Total Earnings',
      value:
        kpis?.earnings != null
          ? `₹ ${kpis.earnings.toLocaleString?.() ?? kpis.earnings}`
          : '—',
    },
    { label: 'Active PGs', value: kpis?.activePGs ?? '—' },
    { label: 'Admins', value: kpis?.admins ?? '—' },
    { label: 'Students', value: kpis?.students ?? '—' },
  ]

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
        <div className="mb-2 text-lg font-semibold">Recent Admin Activity</div>
        <ul className="list-disc space-y-1 pl-6 text-sm text-gray-700">
          <li>
            Hook this to <code>/api/superadmin/activity</code> for approvals,
            role changes, payouts, etc.
          </li>
        </ul>
      </div>
    </div>
  )
}
