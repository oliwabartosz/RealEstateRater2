import { Module } from '@nestjs/common';
import { HandlebarsController } from './handlebars.controller';
import { HandlebarsService } from './handlebars.service';
import {FlatsService} from "../flats/flats.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import {FlatsData} from "../flats/entities/flats-data.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FlatsData])],
  controllers: [HandlebarsController],
  providers: [HandlebarsService, FlatsService]
})
export class HandlebarsModule {}
