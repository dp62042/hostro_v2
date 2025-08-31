'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()
  const [city, setCity] = useState('')

  function onSearch(e: React.FormEvent) {
    e.preventDefault()
    const qs = city ? `?city=${encodeURIComponent(city)}` : ''
    router.push('/student/search' + qs)
  }

  return (
    <section className="relative overflow-hidden text-gray-400">
      {/* backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-white -z-10" />
      <div className="container mx-auto px-4 p-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        {/* Left: copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Book verified PGs across India
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl sm:text-3xl font-bold leading-tight">
            Find your perfect <span className="text-emerald-600">PG</span> —
            fast, verified, and affordable.
          </h1>

          <p className="mt-4 text-gray-600 text-base md:text-lg">
            Hostro helps students and professionals discover trusted PGs,
            compare rooms and amenities, book securely, and manage everything in
            one place.
          </p>

          {/* Search */}
          <form onSubmit={onSearch} className="mt-6 flex w-full max-w-lg gap-2">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-400"
              placeholder="Search by city (e.g., Jaipur)"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700 transition"
            >
              Search
            </button>
          </form>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/student/search"
              className="rounded-xl border px-5 py-3 hover:border-emerald-600 hover:text-emerald-700 transition"
            >
              Browse PGs
            </Link>
            <Link
              href="/owner/pgs/new"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700 transition"
            >
              List your PG
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md text-center">
            <Stat k="PGs" v="2,400+" />
            <Stat k="Cities" v="35+" />
            <Stat k="Bookings" v="50k+" />
          </div>
        </div>

        {/* Right: collage */}
        <div className="relative">
          <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-emerald-100 blur-3xl opacity-60 -z-10" />
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/hero/img1.jpg"
              alt="PG interior 1"
              width={400}
              height={224}
              className="rounded-2xl object-cover shadow-sm"
            />
            <Image
              src="/hero/img2.jpg"
              alt="PG interior 2"
              width={400}
              height={224}
              className="rounded-2xl object-cover translate-y-6 shadow-sm"
            />
            <Image
              src="/hero/img3.jpg"
              alt="PG interior 3"
              width={400}
              height={224}
              className="rounded-2xl object-cover -translate-y-6 shadow-sm"
            />
            <Image
              src="/hero/img4.jpg"
              alt=""
              width={400}
              height={224}
              className="rounded-2xl object-cover shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border bg-white py-3">
      <p className="text-xl font-semibold">{v}</p>
      <p className="text-xs text-gray-500">{k}</p>
    </div>
  )
}
