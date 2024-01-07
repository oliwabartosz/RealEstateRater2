import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {FlatsModule} from './flats/flats.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {dataSourceOptions} from "./db/data-source";
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {JwtStrategy} from "./auth/src/auth/jwt.strategy";

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        FlatsModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, JwtStrategy],
    exports: [JwtStrategy]
})
export class AppModule {
}
