import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {FlatsModule} from './flats/flats.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {dataSourceOptions} from "./db/data-source";
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
<<<<<<< HEAD
import { HousesModule } from './houses/houses.module';
import { PlotsModule } from './plots/plots.module';
import { HandlebarsController } from './handlebars/handlebars.controller';
import { HandlebarsModule } from './handlebars/handlebars.module';
=======
import {HousesModule} from './houses/houses.module';
import {PlotsModule} from './plots/plots.module';
import {ThrottlerModule, ThrottlerGuard} from '@nestjs/throttler';
import {APP_GUARD} from '@nestjs/core';
>>>>>>> main
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
<<<<<<< HEAD
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 10,
        }]),
=======
        ThrottlerModule.forRoot([
            {
                name: 'short',
                ttl: 10000,
                limit: 3,
            },
            {
                name: 'long',
                ttl: 60000,
                limit: 10,
            },
        ]),
>>>>>>> main
        TypeOrmModule.forRoot(dataSourceOptions),
        FlatsModule,
        UsersModule,
        AuthModule,
        HousesModule,
        PlotsModule,
        HandlebarsModule,
    ],
<<<<<<< HEAD
    controllers: [AppController, HandlebarsController],
    providers: [AppService],

=======
    controllers: [AppController],
    providers: [AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ],
>>>>>>> main

})
export class AppModule {

}
