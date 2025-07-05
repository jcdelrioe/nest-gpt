import OpenAI from 'openai'

interface Options {
  threadId: string
}

export const getMessageListUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { threadId } = options

  const messagelist = await openai.beta.threads.messages.list(threadId)

  const messages = messagelist.data.map((message) => ({
    role: message.role,
    content: message.content.map((content) => (content as any).text.value),
  }))

  return messages
}
