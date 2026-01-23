const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const updates = [
        { title: 'ASUS Prime B460 Plus OpenCore Hackintosh', imageUrl: '/images/hackintosh.png' },
        { title: 'BRACU Response Team Website', imageUrl: '/images/response-team.png' },
        { title: 'EverShop Cypress Automation', imageUrl: '/images/ever-shop.png' }
    ]

    for (const update of updates) {
        await prisma.project.updateMany({
            where: { title: update.title },
            data: { imageUrl: update.imageUrl }
        })
        console.log(`Updated ${update.title}`)
    }
}

main().finally(() => prisma.$disconnect())
