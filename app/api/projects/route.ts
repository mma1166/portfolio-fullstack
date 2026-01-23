import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function GET() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(projects)
}

export async function POST(request: Request) {
    const session = await getServerSession()
    // Note: Pass auth options if needed to verify properly, 
    // but middleware already protects /admin and we should strictly check session here too.
    // For simplicity solely relying on middleware for now or checking generic session.

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const data = await request.formData()
        const title = data.get('title') as string
        const description = data.get('description') as string
        const link = data.get('link') as string
        const techStack = data.get('techStack') as string
        const file = data.get('image') as File | null

        let imageUrl = ''

        if (file && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer())
            const filename = Date.now() + '_' + file.name.replace(/\s/g, '_')
            const uploadDir = path.join(process.cwd(), 'public/uploads')

            try {
                await mkdir(uploadDir, { recursive: true })
            } catch (e) {
                // Ignore
            }

            await writeFile(path.join(uploadDir, filename), buffer)
            imageUrl = `/uploads/${filename}`
        }

        const linkType = data.get('linkType') as string || 'github'

        const project = await prisma.project.create({
            data: {
                title,
                description,
                link,
                techStack,
                imageUrl,
                linkType,
            }
        })

        return NextResponse.json(project)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
