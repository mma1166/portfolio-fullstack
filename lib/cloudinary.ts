import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'dfrdhvqct',
    api_key: '668331239656894',
    api_secret: '1QDLjzeLOfXO3Y4Vi1KwnKCHWZU',
    secure: true
})

export async function uploadImage(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`

    try {
        const result = await cloudinary.uploader.upload(base64Data, {
            folder: 'portfolio',
            resource_type: 'auto'
        })
        return result.secure_url
    } catch (error) {
        console.error('Cloudinary upload error:', error)
        throw error
    }
}

export default cloudinary
