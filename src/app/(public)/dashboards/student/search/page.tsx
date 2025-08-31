'use client'

import { useEffect, useMemo, useState } from 'react'
import PGCard, { PG } from '@/components/student/PGCard'
import { api } from '@/lib/fetcher'

export default function SearchPGs() {
  const [query, setQuery] = useState({
    city: '',
    min: 0,
    max: 20000,
    gender: 'unisex',
    sort: 'recent',
  })
  const [amenities, setAmenities] = useState<string[]>([])
  const [data, setData] = useState<PG[]>([])
  const [loading, setLoading] = useState(false)

  const qs = useMemo(() => {
    const u = new URLSearchParams()
    if (query.city) u.set('city', query.city)
    u.set('minPrice', String(query.min))
    u.set('maxPrice', String(query.max))
    u.set('gender', query.gender)
    u.set('sort', query.sort)
    if (amenities.length) u.set('amenities', amenities.join(','))
    u.set('status', 'approved')
    return u.toString()
  }, [query, amenities])

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await api<{ data: PG[] }>(
          `/api/pgs?${qs}`,
          {},
          { throwOnError: false }
        )
        setData(res?.data || [])
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(t)
  }, [qs])

  const toggleAmenity = (a: string) =>
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    )

  const handleFav = async (id: string, fav: boolean) => {
    await api(
      `/api/favourites/${id}`,
      { method: fav ? 'POST' : 'DELETE' },
      { throwOnError: false }
    )
    setData((d) =>
      d.map((x) => (x._id === id ? { ...x, isFavourite: fav } : x))
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-4 shadow">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <input
            placeholder="City"
            className="rounded-lg border px-3 py-2"
            value={query.city}
            onChange={(e) => setQuery({ ...query, city: e.target.value })}
          />
          <input
            placeholder="Min ₹"
            type="number"
            className="rounded-lg border px-3 py-2"
            value={query.min}
            onChange={(e) =>
              setQuery({ ...query, min: Number(e.target.value) })
            }
          />
          <input
            placeholder="Max ₹"
            type="number"
            className="rounded-lg border px-3 py-2"
            value={query.max}
            onChange={(e) =>
              setQuery({ ...query, max: Number(e.target.value) })
            }
          />
          <select
            className="rounded-lg border px-3 py-2"
            value={query.gender}
            onChange={(e) => setQuery({ ...query, gender: e.target.value })}
          >
            <option value="unisex">Unisex</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
          </select>
          <select
            className="rounded-lg border px-3 py-2"
            value={query.sort}
            onChange={(e) => setQuery({ ...query, sort: e.target.value })}
          >
            <option value="recent">Recent</option>
            <option value="price_asc">Price ↑</option>
            <option value="price_desc">Price ↓</option>
          </select>
          <div className="flex items-center gap-2 text-sm">
            {['wifi', 'laundry', 'tiffin', 'ac', 'parking'].map((a) => (
              <label key={a} className="inline-flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={amenities.includes(a)}
                  onChange={() => toggleAmenity(a)}
                />
                {a}
              </label>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((pg) => (
            <PGCard
              key={pg._id}
              item={pg}
              onFav={handleFav}
              onView={(id) => (window.location.href = `/pg/${id}`)}
              onBook={async (id) => {
                const res = await api<{ bookingId: string }>('/api/bookings', {
                  method: 'POST',
                  body: JSON.stringify({ pgId: id, type: 'request' }),
                })
                window.location.href = `/dashboards/student/bookings?created=${res.bookingId}`
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
