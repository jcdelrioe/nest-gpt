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

  console.log(completion);

  const jsonResp = completion.choices[0].message.content;

  // if (jsonResp) {
  //   jsonResp = JSON.parse(jsonResp);
  // }

  return jsonResp;
};
