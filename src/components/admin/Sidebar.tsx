'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  MdDashboard,
  MdPeople,
  MdReport,
  MdSettings,
  MdBarChart,
} from 'react-icons/md'
import { FaListCheck, FaHandshake } from 'react-icons/fa6'

const menuItems = [
  { name: 'Dashboard', icon: MdDashboard, href: '/admin' },
  { name: 'Bookings', icon: FaListCheck, href: '/admin/bookings' },
  { name: 'Complaints', icon: MdReport, href: '/admin/complaints' },
  { name: 'Approvals', icon: FaHandshake, href: '/admin/approvals' },
  { name: 'Users', icon: MdPeople, href: '/admin/users' },
  { name: 'Analytics', icon: MdBarChart, href: '/admin/analytics' },
  { name: 'Settings', icon: MdSettings, href: '/admin/settings' },
]

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (v: boolean) => void
}) {
  const pathname = usePathname()

  return (
    <aside
      className={`fixed z-40 bg-white shadow-lg h-full w-64 p-4 md:static md:translate-x-0 transform ${
        open ? 'translate-x-0' : '-translate-x-full'
      } transition-transform`}
    >
      <h2 className="text-2xl font-bold text-emerald-600 mb-6">Hostro Admin</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} onClick={() => setOpen(false)}>
            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition ${
                pathname === item.href
                  ? 'bg-emerald-100 text-emerald-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
