import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Auth
  const admin = await prisma.user.create({
    data: {
      name: 'mktcode',
      email: 'kontakt@markus-kottlaender.de',
      stripeCustomerId: 'cus_Q4R0E13x321U4j',
    }
  })

  await prisma.topUp.create({
    data: {
      amount: 10000,
      userId: admin.id,
      stripeCheckoutSessionId: 'cs_test_a1X5JQzM23Ys6oDWJKCRfGEU6qqIzBYaLiPPVQG7xNMfDefNL9Y0r2wxrR',
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