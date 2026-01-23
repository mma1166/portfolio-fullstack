import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { uploadImage } from '@/lib/cloudinary'

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { id } = await params
        await prisma.project.delete({
            where: { id: parseInt(id) }
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { id } = await params
        const data = await request.formData()
        const title = data.get('title') as string
        const description = data.get('description') as string
        const link = data.get('link') as string
        const techStack = data.get('techStack') as string
        const file = data.get('image') as File | null

        let imageUrl = data.get('currentImageUrl') as string

        if (file && file.size > 0) {
            imageUrl = await uploadImage(file)
        }

        const linkType = data.get('linkType') as string || 'github'

        const project = await prisma.project.update({
            where: { id: parseInt(id) },
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
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
    }
}
