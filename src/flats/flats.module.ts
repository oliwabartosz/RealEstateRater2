import {Module} from '@nestjs/common';
import {FlatsService} from "./flats.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FlatsData} from "./entities/flats-data.entity";
import {FlatsAnswers} from "./entities/flats-answers.entity";
import {FlatsController} from './flats.controller';
import {FlatsGPT} from "./entities/flats-gpt.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([FlatsData, FlatsAnswers, FlatsGPT]),
    ],
    providers: [FlatsService],
    controllers: [FlatsController]
})
export class FlatsModule {
}
