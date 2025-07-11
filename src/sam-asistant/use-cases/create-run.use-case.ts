import OpenAI from 'openai'

interface Options {
  threadId: string
  assistantId?: string
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
  const { threadId, assistantId = 'asst_PLCBS6zRjDA0jpra9VqsIZjS' } = options

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    //instructions: //!Ojo Sobreescribe el asistente
  })
  console.log({ run })

  return run
}
