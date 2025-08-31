import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: { default: 'Hostro', template: '%s | Hostro' },
  description: 'Find verified PGs and co-living spaces with Hostro.',
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Nested layout: NO <html>/<body>, NO global CSS imports
  // Keep this lightweight—root layout handles Navbar/Footer.
  return <div className="bg-white">{children}</div>
}
