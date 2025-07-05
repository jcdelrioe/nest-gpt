import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';
import { createThreadUsecase } from './use-cases';

@Injectable()
export class SamAsistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await createThreadUsecase(this.openai);
  }
}
