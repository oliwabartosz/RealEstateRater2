import { Module } from '@nestjs/common';
import {ApiController} from "./api.controller";
import {AppService} from "../app.service";
import {FlatsModule} from "../flats/flats.module";

@Module({
    imports: [FlatsModule],
    controllers: [ApiController],
    providers: [AppService]
})
export class ApiModule {}
