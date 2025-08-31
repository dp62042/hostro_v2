import 'server-only'
import mongoose from 'mongoose'

// TS global cache
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: Promise<typeof mongoose> | undefined
}

export async function dbConnect() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error(
      'MONGODB_URI is missing. Add it to .env.local and restart dev server.'
    )
    throw new Error('MONGODB_URI is not set')
  }

  if (!global._mongooseConn) {
    mongoose.set('strictQuery', true)
    global._mongooseConn = mongoose.connect(uri).then((m) => m)
  }
  return global._mongooseConn
}
