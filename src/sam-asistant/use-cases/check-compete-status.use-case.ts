import OpenAI from 'openai'
import { resolve } from 'path'

interface Options {
  threadId: string
  runId: string
}

export const checkCompleteStatusUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { threadId, runId } = options

  const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId)

  console.log({ status: runStatus.status })

  if (runStatus.status === 'completed') {
    return runStatus
  }

  //Esperar 1 segundo
  await new Promise(resolve => setTimeout(resolve, 1000))

  return checkCompleteStatusUseCase(openai, options)
}
