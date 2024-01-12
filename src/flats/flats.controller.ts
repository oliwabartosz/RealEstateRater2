import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Inject,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from '@nestjs/common';
import {FlatsListResponse, OneFlatResponse} from "../interfaces/flat-record";
import {CreateFlatDto} from "./dto/create-flat.dto";
import {FlatsService} from "./flats.service";
import {TransformLawStatusPipe} from "../pipes/transform-law-status.pipe";
import JwtAuthGuard from "../guards/jwt-auth.guard";
import {RoleGuard} from "../guards/role.guard";
import {Role} from "../interfaces/roles";

@Controller('/flats')
export class FlatsController {

    constructor(
        @Inject(FlatsService) private flatsService: FlatsService,
    ) {

    }

    @Get('/all')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Scraper))
    @UseGuards(JwtAuthGuard)
    getFlats(): Promise<FlatsListResponse> {
        return this.flatsService.getAllFlats();
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(RoleGuard(Role.Scraper))
    @UseGuards(JwtAuthGuard)
    createRecord(
        @Body(TransformLawStatusPipe) createFlatDto: CreateFlatDto
    ) {
        return this.flatsService.createNewRecord(createFlatDto);
    }

    @Delete('/')
    @UseGuards(RoleGuard(Role.Admin))
    @UseGuards(JwtAuthGuard)
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
