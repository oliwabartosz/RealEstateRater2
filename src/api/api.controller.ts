import {Body, Controller, Delete, Get, Inject, Param, Post} from '@nestjs/common';
import {FlatsService} from "../flats/flats.service";
import {CreateNewFlatResponse, FlatRecord, FlatsListResponse, OneFlatResponse} from "../interfaces/flat-record";
import {CreateFlatDto} from "../flats/dto/create-flat.dto";

@Controller('/api')
export class ApiController {

    constructor(
        @Inject(FlatsService) private flatsService: FlatsService,
    ) {

    }
}
