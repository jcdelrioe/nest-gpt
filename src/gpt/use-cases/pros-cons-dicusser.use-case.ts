import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDicusserUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
        Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,la respuesta debe de ser en formato markdown,los pros y contras deben de estar en una lista
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 500,
  });

  console.log(response);

  return response.choices[0].message;
  // const rawContent = completion.choices?.[0]?.message?.content;

  // if (rawContent) {
  //   const jsonString =
  //     rawContent.startsWith('```json') && rawContent.endsWith('```')
  //       ? rawContent.substring(7, rawContent.length - 3) // Elimina "```json" al inicio y "```" al final
  //       : rawContent; // Si no tiene los delimitadores, usa el contenido tal cual

  //   try {
  //     const jsonResp = JSON.parse(jsonString);
  //     console.log('JSON parseado:', jsonResp);
  //     return jsonResp;
  //   } catch (error) {
  //     console.error('Error al parsear JSON después de limpiar:', error);
  //   }
  // } else {
  //   console.warn('No se encontró contenido para parsear.');
  // }
};
