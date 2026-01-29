const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Connecting to database...')

  // Seed Admin
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {
      password: hashedPassword
    },
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  })
  console.log('✅ Admin user processed successfully.')
  console.log('Username: admin')
  console.log('Password: admin123')

  // Seed Initial Skills
  const initialSkills = [
    { name: "Python", level: 75 },
    { name: "JavaScript", level: 60 },
    { name: "Manual Testing", level: 80 },
    { name: "Cypress Automation", level: 75 },
    { name: "SDLC / STLC", level: 80 },
    { name: "Data Science", level: 70 },
    { name: "Machine Learning", level: 75 },
    { name: "Linux", level: 85 },
    { name: "Database", level: 75 },
    { name: "LLM", level: 70 }
  ]

  console.log('Seeding skills...')
  const skillCount = await prisma.skill.count()
  if (skillCount === 0) {
    await prisma.skill.createMany({
      data: initialSkills
    })
    console.log('✅ Initial skills seeded.')
  } else {
    console.log('Skills already exist, skipping seed.')
  }

  // Seed Initial Experiences
  const initialExperiences = [
    {
      role: "Software Test Engineer Intern",
      company: "Spectrum Software & Consulting (Pvt.) Ltd.",
      companyUrl: "https://sscl.tech",
      period: "Nov 2025 — Present",
      description: "Performing web app testing, creating test scenarios, bug reporting, regression testing, and developing UI automation scripts using Cypress."
    },
    {
      role: "SQA Intern",
      company: "Deshi League",
      companyUrl: "https://deshileague.com",
      period: "Oct 2025 — Nov 2025",
      description: "Maintained test plans, executed manual test cases, API testing, Android app testing, and load/performance testing."
    }
  ]

  console.log('Seeding experiences...')
  const experienceCount = await prisma.experience.count()
  if (experienceCount === 0) {
    await prisma.experience.createMany({
      data: initialExperiences
    })
    console.log('✅ Initial experiences seeded.')
  } else {
    console.log('Experiences already exist, skipping seed.')
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
