'use client'

interface Props {
  columns: string[]
  data: any[]
}

export default function DataTable({ columns, data }: Props) {
  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2 text-left text-sm font-semibold"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((row, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 text-sm">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
