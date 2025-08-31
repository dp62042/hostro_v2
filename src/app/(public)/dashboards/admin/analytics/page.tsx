'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/fetcher'

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null)
  useEffect(() => {
    ;(async () =>
      setStats(
        await api('/api/admin/analytics', {}, { throwOnError: false })
      ))()
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Platform Analytics</h2>
      <div className="rounded-xl bg-white p-4 shadow">
        <pre className="text-sm text-gray-800">
          {JSON.stringify(
            stats || { note: 'Plug your charts here (Recharts/ECharts)' },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  )
}
