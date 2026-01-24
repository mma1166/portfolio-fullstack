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

    const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')

    try {
        const options: any = {
            folder: 'portfolio',
            resource_type: isPDF ? 'raw' : 'auto',
            type: 'upload',
            access_mode: 'public'
        }

        // For PDFs, we use 'raw' to avoid 401 errors, 
        // but we MUST manually add the extension to the public_id so it's not "corrupted"
        if (isPDF) {
            const cleanName = file.name.replace(/\s+/g, '_')
            options.public_id = `${Date.now()}_${cleanName}`
        }

        const result = await cloudinary.uploader.upload(base64Data, options)
        return result.secure_url
    } catch (error) {
        console.error('Cloudinary upload error:', error)
        throw error
    }
}

export default cloudinary
