import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  async redirects() {
    return [
      { source: '/login', destination: '/auth/login', permanent: false },
      { source: '/register', destination: '/auth/register', permanent: false },
      {
        source: '/reset-password',
        destination: '/auth/reset-password',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io', // if you use ImageKit
      },
    ],
  },
}

export default nextConfig
