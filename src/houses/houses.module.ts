import { Module } from '@nestjs/common';
import { HousesAnswersService, HousesService } from './houses.service';
import { HousesController } from './houses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HousesData } from './entities/houses-data.entity';
import { HousesAnswers } from './entities/houses-answers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HousesData, HousesAnswers])],
  providers: [HousesService, HousesAnswersService],
  controllers: [HousesController],
  exports: [HousesService, HousesAnswersService],
})
export class HousesModule {}
