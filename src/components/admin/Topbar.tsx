'use client'

import { MdMenu, MdLogout } from 'react-icons/md'

export default function Topbar({
  setSidebarOpen,
}: {
  setSidebarOpen: (v: boolean) => void
}) {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
      <div className="flex items-center gap-2">
        <button onClick={() => setSidebarOpen(true)} className="md:hidden">
          <MdMenu size={24} />
        </button>
        <h1 className="font-bold text-lg">Admin Panel</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden md:block">Admin Name</span>
        <button className="text-red-500 hover:text-red-600">
          <MdLogout size={22} />
        </button>
      </div>
    </header>
  )
}
