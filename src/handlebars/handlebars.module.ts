import {Module} from '@nestjs/common';
import {HandlebarsController} from './handlebars.controller';
import {HandlebarsService} from './handlebars.service';
import {FlatsAnswersService, FlatsGPTService, FlatsService} from "../flats/flats.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {FlatsData} from "../flats/entities/flats-data.entity";
import {FlatsAnswers} from "../flats/entities/flats-answers.entity";
import {FlatsGPT} from "../flats/entities/flats-gpt.entity";


@Module({
    imports: [TypeOrmModule.forFeature([
        FlatsData,
        FlatsAnswers,
        FlatsGPT,
    ])],
    controllers: [
        HandlebarsController
    ],
    providers: [
        HandlebarsService,
        FlatsService,
        FlatsAnswersService,
        FlatsGPTService
    ],
    exports: [
        HandlebarsService,
    ]
})
export class HandlebarsModule {
}
