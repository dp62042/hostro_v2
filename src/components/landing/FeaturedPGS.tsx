/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'react-feather'

type PG = {
  _id: string
  name: string
  images?: string[]
  address?: { city?: string }
  roomTypes?: { price: number }[]
}

type Props = {
  title?: string
  // optionally pass preloaded items; if not provided, it will fetch from /api/pgs?featured=true
  items?: PG[]
  limit?: number
  autoPlayMs?: number
}

export default function FeaturedPGs({
  title = 'Featured PGs',
  items: initial,
  limit = 12,
  autoPlayMs = 2800,
}: Props) {
  const [items, setItems] = useState<PG[]>(initial || [])
  const [loading, setLoading] = useState(!initial)
  const [error, setError] = useState<string | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const autoRef = useRef<number | null>(null)
  const [hover, setHover] = useState(false)

  // fetch if not provided
  useEffect(() => {
    if (initial?.length) return
    ;(async () => {
      try {
        setLoading(true)
        const qs = new URLSearchParams({
          featured: 'true',
          status: 'approved',
          limit: String(limit),
        })
        const r = await api<{ data: PG[] }>('/api/pgs?' + qs.toString())
        setItems(r.data || [])
      } catch (e: any) {
        setError(e?.message || 'Failed to load featured PGs')
      } finally {
        setLoading(false)
      }
    })()
  }, [initial, limit])

  // autoplay
  useEffect(() => {
    if (hover || !autoPlayMs) return
    const el = trackRef.current
    if (!el) return
    autoRef.current = window.setInterval(() => {
      const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
      if (nearEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 340, behavior: 'smooth' })
      }
    }, autoPlayMs)
    return () => {
      if (autoRef.current) window.clearInterval(autoRef.current)
      autoRef.current = null
    }
  }, [hover, autoPlayMs, items.length])

  function scroll(dir: 'left' | 'right') {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' })
  }

  return (
    <section className="py-10 bg-white text-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">
            {title} <span className="text-emerald-600">✨</span>
          </h2>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-lg border hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-lg border hover:bg-gray-50"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          className="relative group mt-6"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent" />

          {/* track */}
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2
                       [scrollbar-width:none] [-ms-overflow-style:none]"
          >
            <style>{`.snap-track::-webkit-scrollbar{display:none}`}</style>

            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            ) : error ? (
              <div className="py-10 text-sm text-red-600">{error}</div>
            ) : items.length === 0 ? (
              <div className="py-10 text-sm text-gray-600">
                No featured PGs yet.
              </div>
            ) : (
              items.map((pg) => <PGCard key={pg._id} pg={pg} />)
            )}
          </div>

          {/* mobile arrows */}
          <div className="mt-4 flex md:hidden items-center justify-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="px-3 py-2 rounded-lg border"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="px-3 py-2 rounded-lg border"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function PGCard({ pg }: { pg: PG }) {
  const img =
    pg.images?.[0] ||
    'https://images.unsplash.com/photo-1616486702744-3cf3fc9173f1?q=80&w=1200&auto=format&fit=crop'

  return (
    <article
      className="snap-start shrink-0 w-[280px] md:w-[340px] rounded-2xl border overflow-hidden bg-white text-gray-400
                 hover:shadow-md hover:border-emerald-600 transition"
    >
      <div className="relative h-44 w-full">
        <Image
          src={img}
          alt={pg.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 80vw, 340px"
          // remove unoptimized if you added image domains in next.config.js
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {pg.address?.city && (
          <span className="absolute left-2 bottom-2 text-xs px-2 py-1 rounded-md bg-white/90">
            {pg.address.city}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-medium line-clamp-1">{pg.name}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          From ₹{pg.roomTypes?.[0]?.price ?? '—'} / mo
        </p>
        <Link
          href={`/student/pg/${pg._id}`}
          className="mt-3 inline-block px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
        >
          View details
        </Link>
      </div>
    </article>
  )
}

function CardSkeleton() {
  return (
    <div className="snap-start shrink-0 w-[280px] md:w-[340px] rounded-2xl border overflow-hidden bg-white animate-pulse">
      <div className="h-44 w-full bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  )
}
