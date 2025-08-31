export default function SuperadminOverview() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-emerald-700">Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Earnings', value: '—' },
          { label: 'Occupancy', value: '—' },
          { label: 'Users', value: '—' },
          { label: 'Open Complaints', value: '—' },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border bg-white p-4">
            <div className="text-sm text-gray-500">{c.label}</div>
            <div className="mt-1 text-2xl font-semibold">{c.value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border bg-white p-4">
        <div className="text-sm text-gray-500 mb-2">Recent Activity</div>
        <div className="text-gray-600 text-sm">No data yet.</div>
      </div>
    </div>
  )
}
