import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const WELCOME_AMOUNT = 1000;

async function main() {
  // Auth
  const admin = await prisma.user.create({
    data: {
      name: "mktcode",
      email: "kontakt@markus-kottlaender.de",
      currentBalance: WELCOME_AMOUNT,
    },
  });

  await prisma.account.create({
    data: {
      provider: "github",
      providerAccountId: "6792578",
      userId: admin.id,
      type: "oauth",
    },
  });

  await prisma.topUp.create({
    data: {
      amount: WELCOME_AMOUNT,
      note: "Welcome!",
      confirmedAt: new Date(),
      userId: admin.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
