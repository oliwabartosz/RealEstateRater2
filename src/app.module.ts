import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {FlatsModule} from './flats/flats.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {dataSourceOptions} from "./db/data-source";
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import { HousesModule } from './houses/houses.module';
import { PlotsModule } from './plots/plots.module';
import { HandlebarsController } from './handlebars/handlebars.controller';
import { HandlebarsModule } from './handlebars/handlebars.module';
import * as Joi from 'joi';
import {ThrottlerModule} from "@nestjs/throttler";


@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION_TIME: Joi.string().required(),
            }),
        }),
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 10,
        }]),
        TypeOrmModule.forRoot(dataSourceOptions),
        FlatsModule,
        UsersModule,
        AuthModule,
        HousesModule,
        PlotsModule,
        HandlebarsModule,
    ],
    controllers: [AppController, HandlebarsController],
    providers: [AppService],


})
export class AppModule {

}
