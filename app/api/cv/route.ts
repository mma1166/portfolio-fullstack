import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { uploadImage } from '@/lib/cloudinary'

export async function GET() {
    const cvs = await prisma.cV.findMany({
        orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(cvs)
}

export async function POST(request: Request) {
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const data = await request.formData()
        const file = data.get('file') as File | null

        if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

        const url = await uploadImage(file)

        // If it's the first CV, make it active
        const count = await prisma.cV.count()

        const cv = await prisma.cV.create({
            data: {
                filename: file.name,
                url,
                isActive: count === 0
            }
        })

        return NextResponse.json(cv)
    } catch (error) {
        console.error('CV Upload Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
