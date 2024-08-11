import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Auth
  const admin = await prisma.user.create({
    data: {
      name: 'mktcode',
      email: 'kontakt@markus-kottlaender.de',
    }
  })

  await prisma.account.create({
    data: {
      provider: 'github',
      providerAccountId: '6792578',
      userId: admin.id,
      type: 'oauth',
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })