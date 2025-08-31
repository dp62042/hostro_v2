'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FaBolt,
  FaHome,
  FaMoneyBillWave,
  FaHeadset,
  FaUsers,
  FaTrophy,
  FaRegClock,
  FaMapMarkerAlt,
  FaHandshake,
} from 'react-icons/fa'

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}
const stagger = { animate: { transition: { staggerChildren: 0.07 } } }
const card = {
  initial: { opacity: 0, y: 14, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
}

const EDITIONS = [
  {
    when: 'Sep 20–21, 2025',
    city: 'Jaipur (Onsite)',
    badge: 'Applications open',
    href: '/sparks/apply',
  },
  {
    when: 'Oct 18–19, 2025',
    city: 'Remote (Online)',
    badge: 'Waitlist',
    href: '/sparks/apply?edition=oct',
  },
]

const TRACKS = [
  {
    icon: <FaHome className="text-emerald-600" />,
    title: 'Discovery & Search',
    text: 'Better listing quality, ranking, map UX, and verification.',
  },
  {
    icon: <FaMoneyBillWave className="text-emerald-600" />,
    title: 'Payments & FinOps',
    text: 'Rents, deposits, invoices, reconciliations, and ledgers.',
  },
  {
    icon: <FaHeadset className="text-emerald-600" />,
    title: 'Ops & Support',
    text: 'SLAs, ticketing, vendor routing, and automations.',
  },
  {
    icon: <FaUsers className="text-emerald-600" />,
    title: 'Community',
    text: 'Referrals, roommate matching, Connect+ campus flows.',
  },
]

const PRIZES = [
  { place: 'Champion', amt: '₹50,000', extra: 'Founder mentorship + swag' },
  { place: 'Runner-up', amt: '₹25,000', extra: 'Mentorship + swag' },
  { place: 'Track winners', amt: '₹10,000 each', extra: 'Goodies' },
]

const SCHEDULE = [
  { time: '09:30', label: 'Check-in & breakfast' },
  { time: '10:30', label: 'Kickoff / problem statements' },
  { time: '11:30', label: 'Hacking starts' },
  { time: '14:00', label: 'Mentor office hours' },
  { time: '20:00', label: 'Checkpoint demo' },
  { time: '22:00', label: 'Late-night snacks' },
  { time: '09:00 (Day 2)', label: 'Final polish' },
  { time: '12:00', label: 'Submissions close' },
  { time: '14:00', label: 'Demos & judging' },
  { time: '17:00', label: 'Results & networking' },
]

const RULES = [
  'Teams of up to 4.',
  'Fresh code preferred; public libs/frameworks allowed.',
  'Ship a working demo + 3–5 min presentation.',
  'Open-source encouraged (MIT/Apache-2).',
  'Be kind. Zero-tolerance for harassment.',
]

const JUDGING = [
  'Impact on PG/co-living',
  'Working product/demo',
  'UX & polish',
  'Innovation',
  'Feasibility & clarity',
]

const PARTNERS = [
  { name: 'Co-livo' },
  { name: 'Tenet Group' },
  { name: 'UrbanStay' },
  { name: 'RoomMate Hub' },
]

export default function SparksClient() {
  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-emerald-500/12 blur-3xl"
        />
        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-8 text-center max-w-3xl">
          <motion.p
            {...fade}
            className="text-sm font-semibold tracking-wide text-emerald-600 uppercase"
          >
            Hostro Sparks
          </motion.p>
          <motion.h1 {...fade} className="mt-2 text-3xl md:text-5xl font-bold">
            Hackathons & Ideathons for{' '}
            <span className="text-emerald-600">PG & Co-living</span>
          </motion.h1>
          <motion.p {...fade} className="mt-4 text-gray-600 md:text-lg">
            Build real solutions for discovery, payments, operations, and
            community. Ship fast, demo, get feedback, win prizes.
          </motion.p>
          <motion.div
            {...fade}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/sparks/apply"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
            >
              Apply now
            </Link>
            <Link
              href="/contact?subject=Sponsor%20Sparks"
              className="px-5 py-2.5 rounded-xl border hover:border-emerald-600 hover:text-emerald-700 transition font-medium"
            >
              Sponsor / Mentor
            </Link>
          </motion.div>
        </div>
      </section>

      {/* UPCOMING EDITIONS */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <motion.h2 {...fade} className="text-2xl md:text-3xl font-semibold">
            Upcoming editions
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-6 grid sm:grid-cols-2 gap-6"
          >
            {EDITIONS.map((e, i) => (
              <motion.div
                key={i}
                variants={card}
                className="rounded-2xl border p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-sm text-gray-600 flex items-center gap-3">
                  <FaRegClock /> {e.when}
                </div>
                <div className="mt-1 text-sm text-gray-600 flex items-center gap-3">
                  <FaMapMarkerAlt /> {e.city}
                </div>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
                  <FaBolt className="text-emerald-600" /> {e.badge}
                </div>
                <div className="mt-4">
                  <Link
                    href={e.href}
                    className="text-emerald-700 font-medium hover:underline"
                  >
                    Apply for this edition →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TRACKS */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <motion.h2 {...fade} className="text-2xl md:text-3xl font-semibold">
            Build for these tracks
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {TRACKS.map((t, i) => (
              <motion.div
                key={i}
                variants={card}
                className="rounded-2xl border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  {t.icon}
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                </div>
                <p className="mt-2 text-gray-600">{t.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRIZES */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <motion.h2 {...fade} className="text-2xl md:text-3xl font-semibold">
            Prizes & perks
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-6 grid sm:grid-cols-3 gap-6"
          >
            {PRIZES.map((p, i) => (
              <motion.div
                key={i}
                variants={card}
                className="rounded-2xl border p-6 bg-gradient-to-br from-white to-emerald-50/40"
              >
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <FaTrophy /> {p.place}
                </div>
                <div className="text-2xl font-bold mt-1">{p.amt}</div>
                <div className="text-gray-600 mt-1 text-sm">{p.extra}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.p {...fade} className="mt-4 text-sm text-gray-600">
            Plus: certificates, swag, fast-track interviews, and potential pilot
            with Hostro/partners.
          </motion.p>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <motion.h2 {...fade} className="text-2xl md:text-3xl font-semibold">
            Sample schedule
          </motion.h2>
          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            <motion.div
              variants={card}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-80px' }}
              className="rounded-2xl border p-6"
            >
              <ul className="space-y-3">
                {SCHEDULE.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 inline-block rounded-full border px-2 py-0.5 text-[11px] text-gray-600">
                      {s.time}
                    </span>
                    <span className="text-gray-700">{s.label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Rules & judging */}
            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-80px' }}
              className="grid gap-6"
            >
              <motion.div variants={card} className="rounded-2xl border p-6">
                <h3 className="text-lg font-semibold">Rules</h3>
                <ul className="mt-3 grid gap-2 text-gray-700 text-sm">
                  {RULES.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={card} className="rounded-2xl border p-6">
                <h3 className="text-lg font-semibold">Judging criteria</h3>
                <ul className="mt-3 grid gap-2 text-gray-700 text-sm">
                  {JUDGING.map((j, i) => (
                    <li key={i}>• {j}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <motion.h2 {...fade} className="text-2xl md:text-3xl font-semibold">
            Partners
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {PARTNERS.map((p, i) => (
              <motion.div
                key={i}
                variants={card}
                className="rounded-2xl border p-4 text-center hover:shadow-sm transition-shadow"
              >
                <div className="mx-auto h-10 w-10 grid place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                  <FaHandshake />
                </div>
                <div className="mt-2 text-sm font-medium">{p.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={card}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            className="rounded-3xl border p-6 md:p-8 bg-gradient-to-br from-white to-emerald-50/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">
                Ready to light it up?
              </h3>
              <p className="mt-1 text-gray-600">
                Apply with your team or solo — we’ll help you find teammates.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/sparks/apply"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
              >
                Apply to Sparks
              </Link>
              <Link
                href="/developers"
                className="px-5 py-2.5 rounded-xl border hover:border-emerald-600 hover:text-emerald-700 transition font-medium"
              >
                API & docs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
