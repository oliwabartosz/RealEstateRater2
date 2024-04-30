import { Module } from '@nestjs/common';
import { PlotsController } from './plots.controller';
import { PlotsAnswersService, PlotsService } from './plots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlotsData } from './entities/plots.entity';
import { PlotsAnswers } from './entities/plots-answers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlotsData, PlotsAnswers])],
  controllers: [PlotsController],
  providers: [PlotsService, PlotsAnswersService],
  exports: [PlotsService, PlotsAnswersService],
})
export class PlotsModule {}
