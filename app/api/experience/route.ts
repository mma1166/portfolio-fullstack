import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
    try {
        const experiences = await prisma.experience.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(experiences)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const body = await request.json()
        const experience = await prisma.experience.create({
            data: {
                role: body.role,
                company: body.company,
                companyUrl: body.companyUrl,
                period: body.period,
                description: body.description,
            }
        })
        return NextResponse.json(experience)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
    }
}
