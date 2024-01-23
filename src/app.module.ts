import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {FlatsModule} from './flats/flats.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {dataSourceOptions} from "./db/data-source";
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import {HousesModule} from './houses/houses.module';
import {PlotsModule} from './plots/plots.module';
import {ThrottlerModule, ThrottlerGuard} from '@nestjs/throttler';
import {APP_GUARD} from '@nestjs/core';
import * as Joi from 'joi';


@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION_TIME: Joi.string().required(),
            }),
        }),
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
        TypeOrmModule.forRoot(dataSourceOptions),
        FlatsModule,
        UsersModule,
        AuthModule,
        HousesModule,
        PlotsModule,
    ],
    controllers: [AppController],
    providers: [AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ],

})
export class AppModule {

}
