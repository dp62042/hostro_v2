import mongoose, { Schema, models, model } from 'mongoose'
import bcrypt from 'bcryptjs'

export type Role = 'superadmin' | 'admin' | 'owner' | 'student'

export interface IUser extends mongoose.Document {
  name: string
  email: string
  password: string
  role: Role
  phone?: string
  isActive: boolean
  avatarUrl?: string
  address?: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    pincode?: string
  }
  comparePassword(candidate: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6, select: false },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'owner', 'student'],
      default: 'student',
      index: true,
    },
    phone: String,
    isActive: { type: Boolean, default: true },
    avatarUrl: String,
    address: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      pincode: String,
    },
  },
  { timestamps: true }
)

UserSchema.pre('save', async function (next) {
  const user = this as IUser
  if (!user.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  next()
})

UserSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password)
}

export default models.User || model<IUser>('User', UserSchema)
