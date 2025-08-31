'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { FaHandshake, FaHome, FaShieldAlt, FaUserFriends } from 'react-icons/fa'
import { HiLightningBolt } from 'react-icons/hi'
import { IoRocketSharp } from 'react-icons/io5'

// ---------- variants ----------
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  },
})
const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
}
const card = {
  initial: { opacity: 0, y: 18, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}
const lineGrow = {
  initial: { scaleY: 0 },
  animate: { scaleY: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
}

// ---------- tiny count-up hook ----------
function useCountUp(to: number, start: boolean, durationMs = 1200) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf: number
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs)
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3)))) // ease-out cubic
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, start, durationMs])
  return val
}

export default function AboutPage() {
  // hero parallax glow
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  // counters trigger when stats in view
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })
  const statPGs = useCountUp(300, statsInView) // listed PGs (demo)
  const statCities = useCountUp(12, statsInView) // cities (demo)
  const statStudents = useCountUp(5000, statsInView) // students reached (demo)

  // timeline data (kept simple + factual per your story)
  const timeline = useMemo(
    () => [
      {
        year: '2021',
        title: 'Idea & groundwork',
        copy: 'Started exploring the student housing problem and drafted the Hostro blueprint.',
        icon: <HiLightningBolt className="text-emerald-600" />,
      },
      {
        year: '2025',
        title: 'Hostro is born',
        copy: 'Hostro Ventures Pvt Ltd is incorporated with a mission to modernize PG & co-living.',
        icon: <IoRocketSharp className="text-emerald-600" />,
      },
      {
        year: '2025',
        title: 'Connect+ & Sparks',
        copy: 'Launching Hostro Connect+ (college partnerships) and Sparks (hackathons/ideathons).',
        icon: <FaUserFriends className="text-emerald-600" />,
      },
    ],
    []
  )

  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* soft gradient glow */}
        <motion.div
          style={{ y: glowY, opacity: glowOpacity }}
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full blur-3xl"
        >
          <div className="h-full w-full bg-emerald-500/20 rounded-full" />
        </motion.div>

        <div className="container mx-auto px-4 pt-20 md:pt-28 pb-14">
          <motion.div
            {...fadeUp(0.05)}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-sm font-semibold tracking-wide text-emerald-600 uppercase">
              About Hostro
            </p>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
              Building the future of{' '}
              <span className="text-emerald-600">PG & Co-living</span>
            </h1>
            <p className="mt-4 text-gray-600 text-base md:text-lg">
              Hostro connects students and professionals with verified PGs,
              seamless bookings, transparent payments, and dependable support —
              all in one platform.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.2)}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="/how-it-works"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
            >
              How it works
            </a>
            <a
              href="/partners"
              className="px-5 py-2.5 rounded-xl border border-gray-200 hover:border-emerald-600 hover:text-emerald-700 transition font-medium"
            >
              Our partners
            </a>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { label: 'Listed PGs', value: statPGs, suffix: '+' },
              { label: 'Active Cities', value: statCities, suffix: '' },
              { label: 'Students Reached', value: statStudents, suffix: '+' },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={card}
                className="rounded-2xl border p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-emerald-600">
                  {s.value}
                  {s.suffix}
                </div>
                <div className="mt-1 text-gray-600">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 gap-6"
          >
            <motion.div variants={card} className="rounded-2xl border p-6">
              <div className="flex items-center gap-3">
                <FaHome className="text-emerald-600 text-2xl" />
                <h3 className="text-xl font-semibold">Our Mission</h3>
              </div>
              <p className="mt-3 text-gray-600">
                Make PG living simple, safe, and delightful — from discovery to
                move-out — through verified listings, fair pricing, digital
                agreements, and reliable support.
              </p>
            </motion.div>

            <motion.div variants={card} className="rounded-2xl border p-6">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-emerald-600 text-2xl" />
                <h3 className="text-xl font-semibold">Our Vision</h3>
              </div>
              <p className="mt-3 text-gray-600">
                Become the most trusted ecosystem for co-living — empowering
                students, owners, and institutions with transparent technology
                and vibrant communities.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp(0.05)} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              What we stand for
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Principles that shape our product and partnerships.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <FaHandshake className="text-emerald-600 text-2xl" />,
                title: 'Transparency',
                copy: 'Clear pricing, verified listings, and honest communication.',
              },
              {
                icon: <FaUserFriends className="text-emerald-600 text-2xl" />,
                title: 'Community',
                copy: 'Foster belonging via events, Connect+, and support.',
              },
              {
                icon: <HiLightningBolt className="text-emerald-600 text-2xl" />,
                title: 'Speed',
                copy: 'Fast search, instant booking, and quick resolutions.',
              },
              {
                icon: <IoRocketSharp className="text-emerald-600 text-2xl" />,
                title: 'Innovation',
                copy: 'Automation-first ops, insights, and seamless UX.',
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                variants={card}
                className="rounded-2xl border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  {v.icon}
                  <h3 className="text-lg font-semibold">{v.title}</h3>
                </div>
                <p className="mt-2 text-gray-600">{v.copy}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <motion.h2
            {...fadeUp(0.05)}
            className="text-2xl md:text-3xl font-semibold mb-6"
          >
            Our journey
          </motion.h2>

          <div className="relative pl-6">
            {/* vertical line */}
            <motion.div
              variants={lineGrow}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-100px' }}
              className="absolute left-3 top-0 bottom-0 w-[2px] origin-top bg-emerald-200"
            />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <motion.div
                  key={i}
                  variants={card}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: '-100px' }}
                  className="relative rounded-2xl border p-5"
                >
                  <div className="absolute -left-[22px] top-5 h-4 w-4 rounded-full bg-white border-2 border-emerald-500" />
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-xl">{t.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-emerald-700">
                        {t.year}
                      </div>
                      <h3 className="text-lg font-semibold">{t.title}</h3>
                      <p className="mt-1 text-gray-600">{t.copy}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={card}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            className="rounded-3xl border p-8 md:p-10 bg-gradient-to-br from-white to-emerald-50/50"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold">
                  Ready to list your PG or find your next stay?
                </h3>
                <p className="mt-2 text-gray-600 max-w-2xl">
                  Join the Hostro network — streamlined onboarding for owners,
                  verified options for students, and dependable support for all.
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href="/register?role=owner"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
                >
                  List your PG
                </a>
                <a
                  href="/explore"
                  className="px-5 py-2.5 rounded-xl border border-gray-200 hover:border-emerald-600 hover:text-emerald-700 transition font-medium"
                >
                  Explore stays
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
