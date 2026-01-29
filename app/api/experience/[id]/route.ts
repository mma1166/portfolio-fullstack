import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const body = await request.json()
        const experience = await prisma.experience.update({
            where: { id: parseInt(params.id) },
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
        return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        await prisma.experience.delete({
            where: { id: parseInt(params.id) }
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
    }
}
