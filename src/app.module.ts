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
import * as Joi from 'joi';


@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION_TIME: Joi.string().required(),
            }),
        }),
        TypeOrmModule.forRoot(dataSourceOptions),
        FlatsModule,
        UsersModule,
        AuthModule,
        HousesModule,
    ],
    controllers: [AppController],
    providers: [AppService],


})
export class AppModule {

}
