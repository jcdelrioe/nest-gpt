import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';

import { createMessageUsecase, createThreadUsecase } from './use-cases';
import { QuestionDto } from './dtos/question.dto';

@Injectable()
export class SamAsistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await createThreadUsecase(this.openai);
  }

  async userQuestion(questionDto: QuestionDto) {
    const { threadId, question } = questionDto;

    const message = await createMessageUsecase(this.openai, {
      threadId,
      question,
    });

    console.log({message});
    
  }
}
