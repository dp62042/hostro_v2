'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaBriefcase,
  FaCheckCircle,
} from 'react-icons/fa'
import { HiOutlineLightningBolt } from 'react-icons/hi'

type Job = {
  slug: string
  title: string
  dept:
    | 'Engineering'
    | 'Design'
    | 'Marketing'
    | 'Operations'
    | 'Support'
    | 'Campus'
  location: 'Jaipur' | 'Remote' | 'Hybrid'
  type: 'Full-time' | 'Internship' | 'Contract'
  exp: string
  summary: string
}

const JOBS: Job[] = [
  {
    slug: 'frontend-engineer-intern',
    title: 'Frontend Engineer Intern (Next.js + Tailwind)',
    dept: 'Engineering',
    location: 'Remote',
    type: 'Internship',
    exp: '0–1 yr',
    summary:
      'Build fast, accessible UI with Next.js (App Router), TypeScript, and Tailwind.',
  },
  {
    slug: 'backend-engineer-node',
    title: 'Backend Engineer (Node.js + MongoDB)',
    dept: 'Engineering',
    location: 'Hybrid',
    type: 'Full-time',
    exp: '2–4 yrs',
    summary:
      'Design scalable APIs, payments, and reporting for the Hostro platform.',
  },
  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    dept: 'Design',
    location: 'Remote',
    type: 'Contract',
    exp: '1–3 yrs',
    summary: 'Craft clean, conversion-friendly flows and component libraries.',
  },
  {
    slug: 'marketing-intern',
    title: 'Marketing Intern (Growth + Content)',
    dept: 'Marketing',
    location: 'Jaipur',
    type: 'Internship',
    exp: '0–1 yr',
    summary:
      'Run campus campaigns, reels, and partner collabs for Hostro Connect+.',
  },
  {
    slug: 'operations-manager',
    title: 'Operations Manager (PG Onboarding)',
    dept: 'Operations',
    location: 'Jaipur',
    type: 'Full-time',
    exp: '3–5 yrs',
    summary: 'Own PG onboarding, vendor ops, SLAs, and owner success.',
  },
  {
    slug: 'customer-support-associate',
    title: 'Customer Support Associate (Night Shift)',
    dept: 'Support',
    location: 'Remote',
    type: 'Full-time',
    exp: '1–2 yrs',
    summary:
      'Resolve tickets fast via chat/WhatsApp; empathy + clarity required.',
  },
  {
    slug: 'campus-ambassador',
    title: 'Campus Ambassador',
    dept: 'Campus',
    location: 'Remote',
    type: 'Internship',
    exp: '0–1 yr',
    summary: 'Lead Hostro Sparks + Connect+ at your college; earn incentives.',
  },
  {
    slug: 'data-analyst-intern',
    title: 'Data Analyst Intern',
    dept: 'Engineering',
    location: 'Remote',
    type: 'Internship',
    exp: '0–1 yr',
    summary: 'Build dashboards, funnels, and ops insights using SQL + Python.',
  },
]

// simple fade + stagger
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function CareersPage() {
  const [query, setQuery] = useState('')
  const [dept, setDept] = useState<string>('All')
  const [location, setLocation] = useState<string>('All')
  const [type, setType] = useState<string>('All')

  const depts = ['All', ...Array.from(new Set(JOBS.map((j) => j.dept)))]
  const locations = ['All', ...Array.from(new Set(JOBS.map((j) => j.location)))]
  const types = ['All', ...Array.from(new Set(JOBS.map((j) => j.type)))]

  const filtered = useMemo(() => {
    return JOBS.filter((j) => {
      const q = query.trim().toLowerCase()
      const matchesQ =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.summary.toLowerCase().includes(q) ||
        j.dept.toLowerCase().includes(q)
      const matchesDept = dept === 'All' || j.dept === (dept as Job['dept'])
      const matchesLoc =
        location === 'All' || j.location === (location as Job['location'])
      const matchesType = type === 'All' || j.type === (type as Job['type'])
      return matchesQ && matchesDept && matchesLoc && matchesType
    })
  }, [query, dept, location, type])

  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-emerald-500/15 blur-3xl"
        />
        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-10">
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-sm font-semibold tracking-wide text-emerald-600 uppercase">
              Join Hostro
            </p>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
              Build the future of{' '}
              <span className="text-emerald-600">PG & Co-living</span>
            </h1>
            <p className="mt-4 text-gray-600 md:text-lg">
              We&apos;re a lean, fast team shipping real impact—search,
              bookings, payments, and support for thousands.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-gray-600">
              <HiOutlineLightningBolt className="text-emerald-600" />
              Roles across Engineering, Design, Ops, Marketing & Support
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="grid gap-3 md:grid-cols-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search roles, skills, keywords..."
              className="rounded-xl border px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="rounded-xl border px-4 py-2.5"
            >
              {depts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-xl border px-4 py-2.5"
            >
              {locations.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-xl border px-4 py-2.5"
            >
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="mt-3 text-sm text-gray-500">
            {filtered.length} role(s) found
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2"
          >
            {filtered.map((job) => (
              <motion.div
                key={job.slug}
                variants={item}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      {job.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <span className="inline-flex items-center gap-1">
                        <FaUsers />
                        {job.dept}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <FaMapMarkerAlt />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <FaBriefcase />
                        {job.type}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <FaClock />
                        {job.exp}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-gray-600">{job.summary}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/careers/${job.slug}`}
                    className="px-4 py-2 rounded-xl border hover:border-emerald-600 hover:text-emerald-700 transition text-sm font-medium"
                  >
                    View details
                  </Link>
                  <Link
                    href={`/careers/apply?role=${job.slug}`}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition text-sm font-medium"
                  >
                    Apply now
                  </Link>
                </div>

                {/* underline sweep */}
                <span className="mt-4 block h-[2px] w-0 bg-emerald-600 transition-all duration-300 group-hover:w-24" />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="mt-6 rounded-2xl border p-6 text-center text-gray-600">
              No roles match your filters. Try clearing them or check back soon.
            </div>
          )}
        </div>
      </section>

      {/* PERKS & BENEFITS */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Perks & benefits
          </h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Flexible work (Remote/Hybrid by role)',
              'Rapid growth & real product ownership',
              'Learning budget & mentorship',
              'Mac/Top-tier gear (role-based)',
              'Health & wellness stipend',
              'Performance bonuses',
            ].map((txt, i) => (
              <motion.div
                key={i}
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="rounded-2xl border p-5 flex items-start gap-3"
              >
                <FaCheckCircle className="text-emerald-600 mt-1" />
                <p className="text-gray-700">{txt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Our hiring process
          </h2>
          <div className="mt-6 grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Apply',
                text: 'Share your resume, portfolio, and links.',
              },
              {
                step: '02',
                title: 'Intro',
                text: 'Quick chat about fit, role, and timeline.',
              },
              {
                step: '03',
                title: 'Task/Tech',
                text: 'A small assignment or tech round.',
              },
              {
                step: '04',
                title: 'Offer',
                text: 'We finalize details and onboard you.',
              },
            ].map((s) => (
              <motion.div
                key={s.step}
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="rounded-2xl border p-6"
              >
                <div className="text-sm font-semibold text-emerald-700">
                  {s.step}
                </div>
                <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-gray-600">{s.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/careers/apply"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
            >
              Open application
            </Link>
            <Link
              href="/team"
              className="px-5 py-2.5 rounded-xl border border-gray-200 hover:border-emerald-600 hover:text-emerald-700 transition font-medium"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
