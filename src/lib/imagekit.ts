import ImageKit from 'imagekit'

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY

if (!urlEndpoint || !publicKey || !privateKey) {
  console.warn(
    'ImageKit env not fully set; uploads/signing will fail until configured.'
  )
}

export const imagekit = new ImageKit({
  urlEndpoint: urlEndpoint || '',
  publicKey: publicKey || '',
  privateKey: privateKey || '',
})
