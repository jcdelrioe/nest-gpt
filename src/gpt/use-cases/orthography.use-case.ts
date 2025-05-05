import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `
        Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
        Las palabras deben existir en el diccionario de la Real Academia Española,
        Debes responder en formato JSON,
        tu tarea es corregirlos y retornar información soluciones,
        también debes dar un porcentaje de acierto por el usuario,
        Si no hay errore, debes de retornar un mensaje de felicitaciones.

        Ejemplo de salida:
        {
          userScore: number,
          errors: string[], // ['error -> solución]
          message: string, // Usa emojis y texto para felicitar al usuario
        }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 150,
  });

  // console.log(completion);

  // const jsonResp = completion.choices[0].message.content;
  // console.log(jsonResp);

  const rawContent = completion.choices?.[0]?.message?.content;

  if (rawContent) {
    const jsonString =
      rawContent.startsWith('```json') && rawContent.endsWith('```')
        ? rawContent.substring(7, rawContent.length - 3) // Elimina "```json" al inicio y "```" al final
        : rawContent; // Si no tiene los delimitadores, usa el contenido tal cual

    try {
      const jsonResp = JSON.parse(jsonString);
      console.log('JSON parseado:', jsonResp);
      return jsonResp;
    } catch (error) {
      console.error('Error al parsear JSON después de limpiar:', error);
    }
  } else {
    console.warn('No se encontró contenido para parsear.');
  }

  // if (jsonResp) {
  //   jsonResp = JSON.parse(jsonResp);
  // }
  // return jsonResp;
};
