import { Module } from '@nestjs/common';
import {FlatsService} from "./flats.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FlatsData} from "./entities/flats-data.entity";
import {FlatsAnswers} from "./entities/flats-answers.entity";
import { FlatsController } from './flats.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([FlatsData, FlatsAnswers]),
    ],
    providers: [FlatsService],
    exports: [FlatsService],
    controllers: [FlatsController]
})
export class FlatsModule {}
