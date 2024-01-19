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
import {DeleteResult} from "typeorm";
import {RequestWithUser} from "../interfaces/auth";
import {PlotsAnswersService, PlotsService} from "./plots.service";
import {AddPlotAnswersDto} from "./dto/add-plot-answers.dto";
import {PlotsAnswers} from "./entities/plots-answers.entity";
import {OnePlotsResponse, PlotsListResponse} from "../interfaces/plot-record";
import {CreatePlotDto} from "./dto/create-plot.dto";
import {PlotsData} from "./entities/plots.entity";

@Controller('plots')
export class PlotsController {

    constructor(
        @Inject(PlotsService) private plotsService: PlotsService,
        @Inject(PlotsAnswersService) private plotsAnswersService: PlotsAnswersService,
    ) {}

    @Get('/all')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Scraper))
    @UseGuards(JwtAuthGuard)
    getRecords(): Promise<PlotsListResponse> {
        return this.plotsService.getAllRecords();
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @Get('/:plotNumber')
    async getOneRecordByItsNumber(
        @Param('plotNumber', new DefaultValuePipe(1), ParseIntPipe) plotNumber: number,
    ): Promise<OnePlotsResponse> {
        const lastNumber = await this.plotsService.getLastNumber();

        if (plotNumber > lastNumber) {
            throw new NotFoundException()
        }
        return this.plotsService.getOneRecord(plotNumber);
    }

    @Post('/')
    @UseGuards(RoleGuard(Role.Scraper))
    @UseGuards(JwtAuthGuard)
    createRecord(
        @Body(TransformLawStatusPipe) createPlotDto: CreatePlotDto
    ): Promise<PlotsData> {
        return this.plotsService.createNewRecord(createPlotDto);
    }

    @Delete('/')
    @UseGuards(RoleGuard(Role.Admin))
    @UseGuards(JwtAuthGuard)
    removeRecordsByIDs(
        @Body() payload: { ids: string[] }
    ): Promise<DeleteResult> {
        const {ids} = payload;
        return this.plotsService.removeRecordsByIDs(ids)
    }

    @Delete('/all')
    @UseGuards(RoleGuard(Role.Admin))
    @UseGuards(JwtAuthGuard)
    removeAll(): Promise<DeleteResult> {
        return this.plotsService.removeAll();
    }

    @Post('/answers')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    async createOrUpdateAnswerRecord(
        @Body() AddPlotAnswersDto: AddPlotAnswersDto,
        @Req() request: RequestWithUser,
    ): Promise<PlotsAnswers> {
        return this.plotsAnswersService.createOrUpdateAnswer(request.body.plotID, request.user.name, AddPlotAnswersDto)
    }

}
