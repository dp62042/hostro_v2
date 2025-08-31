'use client'

import {
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaRupeeSign,
} from 'react-icons/fa'

export type PG = {
  _id: string
  name: string
  city: string
  address?: string
  price: number
  gender?: 'boys' | 'girls' | 'unisex'
  photos?: string[]
  isFavourite?: boolean
  amenities?: string[]
}

export default function PGCard({
  item,
  onFav,
  onView,
  onBook,
}: {
  item: PG
  onFav?: (id: string, fav: boolean) => void
  onView?: (id: string) => void
  onBook?: (id: string) => void
}) {
  const cover = item.photos?.[0] || '/placeholder-pg.jpg'
  return (
    <div className="group overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt={item.name}
          className="h-40 w-full object-cover transition group-hover:scale-105"
        />
        <button
          className="absolute right-2 top-2 rounded-full bg-white/90 p-2 backdrop-blur hover:bg-white"
          onClick={() => onFav?.(item._id, !item.isFavourite)}
          aria-label="Toggle favourite"
        >
          {item.isFavourite ? (
            <FaHeart className="text-emerald-600" />
          ) : (
            <FaRegHeart />
          )}
        </button>
      </div>
      <div className="space-y-2 p-3">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 font-semibold">{item.name}</h3>
          <div className="inline-flex items-center gap-1 text-emerald-700">
            <FaRupeeSign /> {item.price.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <FaMapMarkerAlt /> {item.city}
          {item.address ? ` • ${item.address}` : ''}
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
            onClick={() => onView?.(item._id)}
          >
            View
          </button>
          <button
            className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-700"
            onClick={() => onBook?.(item._id)}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  )
}
