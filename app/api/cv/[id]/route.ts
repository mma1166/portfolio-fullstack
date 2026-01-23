import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { id } = await params
        await prisma.cV.delete({ where: { id: parseInt(id) } })
        return NextResponse.json({ success: true })
    } catch (e) {
        return NextResponse.json({ error: 'Error' }, { status: 500 })
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
        // Deactivate all
        await prisma.cV.updateMany({ data: { isActive: false } })
        // Activate target
        await prisma.cV.update({
            where: { id: parseInt(id) },
            data: { isActive: true }
        })
        return NextResponse.json({ success: true })
    } catch (e) {
        return NextResponse.json({ error: 'Error' }, { status: 500 })
    }
}
