import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { currentPassword, newPassword } = await request.json()

        const user = await prisma.admin.findUnique({
            where: { username: session.user?.name as string }
        })

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

        const isValid = await bcrypt.compare(currentPassword, user.password)
        if (!isValid) return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 })

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await prisma.admin.update({
            where: { id: user.id },
            data: { password: hashedPassword }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
    }
}
