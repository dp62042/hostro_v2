import mongoose, { Schema, models, model } from 'mongoose'

export type PGStatus = 'pending' | 'approved' | 'rejected'

const Amenity = new Schema(
  {
    key: { type: String, required: true }, // wifi, ac, laundry, etc.
    value: { type: Schema.Types.Mixed }, // boolean/number/string
  },
  { _id: false }
)

const Address = new Schema(
  {
    line1: { type: String, required: true, trim: true },
    line2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    lat: Number,
    lng: Number,
  },
  { _id: false }
)

const RoomType = new Schema(
  {
    type: { type: String, required: true }, // single, double, triple
    price: { type: Number, required: true },
    totalBeds: { type: Number, required: true },
    occupiedBeds: { type: Number, default: 0 },
  },
  { _id: false }
)

const pgSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    images: [{ type: String }],
    address: { type: Address, required: true },
    amenities: [Amenity],
    roomTypes: [RoomType],
    gender: {
      type: String,
      enum: ['male', 'female', 'unisex'],
      default: 'unisex',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true,
    },
    isActive: { type: Boolean, default: true },
    commissionPct: { type: Number, default: 10 }, // platform commission
  },
  { timestamps: true }
)

export type IPG = mongoose.InferSchemaType<typeof pgSchema>
export default models.PG || model('PG', pgSchema)
