import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
    try {
        const data = await request.formData()
        const name = data.get('name') as string
        const contact = data.get('contact') as string
        const email = data.get('email') as string
        const subject = data.get('subject') as string
        const message = data.get('message') as string
        const file = data.get('file') as File | null

        let attachmentUrl = null

        if (file && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer())
            const filename = Date.now() + '_' + file.name.replace(/\s/g, '_')
            const uploadDir = path.join(process.cwd(), 'public/uploads')

            try {
                await mkdir(uploadDir, { recursive: true })
            } catch (e) {
                // Ignore if exists
            }

            await writeFile(path.join(uploadDir, filename), buffer)
            attachmentUrl = `/uploads/${filename}`
        }

        await prisma.message.create({
            data: {
                name,
                contactNumber: contact,
                email,
                subject,
                message,
                attachmentUrl,
            },
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Error in contact form:', err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
