"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeImage(image: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Lütfen bu görseli analiz et ve detaylı bir şekilde açıkla.",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    return { result: response.choices[0].message.content };
  } catch (error) {
    throw new Error(
      "Görsel analiz edilirken bir hata oluştu: " + (error as Error).message
    );
  }
}
