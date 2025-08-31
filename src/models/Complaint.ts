import mongoose, { Schema, models, model } from 'mongoose'

export type ComplaintStatus =
  | 'open'
  | 'in_progress'
  | 'escalated'
  | 'resolved'
  | 'closed'

const complaintSchema = new Schema(
  {
    raisedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    pg: { type: Schema.Types.ObjectId, ref: 'PG', index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'escalated', 'resolved', 'closed'],
      default: 'open',
      index: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    assignedToRole: {
      type: String,
      enum: ['owner', 'admin', 'superadmin'],
      default: 'owner',
    },
    comments: [
      {
        by: { type: Schema.Types.ObjectId, ref: 'User' },
        note: String,
        at: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
)

export type IComplaint = mongoose.InferSchemaType<typeof complaintSchema>
export default models.Complaint || model('Complaint', complaintSchema)
