import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)
    const { id: idParam } = await params

    if (!session) {
        console.error('Delete attempted without session')
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = parseInt(idParam)
    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
    }

    try {
        await prisma.message.delete({
            where: { id }
        })
        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Prisma Delete Error:', error)
        return NextResponse.json({
            error: 'Failed to delete message from database',
            details: error.message
        }, { status: 500 })
    }
}
