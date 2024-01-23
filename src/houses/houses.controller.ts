import {
    Body,
    Controller,
    DefaultValuePipe, Delete,
    Get,
    Inject,
    NotFoundException,
    Param,
    ParseIntPipe, Post, Req,
    UseGuards
} from '@nestjs/common';
import {RoleGuard} from "../guards/role.guard";
import {Role} from "../interfaces/roles";
import JwtAuthGuard from "../guards/jwt-auth.guard";
import {TransformLawStatusPipe} from "../pipes/transform-law-status.pipe";
import {RequestWithUser} from "../interfaces/auth";
import {HousesAnswersService, HousesService} from "./houses.service";
import {HouseListResponse, OneHouseResponse} from "../interfaces/house-record";
import {CreateHouseDto} from "./dto/create-house.dto";
import {HousesData} from "./enitities/houses-data.entity";
import {DeleteResult} from "typeorm";
import {AddHouseAnswersDto} from "./dto/add-house-answers.dto";
import {HousesAnswers} from "./enitities/houses-answers.entity";
import {SkipThrottle} from "@nestjs/throttler";

@SkipThrottle({ long: true })
@Controller('/api/houses')
export class HousesController {

    constructor(
        @Inject(HousesService) private housesService: HousesService,
        @Inject(HousesAnswersService) private housesAnswersService: HousesAnswersService,

    ) {}

    @Get('/all')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Scraper))
    @UseGuards(JwtAuthGuard)
    getRecords(): Promise<HouseListResponse> {
        return this.housesService.getAllRecords();
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @Get('/:houseNumber')
    async getOneRecordByItsNumber(
        @Param('houseNumber', new DefaultValuePipe(1), ParseIntPipe) houseNumber: number,
    ): Promise<OneHouseResponse> {
        const lastNumber = await this.housesService.getLastNumber();

        if (houseNumber > lastNumber) {
            throw new NotFoundException()
        }
        return this.housesService.getOneRecord(houseNumber);
    }

    @Post('/')
    @UseGuards(RoleGuard(Role.Scraper))
    @UseGuards(JwtAuthGuard)
    createRecord(
        @Body(TransformLawStatusPipe) createHouseDto: CreateHouseDto
    ): Promise<HousesData> {
        return this.housesService.createNewRecord(createHouseDto);
    }

    @Delete('/')
    @UseGuards(RoleGuard(Role.Admin))
    @UseGuards(JwtAuthGuard)
    removeRecordsByIDs(
        @Body() payload: { ids: string[] }
    ): Promise<DeleteResult> {
        const {ids} = payload;
        return this.housesService.removeRecordsByIDs(ids)
    }

    @Delete('/all')
    @UseGuards(RoleGuard(Role.Admin))
    @UseGuards(JwtAuthGuard)
    removeAll(): Promise<DeleteResult> {
        return this.housesService.removeAll();
    }

    @Post('/answers')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    async createOrUpdateAnswerRecord(
        @Body() AddHouseAnswersDto: AddHouseAnswersDto,
        @Req() request: RequestWithUser,
    ): Promise<HousesAnswers> {
        return this.housesAnswersService.createOrUpdateAnswer(request.body.houseID, request.user.name, AddHouseAnswersDto)
    }
}

