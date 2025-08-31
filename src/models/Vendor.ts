import mongoose, { Schema, models, model } from 'mongoose'

const contractSchema = new Schema(
  {
    title: String,
    startDate: Date,
    endDate: Date,
    terms: String, // markdown/plain
    fileUrl: String, // optional link to uploaded PDF
  },
  { _id: false }
)

const vendorSchema = new Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['cleaning', 'laundry', 'security', 'maintenance', 'food', 'other'],
      default: 'other',
    },
    contact: {
      person: String,
      email: String,
      phone: String,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'blacklisted'],
      default: 'pending',
      index: true,
    },
    documents: [{ label: String, url: String }],
    contracts: [contractSchema],
  },
  { timestamps: true }
)

export type IVendor = mongoose.InferSchemaType<typeof vendorSchema>
export default models.Vendor || model('Vendor', vendorSchema)
