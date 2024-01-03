import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Inject, NotFoundException,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import {FlatsListResponse, OneFlatResponse} from "../interfaces/flat-record";
import {CreateFlatDto} from "./dto/create-flat.dto";
import {FlatsService} from "./flats.service";
import {TransformLawStatusPipe} from "../pipes/transform-law-status.pipe";

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
            throw new NotFoundException()
        }
        return this.flatsService.getOneFlat(flatNumber);
    }

    @Post('/')
    createRecord(
        @Body(TransformLawStatusPipe) createFlatDto: CreateFlatDto
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
