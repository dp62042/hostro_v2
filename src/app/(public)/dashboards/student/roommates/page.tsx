'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function RoommatesPage() {
  const [matches, setMatches] = useState<any[]>([])
  useEffect(() => {
    ;(async () => {
      const res = await api<{ data: any[] }>(
        '/api/roommates/matches',
        {},
        { throwOnError: false }
      )
      setMatches(res?.data || [])
    })()
  }, [])

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-4 shadow">
        <h2 className="text-lg font-semibold">Suggested Roommates</h2>
        <p className="text-sm text-gray-600">
          Based on location, budget & lifestyle preferences.
        </p>
      </div>
      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'budget', label: 'Budget' },
          { key: 'city', label: 'City' },
          { key: 'compat', label: 'Compatibility' },
          { key: 'actions', label: 'Actions' },
        ]}
        rows={matches.map((m) => ({
          name: m.name,
          budget: `₹ ${m.budget}`,
          city: m.city,
          compat: `${m.compatibility || 0}%`,
          actions: (
            <button
              onClick={() => alert('Request sent')}
              className="text-emerald-700 underline"
            >
              Connect
            </button>
          ),
        }))}
        empty="No matches right now"
      />
    </div>
  )
}
