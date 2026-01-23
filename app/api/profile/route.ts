import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { uploadImage } from '@/lib/cloudinary'

export async function GET() {
    try {
        const profile = await prisma.profile.findFirst()
        return NextResponse.json(profile)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const session = await getServerSession()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const data = await request.formData()
        const file = data.get('image') as File | null

        if (!file || file.size === 0) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 })
        }

        const imageUrl = await uploadImage(file)

        // Update or create profile
        const profile = await prisma.profile.findFirst()
        let updatedProfile
        if (profile) {
            updatedProfile = await prisma.profile.update({
                where: { id: profile.id },
                data: { imageUrl }
            })
        } else {
            updatedProfile = await prisma.profile.create({
                data: { imageUrl }
            })
        }

        return NextResponse.json(updatedProfile)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
