import { Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GptController } from './gpt.controller';
import { Prompts } from './entities/prompts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Prompts])],
  providers: [GptService],
  controllers: [GptController],
})
export class GptModule {}
