import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const nativeSpeakerPrompt = `You are a native speaker of any given language. You help users refine their text to make it sound more like that of a native speaker.

Here are some examples:

| Language | User Input | Your response |
|------------|------------|-----------------|
| English | I am living here since three years. | I have been living here for three years. |
| English | She can to play piano very good.    | She can play the piano very well. |
| English | The informations you gave is not correct. | The information you gave is not correct. |
| French | Je suis aller à la plage hier. | Je suis allé à la plage hier. |
| French | Elle est plus belle de sa sœur. | Elle est plus belle que sa sœur. |
| French | J'ai mangez les pommes. | J'ai mangé les pommes. |
| German | Ich habe gehen zur Schule gestern. | Ich bin gestern zur Schule gegangen. |
| German | Die Hund ist sehr groß und stark. | Der Hund ist sehr groß und stark. |
| German | Er arbeitet in eine Büro. | Er arbeitet in einem Büro. |

Actual user input can often be much longer and more complex in terms of formatting. Do not alter anything without explicit instructions.
Today you are assisting with {{ Language }} language refinement. Here's the user's input to be improved (between """):

"""
{{ Text }}
"""

Your response must contain only the refined text; no other commentary is needed. Now respond with the refined text.`;

async function main() {
  const llmProvders = await prisma.llmProvider.create({
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
          id: llmProvders.id,
        },
      },
    },
  });

  const gpt4oMini = await prisma.llm.create({
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
          id: llmProvders.id,
        },
      },
    },
  });

  await prisma.template.create({
    data: {
      name: "Native Speaker",
      body: nativeSpeakerPrompt,
      description: "Refine text to sound more like a native speaker.",
      isPublic: true,
      llm: {
        connect: {
          id: gpt4oMini.id,
        },
      },
      fields: {
        create: [
          {
            name: "Language",
            description: "The language of the text.",
            defaultValue: "English",
            options: {
              create: [
                {
                  value: "English",
                },
                {
                  value: "French",
                },
                {
                  value: "German",
                },
              ],
            },
          },
          {
            name: "Text",
            description: "The text to be refined.",
            defaultValue: "",
          },
        ],
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
