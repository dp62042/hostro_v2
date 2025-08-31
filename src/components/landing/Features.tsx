'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle, ArrowLeft, ArrowRight, Pause, Play } from 'react-feather'

type Feature = { title: string; desc: string }

const FEATURES: Feature[] = [
  {
    title: 'Verified Listings',
    desc: 'Only approved PGs with real photos and details.',
  },
  {
    title: 'Smart Filters',
    desc: 'City, gender, price range, amenities & more.',
  },
  {
    title: 'Secure Payments',
    desc: 'Razorpay/Stripe flows with clear statuses.',
  },
  { title: 'Owner Dashboard', desc: 'Create, edit, and manage PGs & payouts.' },
  {
    title: 'Student Dashboard',
    desc: 'Search, book, pay, and track complaints.',
  },
  {
    title: 'Moderation & Approvals',
    desc: 'Admin review queue for quality control.',
  },
  {
    title: 'Role-based Access',
    desc: 'JWT auth with student/owner/admin/superadmin.',
  },
  {
    title: 'Image CDN',
    desc: 'ImageKit integration for fast, optimized photos.',
  },
  { title: 'Analytics', desc: 'Stats on users, PGs, bookings, and revenue.' },
  { title: 'Complaints Center', desc: 'Raise, assign, escalate, resolve.' },
  { title: 'Marketing Campaigns', desc: 'Run email, SMS, WhatsApp, or ads.' },
  {
    title: 'Vendors & Contracts',
    desc: 'Onboard and manage service providers.',
  },
  { title: 'Backups & Export', desc: 'One-click JSON data export for safety.' },
  {
    title: 'Commission Engine',
    desc: 'Per-PG or default commission handling.',
  },
]

export default function Features() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [auto, setAuto] = useState(true)

  // Autoplay (pause on hover/focus)
  useEffect(() => {
    if (!auto) return
    const el = trackRef.current
    if (!el) return
    const id = setInterval(() => {
      el.scrollBy({ left: 320, behavior: 'smooth' })
      // loop around when reaching end
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      }
    }, 2600)
    return () => clearInterval(id)
  }, [auto])

  function scrollByAmount(dir: 'left' | 'right') {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  return (
    <section className="py-12 md:py-16 bg-white text-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Why choose <span className="text-emerald-600">Hostro</span>?
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <button
              aria-label="Scroll left"
              onClick={() => scrollByAmount('left')}
              className="p-2 rounded-lg border hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              aria-label="Scroll right"
              onClick={() => scrollByAmount('right')}
              className="p-2 rounded-lg border hover:bg-gray-50"
            >
              <ArrowRight size={18} />
            </button>
            <button
              aria-label={auto ? 'Pause autoplay' : 'Play autoplay'}
              onClick={() => setAuto((v) => !v)}
              className="p-2 rounded-lg border hover:bg-gray-50"
              title={auto ? 'Pause autoplay' : 'Play autoplay'}
            >
              {auto ? <Pause size={18} /> : <Play size={18} />}
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          className="relative group mt-6"
          onMouseEnter={() => setAuto(false)}
          onMouseLeave={() => setAuto(true)}
        >
          {/* edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent" />

          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2
                       [scrollbar-width:none] [-ms-overflow-style:none]"
          >
            {/* hide scrollbar on WebKit */}
            <style>{`.scrollbar-none::-webkit-scrollbar{display:none}`}</style>

            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="snap-start shrink-0 w-[280px] md:w-[320px] rounded-2xl border p-5 shadow-sm
                           hover:border-emerald-600 hover:shadow-md transition bg-white"
              >
                <CheckCircle className="text-emerald-600" />
                <p className="mt-3 font-medium text-emerald-600">{f.title}</p>
                <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
              </article>
            ))}
          </div>

          {/* mobile arrows */}
          <div className="mt-4 flex md:hidden items-center justify-center gap-2">
            <button
              aria-label="Scroll left"
              onClick={() => scrollByAmount('left')}
              className="px-3 py-2 rounded-lg border"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              aria-label="Scroll right"
              onClick={() => scrollByAmount('right')}
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
