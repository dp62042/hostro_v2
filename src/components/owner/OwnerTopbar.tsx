'use client'

import { MdMenu } from 'react-icons/md'

export default function OwnerTopbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 shadow">
      <div className="flex items-center gap-2">
        <button className="md:hidden" onClick={onMenu}>
          <MdMenu size={24} />
        </button>
        <h1 className="text-lg font-semibold">Owner Dashboard</h1>
      </div>
      <div className="text-sm text-gray-600">Manage properties & tenants</div>
    </header>
  )
}
