import mongoose, { Schema, models, model } from 'mongoose'

const campaignSchema = new Schema(
  {
    name: { type: String, required: true },
    channel: {
      type: String,
      enum: ['email', 'sms', 'whatsapp', 'social', 'ads'],
      default: 'social',
    },
    status: {
      type: String,
      enum: ['draft', 'running', 'paused', 'completed'],
      default: 'draft',
    },
    budget: { type: Number, default: 0 },
    startDate: Date,
    endDate: Date,
    target: { type: String, default: '' }, // owners/students/city=Jaipur etc.
    content: { type: String, default: '' },
    metrics: {
      impressions: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
      signups: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
)

export type ICampaign = mongoose.InferSchemaType<typeof campaignSchema>
export default models.Campaign || model('Campaign', campaignSchema)
