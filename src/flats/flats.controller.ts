import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post, Req,
    UseGuards,
} from '@nestjs/common';
import {FlatsListResponse, OneFlatResponse} from "../interfaces/flat-record";
import {CreateFlatDto} from "./dto/create-flat.dto";
import {FlatsGPTService, FlatsService} from "./flats.service";
import {TransformLawStatusPipe} from "../pipes/transform-law-status.pipe";
import JwtAuthGuard from "../guards/jwt-auth.guard";
import {RoleGuard} from "../guards/role.guard";
import {Role} from "../interfaces/roles";
import {AddFlatAnswersDto} from "./dto/add-flat-answers.dto";
import {FlatsAnswers} from "./entities/flats-answers.entity";
import {RequestWithUser} from "../interfaces/auth";
import {FlatGPTListResponse} from "../interfaces/flat-gpt-record";
import {AddGPTAnswersDto} from "./dto/add-gpt-answers.dto";
import {FlatsGPT} from "./entities/flats-gpt.entity";

@Controller('/flats')
export class FlatsController {

    constructor(
        @Inject(FlatsService) private flatsService: FlatsService,
        @Inject(FlatsGPTService) private flatsGPTService: FlatsGPTService,
    ) {

    }

    @Get('/all')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Scraper))
    @UseGuards(JwtAuthGuard)
    getFlats(): Promise<FlatsListResponse> {
        return this.flatsService.getAllRecords();
    }

    @Get('/gpt/all')
    @UseGuards(RoleGuard(Role.Admin))
    @UseGuards(JwtAuthGuard)
    getGPTRecords(): Promise<FlatGPTListResponse> {
        return this.flatsGPTService.getAllGPTRecords();
    }

    @Post('/answers')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    async createOrUpdateGPTRecord(
        @Body() CreateOrUpdateGPTRecord: AddGPTAnswersDto,
        @Req() request: RequestWithUser,
    ): Promise<FlatsGPT> {
        const allowedFlatIDs = await this.flatsGPTService.getAllRecordsIDs()
        const idArray = allowedFlatIDs.map(flatsData => flatsData.flatID);

        if (!idArray.includes(request.body.flatID)) {
            throw new HttpException("ID in JSON payload is not correct!", HttpStatus.BAD_REQUEST);
        }

        try {
            // INSERT RECORD INTO DATABASE
            return await this.flatsGPTService.createNewGPTAnswer(CreateOrUpdateGPTRecord);

        } catch (err) {
            // UPDATE RECORD

            if (err instanceof HttpException && err.getStatus() === HttpStatus.BAD_REQUEST) {

                return await this.flatsGPTService.updateAnswersRecord(
                    CreateOrUpdateGPTRecord.flatID,
                    CreateOrUpdateGPTRecord
                );

            } else {

                throw new HttpException("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);

            }
        }
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
        return this.flatsService.getOneRecord(flatNumber);
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
        @Body() payload: { ids: string[] }
    ) {
        const {ids} = payload;
        return this.flatsService.removeRecordsByIDs(ids)
    }

    @Delete('/all')
    @UseGuards(RoleGuard(Role.Admin))
    @UseGuards(JwtAuthGuard)
    removeAll() {
        return this.flatsService.removeAll();
    }

    @Post('/answers')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    async createOrUpdateAnswerRecord(
        @Body() CreateOrUpdateAnswerRecord: AddFlatAnswersDto,
        @Req() request: RequestWithUser,
    ): Promise<FlatsAnswers> {
        const allowedFlatIDs = await this.flatsService.getAllRecordsIDs()
        const idArray = allowedFlatIDs.map(flatsData => flatsData.id);

        if (!idArray.includes(request.body.flatID)) {
            throw new HttpException("ID in JSON payload is not correct!", HttpStatus.BAD_REQUEST);
        }

        try {
            // INSERT RECORD INTO DATABASE
            return await this.flatsService.createNewAnswersRecord(CreateOrUpdateAnswerRecord, request.user.name);

        } catch (err) {
            // UPDATE RECORD

            if (err instanceof HttpException && err.getStatus() === HttpStatus.BAD_REQUEST) {

                return await this.flatsService.updateAnswersRecord(
                    CreateOrUpdateAnswerRecord.flatID,
                    CreateOrUpdateAnswerRecord
                );

            } else {

                throw new HttpException("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);

            }
        }
    }


}


