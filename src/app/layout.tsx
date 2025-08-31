// src/app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css' // keep global CSS only at root

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: { default: 'Hostro', template: '%s | Hostro' },
  description:
    'PG & Co-living made simple — search, book, pay, and live better.',
  icons: {
    icon: [
      { url: '/favicon.webp' }, // fallback
      { url: '/icon.svg', type: 'image/svg+xml' }, // optional SVG
      { url: '/icon-192.png', sizes: '192x192' }, // optional
      { url: '/icon-512.png', sizes: '512x512' }, // optional
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
