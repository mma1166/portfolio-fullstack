const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const projects = [
        {
            titlePart: 'Hackintosh',
            image: '/images/hackintosh.png'
        },
        {
            titlePart: 'Response Team',
            image: '/images/response-team.png'
        },
        {
            titlePart: 'EverShop',
            image: '/images/ever-shop.png'
        }
    ]

    console.log('Updating project images...')

    for (const p of projects) {
        const project = await prisma.project.findFirst({
            where: {
                title: {
                    contains: p.titlePart
                }
            }
        })

        if (project) {
            await prisma.project.update({
                where: { id: project.id },
                data: {
                    imageUrl: p.image
                }
            })
            console.log(`Updated ${project.title} with image ${p.image}`)
        } else {
            console.log(`Project containing "${p.titlePart}" not found, skipping.`)
        }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
