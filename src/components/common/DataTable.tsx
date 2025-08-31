'use client'

export default function DataTable({
  columns,
  rows,
  empty = 'No data',
}: {
  columns: { key: string; label: string; className?: string }[]
  rows: Record<string, any>[]
  empty?: string
}) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className={`px-4 py-2 text-left font-semibold ${
                  c.className || ''
                }`}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                className="px-4 py-6 text-center text-gray-500"
                colSpan={columns.length}
              >
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((r, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-2">
                    {r[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
