import { Module } from '@nestjs/common';
import {
  FlatsAnswersService,
  FlatsGPTService,
  FlatsRateAI,
  FlatsService,
} from './flats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlatsData } from './entities/flats-data.entity';
import { FlatsAnswers } from './entities/flats-answers.entity';
import { FlatsController } from './flats.controller';
import { FlatsGPT } from './entities/flats-gpt.entity';
import { BullModule } from '@nestjs/bull';
import { BULL_FLATS } from './queue-constants';
import { LoggerService } from 'src/logger/logger.service';
import { RateFlatAI } from './rate-flats.consumer';
import { GptService } from 'src/gpt/gpt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlatsData, FlatsAnswers, FlatsGPT]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6200,
      },
    }),
    BullModule.registerQueue({
      name: BULL_FLATS,
    }),
  ],
  providers: [
    FlatsService,
    FlatsAnswersService,
    FlatsGPTService,
    FlatsRateAI,
    LoggerService,
    RateFlatAI, // Consumer
    GptService,
  ],
  controllers: [FlatsController],
  exports: [FlatsService, FlatsAnswersService, FlatsGPTService],
})
export class FlatsModule {}
