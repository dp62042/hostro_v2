'use client'

import { JSX, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaUtensils,
  FaBroom,
  FaTools,
  FaWifi,
  FaShuttleVan,
  FaShieldAlt,
  FaCheckCircle,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaClock,
} from 'react-icons/fa'

type VendorCategory =
  | 'Tiffin/Meals'
  | 'Laundry'
  | 'Housekeeping'
  | 'Maintenance'
  | 'Internet/Wi-Fi'
  | 'Transport'

const CATEGORIES: {
  label: VendorCategory
  icon: JSX.Element
  blurb: string
}[] = [
  {
    label: 'Tiffin/Meals',
    icon: <FaUtensils className="text-emerald-600 text-3xl" />,
    blurb: 'Daily/weekly plans, veg/non-veg, calorie options, hygiene logs.',
  },
  {
    label: 'Laundry',
    icon: <FaBroom className="text-emerald-600 text-3xl" />,
    blurb: 'Wash, fold, iron, pickup/drop, 24–48h turnaround SLAs.',
  },
  {
    label: 'Housekeeping',
    icon: <FaTools className="text-emerald-600 text-3xl" />,
    blurb: 'Room/common-area cleaning with checklists and audits.',
  },
  {
    label: 'Maintenance',
    icon: <FaTools className="text-emerald-600 text-3xl" />,
    blurb: 'Electrician, plumber, carpenter on scheduled/on-demand basis.',
  },
  {
    label: 'Internet/Wi-Fi',
    icon: <FaWifi className="text-emerald-600 text-3xl" />,
    blurb: 'High-uptime broadband with support and usage analytics.',
  },
  {
    label: 'Transport',
    icon: <FaShuttleVan className="text-emerald-600 text-3xl" />,
    blurb: 'Daily shuttles, airport/rail pickup, verified drivers.',
  },
]

export default function VendorsPage() {
  const [active, setActive] = useState<VendorCategory>('Tiffin/Meals')

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <ValueProps />
      <CategoryTabs active={active} setActive={setActive} />
      <CategoryShowcase active={active} />
      <OnboardingSteps />
      <Requirements />
      <VendorApplyForm />
      <FAQ />
      <CTA />
    </div>
  )
}

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 md:p-12 shadow"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-emerald-700">
              Partner with Hostro — Vendors
            </h1>
            <p className="mt-3 text-gray-600">
              Grow your business by serving verified PGs, co-living spaces, and
              student communities. Transparent payouts, SLAs, and a steady
              pipeline of orders.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge icon={<FaShieldAlt />} text="Verified payments" />
              <Badge icon={<FaClock />} text="On-time SLAs" />
              <Badge icon={<FaCheckCircle />} text="Standardized QC" />
            </div>
          </div>
          <motion.a
            href="#apply"
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700"
          >
            Apply as Vendor
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}

function Badge({ icon, text }: { icon: JSX.Element; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm">
      {icon}
      {text}
    </span>
  )
}

function ValueProps() {
  const items = [
    {
      title: 'Consistent Demand',
      desc: 'Access aggregated demand from Hostro PGs & colleges.',
    },
    {
      title: 'Fast Payouts',
      desc: 'Weekly settlements with invoices and dashboards.',
    },
    {
      title: 'Smart Routing',
      desc: 'Orders auto-routed by location, capacity, and SLA score.',
    },
  ]
  return (
    <section className="max-w-6xl mx-auto px-4 mt-10 grid md:grid-cols-3 gap-6">
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="bg-white rounded-2xl p-6 shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900">{it.title}</h3>
          <p className="text-gray-600 mt-2">{it.desc}</p>
        </motion.div>
      ))}
    </section>
  )
}

function CategoryTabs({
  active,
  setActive,
}: {
  active: VendorCategory
  setActive: (c: VendorCategory) => void
}) {
  return (
    <section className="max-w-6xl mx-auto px-4 mt-10">
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((c) => {
          const selected = c.label === active
          return (
            <button
              key={c.label}
              onClick={() => setActive(c.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap border transition ${
                selected
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {c.icon}
              <span className="text-sm font-medium">{c.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function CategoryShowcase({ active }: { active: VendorCategory }) {
  const copy = useMemo(() => {
    switch (active) {
      case 'Tiffin/Meals':
        return {
          bullets: [
            'Menu planning & calorie tags',
            'FSSAI certificate',
            'Daily hygiene checklist',
          ],
          icon: <FaUtensils className="text-emerald-600 text-5xl" />,
        }
      case 'Laundry':
        return {
          bullets: ['Pickup/drop routes', 'Damage policy', '24–48h SLA proof'],
          icon: <FaBroom className="text-emerald-600 text-5xl" />,
        }
      case 'Housekeeping':
        return {
          bullets: [
            'Staff background verification',
            'Material list & MSDS',
            'Weekly audit format',
          ],
          icon: <FaTools className="text-emerald-600 text-5xl" />,
        }
      case 'Maintenance':
        return {
          bullets: [
            'Certified technicians',
            'Rate card & emergency fee',
            'Spare parts warranty',
          ],
          icon: <FaTools className="text-emerald-600 text-5xl" />,
        }
      case 'Internet/Wi-Fi':
        return {
          bullets: [
            'Uptime > 99%',
            'Support within 4 hours',
            'Bandwidth reporting',
          ],
          icon: <FaWifi className="text-emerald-600 text-5xl" />,
        }
      case 'Transport':
        return {
          bullets: [
            'Commercial permits',
            'Driver KYC & duty logs',
            'Real-time tracking',
          ],
          icon: <FaShuttleVan className="text-emerald-600 text-5xl" />,
        }
    }
  }, [active])

  return (
    <section className="max-w-6xl mx-auto px-4 mt-8">
      <div className="bg-white rounded-2xl p-8 shadow">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div>{copy.icon}</div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-gray-900">
              Standards for {active}
            </h3>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2">
              {copy.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-gray-700">
                  <FaCheckCircle className="mt-1 text-emerald-600" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function OnboardingSteps() {
  const steps = [
    { title: 'Apply', desc: 'Submit details & docs for KYC review.' },
    {
      title: 'Verify',
      desc: 'Background, licenses, and SLA capability check.',
    },
    { title: 'Pilot', desc: 'Trial orders to validate quality & timing.' },
    { title: 'Go Live', desc: 'Start receiving routed orders & payouts.' },
  ]
  return (
    <section className="max-w-6xl mx-auto px-4 mt-10">
      <div className="bg-white rounded-2xl p-8 shadow">
        <h3 className="text-2xl font-semibold text-gray-900">
          Vendor Onboarding — How it works
        </h3>
        <div className="mt-6 grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div className="font-semibold">{s.title}</div>
              </div>
              <p className="text-gray-600 mt-2 ml-12">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Requirements() {
  const items = [
    {
      title: 'Business & Identity',
      points: ['GST/PAN', 'Business address', 'Owner/Director ID proof'],
    },
    {
      title: 'Compliance',
      points: [
        'Local permits as applicable',
        'FSSAI (for Tiffin/Meals)',
        'Vehicle permits (for Transport)',
      ],
    },
    {
      title: 'Payments',
      points: ['Bank account & cancelled cheque', 'UPI ID (optional)'],
    },
    {
      title: 'Service Level',
      points: [
        'City/locality coverage',
        'Operating hours',
        'Emergency response plan',
      ],
    },
  ]
  return (
    <section className="max-w-6xl mx-auto px-4 mt-10 mb-8">
      <div className="bg-white rounded-2xl p-8 shadow">
        <h3 className="text-2xl font-semibold text-gray-900">
          Documents & Requirements
        </h3>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((card) => (
            <div key={card.title} className="border rounded-xl p-5">
              <div className="font-semibold text-gray-900">{card.title}</div>
              <ul className="mt-3 space-y-1 text-gray-600">
                {card.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <FaCheckCircle className="mt-1 text-emerald-600" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VendorApplyForm() {
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string }>()
  const [form, setForm] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: 'Tiffin/Meals' as VendorCategory,
    city: '',
    serviceAreas: '',
    gstNumber: '',
    panNumber: '',
    bankAccount: '',
    ifsc: '',
    pricingNotes: '',
    slaHours: '',
    website: '',
    notes: '',
    agree: false,
  })

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setToast(undefined)

    // Minimal front-end validation
    if (!form.businessName || !form.contactPerson) {
      return setToast({ type: 'err', msg: 'Enter business & contact person.' })
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return setToast({ type: 'err', msg: 'Enter a valid email.' })
    }
    if (!/^\d{10}$/.test(form.phone)) {
      return setToast({ type: 'err', msg: 'Phone must be 10 digits.' })
    }
    if (!form.agree) {
      return setToast({ type: 'err', msg: 'Please accept terms & privacy.' })
    }

    setLoading(true)
    try {
      const res = await fetch('/api/vendors/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // If you store token: add it here
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...form,
          serviceAreas: form.serviceAreas
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        }),
        credentials: 'include',
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || 'Failed to submit application')
      }

      setToast({
        type: 'ok',
        msg: 'Application submitted! We’ll reach out soon.',
      })
      // reset
      setForm({
        businessName: '',
        contactPerson: '',
        email: '',
        phone: '',
        category: 'Tiffin/Meals',
        city: '',
        serviceAreas: '',
        gstNumber: '',
        panNumber: '',
        bankAccount: '',
        ifsc: '',
        pricingNotes: '',
        slaHours: '',
        website: '',
        notes: '',
        agree: false,
      })
    } catch (err: any) {
      setToast({ type: 'err', msg: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="apply" className="max-w-6xl mx-auto px-4 mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 shadow grid md:grid-cols-2 gap-6"
      >
        <div className="md:col-span-2">
          <h3 className="text-2xl font-semibold text-gray-900">
            Apply as a Vendor
          </h3>
          <p className="text-gray-600 mt-1">
            Fill your details — our team will verify and get you onboarded
            quickly.
          </p>
        </div>

        <TextInput
          label="Business Name"
          value={form.businessName}
          onChange={(v) => update('businessName', v)}
          icon={<FaCheckCircle className="text-emerald-600" />}
          required
        />
        <TextInput
          label="Contact Person"
          value={form.contactPerson}
          onChange={(v) => update('contactPerson', v)}
          required
        />

        <TextInput
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => update('email', v)}
          icon={<FaPhoneAlt className="opacity-0" />}
          required
        />
        <TextInput
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(v) => update('phone', v)}
          pattern="^\d{10}$"
          placeholder="10-digit mobile"
          required
        />

        <SelectInput
          label="Category"
          value={form.category}
          onChange={(v) => update('category', v as VendorCategory)}
          options={CATEGORIES.map((c) => c.label)}
        />
        <TextInput
          label="City / Base Location"
          value={form.city}
          onChange={(v) => update('city', v)}
          icon={<FaMapMarkerAlt className="text-emerald-600" />}
        />

        <TextInput
          label="Service Areas"
          value={form.serviceAreas}
          onChange={(v) => update('serviceAreas', v)}
          placeholder="Comma-separated localities (e.g., Adarsh Nagar, Malviya Nagar)"
        />
        <TextInput
          label="GST Number"
          value={form.gstNumber}
          onChange={(v) => update('gstNumber', v)}
          placeholder="(Optional for sole-props if not applicable)"
        />

        <TextInput
          label="PAN"
          value={form.panNumber}
          onChange={(v) => update('panNumber', v)}
        />
        <TextInput
          label="Bank Account"
          value={form.bankAccount}
          onChange={(v) => update('bankAccount', v)}
        />
        <TextInput
          label="IFSC"
          value={form.ifsc}
          onChange={(v) => update('ifsc', v)}
        />
        <TextInput
          label="Pricing Notes"
          value={form.pricingNotes}
          onChange={(v) => update('pricingNotes', v)}
          icon={<FaRupeeSign className="text-emerald-600" />}
          placeholder="Share base rates or attach later"
        />
        <TextInput
          label="SLA (hours)"
          value={form.slaHours}
          onChange={(v) => update('slaHours', v)}
          placeholder="e.g., 24, 48"
        />
        <TextInput
          label="Website / Profile (optional)"
          value={form.website}
          onChange={(v) => update('website', v)}
          placeholder="https://"
        />

        <TextArea
          label="Notes"
          value={form.notes}
          onChange={(v) => update('notes', v)}
          placeholder="Anything else we should know?"
          className="md:col-span-2"
        />

        <label className="md:col-span-2 flex items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            className="mt-1"
            checked={form.agree}
            onChange={(e) => update('agree', e.target.checked)}
          />
          <span>
            I agree to Hostro’s Terms & Privacy and confirm all information is
            accurate.
          </span>
        </label>

        {toast && (
          <div
            className={`md:col-span-2 rounded-lg p-3 ${
              toast.type === 'ok'
                ? 'bg-emerald-50 text-emerald-800'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {toast.msg}
          </div>
        )}

        <div className="md:col-span-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </motion.button>
        </div>
      </form>
    </section>
  )
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  pattern,
  icon,
  className,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  pattern?: string
  icon?: JSX.Element
  className?: string
}) {
  return (
    <label className={`block ${className || ''}`}>
      <span className="text-sm font-medium text-gray-800">{label}</span>
      <div className="mt-1.5 flex items-center gap-2 rounded-lg border bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
        {icon}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          className="w-full outline-none text-gray-900 placeholder-gray-400"
        />
      </div>
    </label>
  )
}

function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-800">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  className,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <label className={`block ${className || ''}`}>
      <span className="text-sm font-medium text-gray-800">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="mt-1.5 w-full rounded-lg border bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </label>
  )
}

function FAQ() {
  const faqs = [
    {
      q: 'How are payouts processed?',
      a: 'Weekly settlements to your registered bank account with invoice and order ledger.',
    },
    {
      q: 'Do I need GST to start?',
      a: 'Preferred, but small vendors without GST can apply — compliance depends on category and state rules.',
    },
    {
      q: 'Who handles customer support?',
      a: 'Hostro is first line of support; category-specific issues may be routed to you via the vendor portal.',
    },
  ]
  return (
    <section className="max-w-6xl mx-auto px-4 mt-10">
      <div className="bg-white rounded-2xl p-8 shadow">
        <h3 className="text-2xl font-semibold text-gray-900">FAQs</h3>
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group border rounded-lg p-4 open:bg-emerald-50"
            >
              <summary className="cursor-pointer font-medium text-gray-900">
                {f.q}
              </summary>
              <p className="mt-2 text-gray-700">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-4 my-12">
      <div className="bg-emerald-600 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold">Ready to grow with Hostro?</h3>
          <p className="text-emerald-50 mt-1">
            Join our verified vendor network and start receiving orders.
          </p>
        </div>
        <a
          href="#apply"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-emerald-700 font-semibold shadow hover:bg-emerald-50"
        >
          Apply Now
        </a>
      </div>
    </section>
  )
}
