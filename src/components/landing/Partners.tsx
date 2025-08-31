/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { JSX, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaBuilding,
  FaHandsHelping,
  FaHotel,
  FaUsers,
  FaRegHandshake,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'
import { GiModernCity } from 'react-icons/gi'

type Partner = {
  name: string
  description: string
  icon: JSX.Element
}

const partners: Partner[] = [
  {
    name: 'Co-livo',
    description:
      'Premium co-living spaces with modern amenities and community vibes.',
    icon: <FaBuilding className="text-emerald-600 text-4xl" />,
  },
  {
    name: 'Tenet Group',
    description:
      'Trusted PG and rental property management solutions across India.',
    icon: <FaHandsHelping className="text-emerald-600 text-4xl" />,
  },
  {
    name: 'UrbanStay',
    description: 'City-based short and long-term stays tailored for students.',
    icon: <GiModernCity className="text-emerald-600 text-4xl" />,
  },
  {
    name: 'RoomMate Hub',
    description: 'Find and match compatible roommates for peaceful living.',
    icon: <FaUsers className="text-emerald-600 text-4xl" />,
  },
  {
    name: 'StayConnect',
    description: 'Bridging PG owners and students with seamless digital tools.',
    icon: <FaRegHandshake className="text-emerald-600 text-4xl" />,
  },
  {
    name: 'Hostro Vendor Network',
    description:
      'A curated network of reliable vendors powering Hostro services.',
    icon: <FaHotel className="text-emerald-600 text-4xl" />,
  },
]

// wider, premium-looking card
function PartnerCard({ p }: { p: Partner }) {
  return (
    <motion.div
      whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.8 }}
      className="
        group relative snap-start
        min-w-[220px] sm:min-w-[260px] md:min-w-[320px] lg:min-w-[360px]
        max-w-[420px]
      "
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-emerald-500/20 via-emerald-300/10 to-transparent blur"></div>

      <div className="relative border rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 h-[80%]">
        <div className="mb-1">{p.icon}</div>
        <h3 className="text-xl font-semibold">{p.name}</h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed pb-2">
          {p.description}
        </p>
        <span className="mt-5 block h-[2px] w-0 group-hover:w-24 bg-emerald-600 transition-all duration-300"></span>
      </div>
    </motion.div>
  )
}

export default function PartnersPage() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const pausedRef = useRef(false)
  const [speed, setSpeed] = useState(0.6) // px per frame; tweak to taste

  // arrow buttons still work
  const scrollBy = (dir: 'left' | 'right') => {
    const el = scrollerRef.current
    if (!el) return
    const step = 420 // approx card width incl. gap; adjust if you change widths/gaps
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' })
  }

  // continuous auto-scroll with seamless loop using duplicated content
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const tick = () => {
      if (!el) return
      if (!pausedRef.current) {
        el.scrollLeft += speed
        // when half traversed (since we duplicate content), wrap for seamless loop
        const half = el.scrollWidth / 2
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [speed])

  // pause on hover / touch
  const pause = () => (pausedRef.current = true)
  const resume = () => (pausedRef.current = false)

  // optional: slow down on user scroll, then resume
  const onUserScroll = () => {
    setSpeed(0.25)
    window.clearTimeout((onUserScroll as any)._t)
    ;(onUserScroll as any)._t = window.setTimeout(() => setSpeed(0.6), 800)
  }

  // duplicate the items to create the infinite loop
  const doubled = [...partners, ...partners]

  return (
    <section className="py-14 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-emerald-600">Our Partners</p>
          <h2 className="mt-2 text-3xl font-semibold">
            Collaborating for Better Living
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            We team up with organizations that share our mission to elevate PG &
            co-living.
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            Auto-scrolling · hover to pause
          </span>
          <div className="flex gap-2">
            <button
              aria-label="Scroll left"
              onClick={() => scrollBy('left')}
              className="inline-flex items-center justify-center rounded-full border p-2 hover:bg-gray-50 transition"
            >
              <FaChevronLeft />
            </button>
            <button
              aria-label="Scroll right"
              onClick={() => scrollBy('right')}
              className="inline-flex items-center justify-center rounded-full border p-2 hover:bg-gray-50 transition"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <motion.div
          ref={scrollerRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          onScroll={onUserScroll}
          className="
            relative flex gap-6 overflow-x-auto snap-x snap-mandatory
            px-1 py-2 scroll-smooth
            [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden
          "
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* gradient edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent"></div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent"></div>

          {doubled.map((p, idx) => (
            <PartnerCard key={idx} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
