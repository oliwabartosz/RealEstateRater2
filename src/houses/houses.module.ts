import { Module } from '@nestjs/common';
import { HousesService } from './houses.service';
import { HousesController } from './houses.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {HousesData} from "./enitities/houses-data.entity";
import {HousesAnswers} from "./enitities/houses-answers.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([HousesData, HousesAnswers]),
  ],
  providers: [HousesService],
  controllers: [HousesController]
})
export class HousesModule {}
