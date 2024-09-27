import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const llmProvder = await prisma.llmProvider.create({
    data: {
      name: "OpenAI",
      url: "https://openai.com",
      pricingUrl: "https://openai.com/pricing",
    },
  });

  await prisma.llm.create({
    data: {
      name: "gpt-4o",
      label: "GPT 4o",
      priceIn: 0.000005,
      priceOut: 0.000015,
      priceInBatch: 0.0000025,
      priceOutBatch: 0.0000075,
      margin: 25,
      provider: {
        connect: {
          id: llmProvder.id,
        },
      },
    },
  });

  await prisma.llm.create({
    data: {
      name: "gpt-4o-mini",
      label: "GPT 4o Mini",
      priceIn: 0.00000015,
      priceOut: 0.0000006,
      priceInBatch: 0.000000075,
      priceOutBatch: 0.0000003,
      margin: 100,
      provider: {
        connect: {
          id: llmProvder.id,
        },
      },
    },
  });

  await prisma.llm.create({
    data: {
      name: "tts",
      label: "Text to Speech",
      priceIn: 0.00006,
      priceOut: 0,
      priceInBatch: 0.00006,
      priceOutBatch: 0,
      margin: 100,
      provider: {
        connect: {
          id: llmProvder.id,
        },
      },
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
