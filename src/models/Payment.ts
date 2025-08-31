import mongoose, { Schema, models, model } from 'mongoose'

export type PaymentStatus =
  | 'created'
  | 'authorized'
  | 'captured'
  | 'failed'
  | 'refunded'

const paymentSchema = new Schema(
  {
    booking: { type: Schema.Types.ObjectId, ref: 'Booking', index: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    gateway: { type: String, default: 'razorpay' },
    orderId: { type: String, index: true },
    paymentId: { type: String, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['created', 'authorized', 'captured', 'failed', 'refunded'],
      default: 'created',
    },
    meta: Schema.Types.Mixed,
  },
  { timestamps: true }
)

export type IPayment = mongoose.InferSchemaType<typeof paymentSchema>
export default models.Payment || model('Payment', paymentSchema)
