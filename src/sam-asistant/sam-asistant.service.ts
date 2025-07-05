import { Injectable } from '@nestjs/common'

import OpenAI from 'openai'

import {
  checkCompleteStatusUseCase,
  createMessageUsecase,
  createRunUseCase,
  createThreadUsecase,
  getMessageListUseCase,
} from './use-cases'
import { QuestionDto } from './dtos/question.dto'

@Injectable()
export class SamAsistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  async createThread() {
    return await createThreadUsecase(this.openai)
  }

  async userQuestion(questionDto: QuestionDto) {
    const { threadId, question } = questionDto

    const message = await createMessageUsecase(this.openai, {
      threadId,
      question,
    })

    const run = await createRunUseCase(this.openai, { threadId })

    await checkCompleteStatusUseCase(this.openai, {
      threadId: threadId,
      runId: run.id,
    })

    const messages = await getMessageListUseCase(this.openai, { threadId })

    return messages
  }
}
