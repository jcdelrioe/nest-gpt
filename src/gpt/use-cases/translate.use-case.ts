import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (
  openai: OpenAI,
  { prompt, lang }: Options,
) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
        Traduce el siguiente texto al idioma ${lang}:${prompt}
        `,
      },
    ],
    temperature: 0.2,
    // max_tokens: 500,
  });

  console.log(response);

  return {
    message: response.choices[0].message.content,
  };
};
