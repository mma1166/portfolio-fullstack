import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

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

        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = Date.now() + '_' + file.name.replace(/\s/g, '_')
        const uploadDir = path.join(process.cwd(), 'public/uploads')

        try {
            await mkdir(uploadDir, { recursive: true })
        } catch (e) {
            // Ignore
        }

        await writeFile(path.join(uploadDir, filename), buffer)
        const url = `/uploads/${filename}`

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
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
