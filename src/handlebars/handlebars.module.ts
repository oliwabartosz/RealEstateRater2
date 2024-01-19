import { Module } from '@nestjs/common';
import { HandlebarsController } from './handlebars.controller';
import { HandlebarsService } from './handlebars.service';

@Module({
  controllers: [HandlebarsController],
  providers: [HandlebarsService]
})
export class HandlebarsModule {}
