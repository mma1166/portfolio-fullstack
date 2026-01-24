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
        const result = await cloudinary.uploader.upload(base64Data, {
            folder: 'portfolio',
            resource_type: 'auto',
            type: 'upload',
            access_mode: 'public'
        })

        let finalUrl = result.secure_url
        // Use the attachment flag for PDFs to force a direct download and solve 401 errors
        if (isPDF && finalUrl.includes('/upload/')) {
            finalUrl = finalUrl.replace('/upload/', '/upload/fl_attachment/')
        }

        return finalUrl
    } catch (error) {
        console.error('Cloudinary upload error:', error)
        throw error
    }
}

export default cloudinary
