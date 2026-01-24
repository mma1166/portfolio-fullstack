import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                folder: 'portfolio',
                type: 'upload'
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error)
                    reject(error)
                } else {
                    // Force a clean URL to fix the 401 redirection error
                    const rawUrl = result?.secure_url || ''
                    const cleanUrl = rawUrl.replace(/([^:])\/\//g, '$1/')
                    resolve(cleanUrl)
                }
            }
        ).end(buffer)
    })
}

export default cloudinary
