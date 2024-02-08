import {Module} from '@nestjs/common';
import {HandlebarsController} from './handlebars.controller';
import {HandlebarsService} from './handlebars.service';
import {FlatsAnswersService, FlatsGPTService, FlatsService} from "../flats/flats.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {FlatsData} from "../flats/entities/flats-data.entity";
import {FlatsAnswers} from "../flats/entities/flats-answers.entity";
import {FlatsGPT} from "../flats/entities/flats-gpt.entity";
import { HousesAnswers } from 'src/houses/entities/houses-answers.entity';
import { HousesData } from 'src/houses/entities/houses-data.entity';
import { HousesAnswersService, HousesService } from '../houses/houses.service';
import { PlotsAnswersService, PlotsService } from 'src/plots/plots.service';
import { PlotsData } from 'src/plots/entities/plots.entity';
import { PlotsAnswers } from 'src/plots/entities/plots-answers.entity';


@Module({
    imports: [TypeOrmModule.forFeature([
        FlatsData,
        FlatsAnswers,
        FlatsGPT,
        HousesData,
        HousesAnswers,
        PlotsData,
        PlotsAnswers,
    ])],
    controllers: [
        HandlebarsController
    ],
    providers: [
        HandlebarsService,
        FlatsService,
        FlatsAnswersService,
        FlatsGPTService,
        HousesService,
        HousesAnswersService,
        PlotsService,
        PlotsAnswersService,
    ],
    exports: [
        HandlebarsService,
    ]
})

export class HandlebarsModule {
}
