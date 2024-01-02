import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { FlatsModule } from './flats/flats.module';
import { ApiModule } from './api/api.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import dataSource, {dataSourceOptions} from "./db/data-source";

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ApiModule, FlatsModule],
  controllers: [AppController, ApiController],
  providers: [AppService],
})
export class AppModule {}
