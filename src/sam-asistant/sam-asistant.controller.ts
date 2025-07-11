import { Body, Controller, Post } from '@nestjs/common'
import { SamAsistantService } from './sam-asistant.service'
import { QuestionDto } from './dtos/question.dto'

@Controller('sam-assistant')
export class SamAsistantController {
  constructor(private readonly samAsistantService: SamAsistantService) {}

  @Post('create-thread')
  async createThread() {
    return await this.samAsistantService.createThread()
  }

  @Post('user-question')
  async userQuestion(@Body() questionDto: QuestionDto) {
    return await this.samAsistantService.userQuestion(questionDto)
  }
}
