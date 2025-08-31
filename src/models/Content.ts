import mongoose, { Schema, models, model } from 'mongoose'

export type ContentType = 'faq' | 'blog' | 'howitworks'

const contentSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['faq', 'blog', 'howitworks'],
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true }, // markdown / HTML / plain
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export type IContent = mongoose.InferSchemaType<typeof contentSchema>
export default models.Content || model('Content', contentSchema)
