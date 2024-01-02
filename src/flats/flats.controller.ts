import {Body, Controller, DefaultValuePipe, Delete, Get, Inject, Param, ParseIntPipe, Post} from '@nestjs/common';
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
    async getOneFlatByItsNumber(
        @Param('flatNumber', new DefaultValuePipe(1), ParseIntPipe) flatNumber: number,
    ): Promise<OneFlatResponse> {
        const lastNumber = await this.flatsService.getLastNumber();

        if (flatNumber > lastNumber) {
            return {
                statusCode: 404,
                message: "Not found."
            }
        }
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
