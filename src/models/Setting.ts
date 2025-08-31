// src/models/Setting.ts
import mongoose, { Schema, models, model } from 'mongoose'

/**
 * Global platform settings (singleton document recommended).
 * Stores commission %, payment gateway config, etc.
 */

const PaymentProviders = ['razorpay', 'stripe', 'none'] as const
export type PaymentProvider = (typeof PaymentProviders)[number]

const SettingSchema = new Schema(
  {
    defaultCommissionPct: { type: Number, default: 10 },

    paymentGateway: {
      provider: {
        type: String,
        enum: PaymentProviders,
        default: 'razorpay',
      },
      keyId: { type: String, default: '' },
      // Prefer keeping secrets in env in production.
      keySecret: { type: String, default: '' },
    },
  },
  { timestamps: true }
)

export type ISetting = mongoose.InferSchemaType<typeof SettingSchema>

export default (models.Setting as mongoose.Model<ISetting>) ||
  model<ISetting>('Setting', SettingSchema)
