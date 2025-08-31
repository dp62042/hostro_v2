'use client'

import { useEffect, useState } from 'react'
import PGCard, { PG } from '@/components/student/PGCard'
import { api } from '@/lib/fetcher'

export default function FavouritesPage() {
  const [data, setData] = useState<PG[]>([])
  useEffect(() => {
    ;(async () => {
      const res = await api<{ data: PG[] }>(
        '/api/favourites',
        {},
        { throwOnError: false }
      )
      setData(res?.data || [])
    })()
  }, [])

  const toggleFav = async (id: string, fav: boolean) => {
    await api(
      `/api/favourites/${id}`,
      { method: fav ? 'DELETE' : 'POST' },
      { throwOnError: false }
    )
    setData((d) => d.filter((x) => x._id !== id))
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((pg) => (
        <PGCard
          key={pg._id}
          item={{ ...pg, isFavourite: true }}
          onFav={(id) => toggleFav(id, true)}
          onView={(id) => (window.location.href = `/pg/${id}`)}
        />
      ))}
      {data.length === 0 && (
        <div className="text-gray-600">No favourites yet.</div>
      )}
    </div>
  )
}
