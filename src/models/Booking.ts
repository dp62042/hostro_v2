import mongoose, { Schema, models, model } from 'mongoose'

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

const bookingSchema = new Schema(
  {
    pg: { type: Schema.Types.ObjectId, ref: 'PG', required: true, index: true },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    roomType: { type: String, required: true },
    startDate: { type: Date, required: true },
    months: { type: Number, default: 1 },
    amount: { type: Number, required: true }, // total upfront or first month
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    paymentId: { type: String }, // gateway payment/order id
  },
  { timestamps: true }
)

export type IBooking = mongoose.InferSchemaType<typeof bookingSchema>
export default models.Booking || model('Booking', bookingSchema)
