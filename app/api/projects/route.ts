import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { uploadImage } from '@/lib/cloudinary'

export async function GET() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(projects)
}

export async function POST(request: Request) {
    const session = await getServerSession()

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
            imageUrl = await uploadImage(file)
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
