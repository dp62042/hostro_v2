import mongoose, { Schema, models, model } from 'mongoose'

const platformSettings = new Schema(
  {
    defaultCommissionPct: { type: Number, default: 10 },
    paymentGateway: {
      provider: {
        type: String,
        enum: ['razorpay', 'stripe', 'none'],
        default: 'razorpay',
      },
      keyId: { type: String, default: '' },
      keySecret: { type: String, default: '' }, // store only if you really must; prefer env
    },
  },
  { timestamps: true }
)

export type IPlatformSettings = mongoose.InferSchemaType<
  typeof platformSettings
>
export default models.PlatformSettings ||
  model('PlatformSettings', platformSettings)
