'use client'

import { motion } from 'framer-motion'
import {
  FaHandshake,
  FaUniversity,
  FaUsers,
  FaGift,
  FaLaptopCode,
} from 'react-icons/fa'

export default function ConnectPlusPage() {
  const benefits = [
    {
      icon: <FaHandshake className="text-emerald-600 text-4xl" />,
      title: 'Exclusive College Partnerships',
      desc: 'Tie-ups with universities & colleges to offer benefits to students and PG owners.',
    },
    {
      icon: <FaGift className="text-emerald-600 text-4xl" />,
      title: 'Special Discounts',
      desc: 'Exclusive PG booking discounts for partnered college students.',
    },
    {
      icon: <FaLaptopCode className="text-emerald-600 text-4xl" />,
      title: 'Hostro Sparks',
      desc: 'Hackathons, Ideathons, and events to showcase and nurture student talent.',
    },
    {
      icon: <FaUsers className="text-emerald-600 text-4xl" />,
      title: 'Student Community',
      desc: 'A single platform where all university students can connect & collaborate.',
    },
    {
      icon: <FaUniversity className="text-emerald-600 text-4xl" />,
      title: 'Internships & Jobs',
      desc: 'Opportunities through Hostro’s network for internships & placements.',
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center px-4">
        <motion.h1
          className="text-4xl font-bold text-emerald-700 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hostro Connect+
        </motion.h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Bridging students, PG owners, and universities together. Get exclusive
          benefits, networking opportunities, and career growth through Hostro
          Connect+.
        </p>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-6xl mx-auto mt-12 px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center px-4">
        <motion.h2
          className="text-2xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Join Hostro Connect+ Today
        </motion.h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Whether you’re a student, PG owner, or college representative, Hostro
          Connect+ has benefits tailored for you.
        </p>
        <motion.button
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-emerald-700 transition"
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </section>
    </div>
  )
}
