import React from 'react'
import Home from '@/components/landing/Home'
import Features from '@/components/landing/Features'
import PgFilter from '@/components/landing/PgFilter'
import FeaturedPGS from '@/components/landing/FeaturedPGS'
import LaundryTiffin from '@/components/landing/LaundryTiffin'
import Partners from '@/components/landing/Partners'

const page = () => {
  return (
    <main>
      <Home />
      <FeaturedPGS />
      <Features />
      <PgFilter />
      <LaundryTiffin />
      <Partners />
    </main>
  )
}

export default page
