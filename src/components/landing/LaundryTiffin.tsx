'use client'

import Image from 'next/image'
import Link from 'next/link'

const laundryImages = [
  '/LaundryTiffin/h1.jpg',
  '/LaundryTiffin/h3.jpg',
  '/LaundryTiffin/h4.jpg',
]
const tiffinImages = [
  '/LaundryTiffin/h2.png',
  '/LaundryTiffin/h5.jpg',
  '/LaundryTiffin/h6.jpg',
]

export default function LaundryTiffin() {
  return (
    <section className="py-14 bg-white text-gray-700">
      <div className="container mx-auto px-4 space-y-14">
        {/* Laundry */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div>
            <p className="text-sm font-medium text-emerald-600">Convenience</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold">
              Laundry Services
            </h2>
            <p className="mt-3 text-gray-600">
              Schedule pickups, track status, and get neatly folded clothes
              delivered to your PG. Affordable weekly plans with express
              options.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-700">
              <li>• Doorstep pickup & delivery</li>
              <li>• Per-kg & subscription plans</li>
              <li>• Express 24h turnaround</li>
              <li>• Stain care & ironing</li>
            </ul>
            <div className="mt-5 flex gap-3">
              <Link
                href="/services/laundry"
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                View plans
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg border hover:border-emerald-600 hover:text-emerald-700 transition"
              >
                Talk to us
              </Link>
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            {/* Top Row */}
            {laundryImages.slice(0, 2).map((src, i) => (
              <div
                key={i}
                className="relative w-full h-40 rounded-lg overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Laundry service ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 50vw, 200px"
                  loading="lazy"
                />
              </div>
            ))}
            {/* Bottom Full-width */}
            <div className="relative col-span-2 h-40 rounded-lg overflow-hidden">
              <Image
                src={laundryImages[2]}
                alt="Laundry service 3"
                fill
                className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 400px"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Tiffin */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Images */}
          <div className="order-2 lg:order-1 grid grid-cols-2 grid-rows-2 gap-3">
            {/* Top Row */}
            {tiffinImages.slice(0, 2).map((src, i) => (
              <div
                key={i}
                className="relative w-full h-40 rounded-lg overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Tiffin service ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 50vw, 200px"
                  loading="lazy"
                />
              </div>
            ))}
            {/* Bottom Full-width */}
            <div className="relative col-span-2 h-40 rounded-lg overflow-hidden">
              <Image
                src={tiffinImages[2]}
                alt="Tiffin service 3"
                fill
                className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 400px"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="text-sm font-medium text-emerald-600">Daily Meals</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold">
              Tiffin / Mess
            </h2>
            <p className="mt-3 text-gray-600">
              Fresh home-style food delivered to your PG. Choose veg/non-veg,
              customize spice levels, and pause anytime during exams or travel.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-700">
              <li>• Balanced weekly menus</li>
              <li>• Lunch & dinner plans</li>
              <li>• Veg / Non-veg options</li>
              <li>• Pause / resume anytime</li>
            </ul>
            <div className="mt-5 flex gap-3">
              <Link
                href="/services/tiffin"
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                Browse menus
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg border hover:border-emerald-600 hover:text-emerald-700 transition"
              >
                Partner with us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
