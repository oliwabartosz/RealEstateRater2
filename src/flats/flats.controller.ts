import {Body, Controller, Delete, Get, Inject, Param, Post} from '@nestjs/common';
import {FlatsListResponse, OneFlatResponse} from "../interfaces/flat-record";
import {CreateFlatDto} from "./dto/create-flat.dto";
import {FlatsService} from "./flats.service";

@Controller('/flats')
export class FlatsController {

    constructor(
        @Inject(FlatsService) private flatsService: FlatsService,
    ) {

    }

    @Get('/all')
    getFlats(): Promise<FlatsListResponse> {
        return this.flatsService.getAllFlats();
    }

    @Get('/:flatNumber')
    getOneFlatByItsNumber(
        @Param('flatNumber') flatNumber: number,
    ): Promise<OneFlatResponse> {
        console.log(flatNumber)
        return this.flatsService.getOneFlat(flatNumber);
    }

    @Post('/')
    createRecord(
        @Body() createFlatDto: CreateFlatDto
    ) {
        return this.flatsService.createNewRecord(createFlatDto);
    }

    @Delete('/')
    removeRecordsByIDs(
        @Body() payload: {ids: string[]}
    ) {
        const { ids } = payload;
        return this.flatsService.removeRecordsByIDs(ids)
    }

    @Delete('/all')
    removeAll() {
        return this.flatsService.removeAll();
    }


}
