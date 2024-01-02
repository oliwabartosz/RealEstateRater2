import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlatsModule } from './flats/flats.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {dataSourceOptions} from "./db/data-source";
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), FlatsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
