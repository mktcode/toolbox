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
  await prisma.template.create({
    data: {
      name: "Native Speaker",
      body: nativeSpeakerPrompt,
      description: "Refine text to sound more like a native speaker.",
      aiModel: "gpt-4o-mini",
      isPublic: true,
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
