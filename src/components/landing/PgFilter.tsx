/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Card = {
  _id: string
  name: string
  images?: string[]
  gender: 'male' | 'female' | 'unisex'
  address?: { city?: string; line1?: string }
  roomTypes?: { price: number }[]
  status: 'approved' | 'pending' | 'rejected'
}

const AMENITIES = [
  'wifi',
  'ac',
  'laundry',
  'parking',
  'meals',
  'cctv',
  'power_backup',
] as const
type Amenity = (typeof AMENITIES)[number]

const SUGGESTED_CITIES = [
  'Jaipur',
  'Pune',
  'Bengaluru',
  'Delhi',
  'Mumbai',
  'Chennai',
] as const

export default function PgFilter() {
  // filters
  const [city, setCity] = useState('')
  const [gender, setGender] = useState('')
  const [q, setQ] = useState('')
  const [minPrice, setMinPrice] = useState<number>(2000)
  const [maxPrice, setMaxPrice] = useState<number>(15000)
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [sort, setSort] = useState<'recent' | 'price_asc' | 'price_desc'>(
    'recent'
  )

  // data
  const [items, setItems] = useState<Card[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const limit = 12

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function toggleAmen(k: Amenity) {
    setAmenities((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]))
  }

  async function load(p = 1) {
    setLoading(true)
    setError(null)
    try {
      const qs = new URLSearchParams({
        status: 'approved',
        page: String(p),
        limit: String(limit),
        sort,
        ...(city ? { city } : {}),
        ...(gender ? { gender } : {}),
        ...(q ? { q } : {}),
        ...(minPrice ? { minPrice: String(minPrice) } : {}),
        ...(maxPrice ? { maxPrice: String(maxPrice) } : {}),
        ...(amenities.length ? { amenities: amenities.join(',') } : {}),
      })
      const r = await api<{ data: Card[]; total: number }>(
        '/api/pgs?' + qs.toString()
      )
      setItems(r.data || [])
      setTotal(r.total || 0)
      setPage(p)
    } catch (e: any) {
      setError(e.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(1)
  }, [])

  const pages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total])

  function resetFilters() {
    setCity('')
    setGender('')
    setQ('')
    setMinPrice(2000)
    setMaxPrice(15000)
    setAmenities([])
    setSort('recent')
    load(1)
  }

  return (
    <div className="p-6 space-y-6 px-4 md:px-16 text-gray-700 bg-white">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-semibold">Explore PGs</h1>
        <Link
          href="/student/search"
          className="text-sm text-emerald-700 hover:underline"
        >
          Go to Student Search
        </Link>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border p-4 grid gap-3 md:grid-cols-6">
        <input
          className="border rounded-lg px-3 py-2 md:col-span-2"
          placeholder="City (e.g., Jaipur)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="border rounded-lg px-3 py-2 md:col-span-2"
          placeholder="Search name / area"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="border rounded-lg px-3 py-2"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Any gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unisex">Unisex</option>
        </select>
        <select
          className="border rounded-lg px-3 py-2"
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
        >
          <option value="recent">Sort: Recent</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>

        {/* Price Range */}
        <div className="md:col-span-3">
          <PriceRange
            min={1000}
            max={25000}
            step={500}
            value={{ min: minPrice, max: maxPrice }}
            onChange={({ min, max }) => {
              setMinPrice(min)
              setMaxPrice(max)
            }}
          />
        </div>

        {/* Amenities + actions */}
        <div className="md:col-span-3 flex flex-wrap items-center gap-2">
          {AMENITIES.map((k) => (
            <label
              key={k}
              className={`px-3 py-1 rounded-full border cursor-pointer text-sm ${
                amenities.includes(k)
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : ''
              }`}
            >
              <input
                type="checkbox"
                checked={amenities.includes(k)}
                onChange={() => toggleAmen(k)}
                className="hidden"
              />
              <span className="capitalize">{k.replace('_', ' ')}</span>
            </label>
          ))}
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => load(1)}
              className="px-3 py-2 rounded-lg bg-emerald-600 text-white"
            >
              Apply
            </button>
            <button
              onClick={resetFilters}
              className="px-3 py-2 rounded-lg border"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {error && <p className="text-red-600">{error}</p>}

      {loading ? (
        <GridSkeleton />
      ) : items.length === 0 ? (
        <EmptyState
          onReset={resetFilters}
          onQuickCity={(c) => {
            setCity(c)
            load(1)
          }}
        />
      ) : (
        <>
          <ul className="grid gap-4 md:grid-cols-3">
            {items.map((p) => (
              <li
                key={p._id}
                className="border rounded-2xl overflow-hidden hover:shadow-md transition"
              >
                <div className="h-40 w-full bg-gray-100 relative">
                  {p.images?.[0] && (
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                  )}
                </div>
                <div className="p-4 space-y-1">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-gray-500">
                    {p.address?.city} • {p.gender}
                  </p>
                  <p className="text-sm">
                    From ₹{p.roomTypes?.[0]?.price ?? '—'}
                  </p>
                  <Link
                    href={`/student/pg/${p._id}`}
                    className="inline-block mt-2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white"
                  >
                    View details
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center gap-2 pt-2">
              <button
                disabled={page <= 1}
                onClick={() => load(page - 1)}
                className="px-3 py-2 rounded-lg border disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm">
                Page {page} of {pages}
              </span>
              <button
                disabled={page >= pages}
                onClick={() => load(page + 1)}
                className="px-3 py-2 rounded-lg border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

/** Dual-thumb price slider */
function PriceRange({
  min = 1000,
  max = 20000,
  step = 500,
  value,
  onChange,
  currency = '₹',
}: {
  min?: number
  max?: number
  step?: number
  value: { min: number; max: number }
  onChange: (v: { min: number; max: number }) => void
  currency?: string
}) {
  const [minV, setMinV] = useState(value.min)
  const [maxV, setMaxV] = useState(value.max)

  // sync external
  useEffect(() => {
    setMinV(value.min)
    setMaxV(value.max)
  }, [value.min, value.max])

  const [minPct, maxPct] = useMemo(() => {
    const toPct = (n: number) => ((n - min) / (max - min)) * 100
    return [toPct(minV), toPct(maxV)]
  }, [minV, maxV, min, max])

  const clamp = (n: number) => Math.min(max, Math.max(min, n))

  function updateMin(n: number) {
    const v = Math.min(clamp(n), maxV - step)
    setMinV(v)
    onChange({ min: v, max: maxV })
  }
  function updateMax(n: number) {
    const v = Math.max(clamp(n), minV + step)
    setMaxV(v)
    onChange({ min: minV, max: v })
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Price range</span>
        <span className="text-sm font-medium">
          {currency}
          {minV.toLocaleString()} – {currency}
          {maxV.toLocaleString()}
        </span>
      </div>

      <div className="relative h-10">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gray-200" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-emerald-500 transition-all duration-300"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
        />

        <Thumb
          ariaLabel="Minimum price"
          percent={minPct}
          valueLabel={`${currency}${minV.toLocaleString()}`}
          onKeyStep={(dir) => updateMin(minV + (dir === 'inc' ? step : -step))}
        >
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minV}
            onChange={(e) => updateMin(Number(e.target.value))}
            className="absolute inset-0 w-full h-10 opacity-0 cursor-pointer"
          />
        </Thumb>

        <Thumb
          ariaLabel="Maximum price"
          percent={maxPct}
          valueLabel={`${currency}${maxV.toLocaleString()}`}
          onKeyStep={(dir) => updateMax(maxV + (dir === 'inc' ? step : -step))}
        >
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxV}
            onChange={(e) => updateMax(Number(e.target.value))}
            className="absolute inset-0 w-full h-10 opacity-0 cursor-pointer"
          />
        </Thumb>
      </div>

      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>
          {currency}
          {min.toLocaleString()}
        </span>
        <span>
          {currency}
          {max.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

function Thumb({
  percent,
  children,
  valueLabel,
  ariaLabel,
  onKeyStep,
}: {
  percent: number
  children: React.ReactNode
  valueLabel: string
  ariaLabel: string
  onKeyStep: (dir: 'inc' | 'dec') => void
}) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2"
      style={{ left: `calc(${percent}% - 14px)` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        aria-label={ariaLabel}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault()
            onKeyStep('inc')
          }
          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault()
            onKeyStep('dec')
          }
        }}
        className="relative z-10 h-7 w-7 rounded-full bg-white border shadow-sm grid place-items-center
                   hover:shadow transition-shadow focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-600" />
      </button>

      <div
        className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-gray-900 text-white text-xs
                    transition-all duration-200 ${
                      hover ? 'opacity-100 -translate-y-1' : 'opacity-0'
                    }`}
        role="status"
        aria-hidden={!hover}
      >
        {valueLabel}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>

      <div className="absolute -left-[calc(50vw)] right-[calc(50vw)] -top-2 -bottom-2">
        {children}
      </div>
    </div>
  )
}

/** Skeleton while loading */
function GridSkeleton() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <li
          key={i}
          className="border rounded-2xl overflow-hidden animate-pulse"
        >
          <div className="h-40 w-full bg-gray-200" />
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
            <div className="h-3 bg-gray-200 rounded w-1/4" />
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Empty state with quick chips + reset */
function EmptyState({
  onReset,
  onQuickCity,
}: {
  onReset: () => void
  onQuickCity: (c: string) => void
}) {
  return (
    <div className="rounded-2xl border p-8 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center">
        <span className="text-2xl">😕</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold">No PGs match your filters</h3>
      <p className="mt-1 text-sm text-gray-600">
        Try adjusting the price range, removing a few amenities, or pick a
        suggested city.
      </p>
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {SUGGESTED_CITIES.map((c) => (
          <button
            key={c}
            onClick={() => onQuickCity(c)}
            className="px-3 py-1.5 rounded-full border hover:border-emerald-600 hover:text-emerald-700"
          >
            {c}
          </button>
        ))}
      </div>
      <button
        onClick={onReset}
        className="mt-5 px-4 py-2 rounded-lg bg-emerald-600 text-white"
      >
        Reset filters
      </button>
    </div>
  )
}
