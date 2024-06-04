import { Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GptController } from './gpt.controller';
import { FlatsData } from 'src/flats/entities/flats-data.entity';
import { FlatsAnswers } from 'src/flats/entities/flats-answers.entity';
import { FlatsGPT } from 'src/flats/entities/flats-gpt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FlatsAnswersService,
  FlatsGPTService,
  FlatsService,
} from 'src/flats/flats.service';

@Module({
  imports: [TypeOrmModule.forFeature([FlatsData, FlatsAnswers, FlatsGPT, Prompts])],
  providers: [GptService, FlatsService, FlatsAnswersService, FlatsGPTService],
  controllers: [GptController],
})
export class GptModule {}
