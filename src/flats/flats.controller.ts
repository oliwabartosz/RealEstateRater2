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
  Req,
  UseGuards,
} from '@nestjs/common';
import { FlatsListResponse, OneFlatResponse } from '../interfaces/flat-record';
import { CreateFlatDto } from './dto/create-flat.dto';
import {
  FlatsGPTService,
  FlatsService,
  FlatsAnswersService,
} from './flats.service';
import { TransformLawStatusPipe } from '../pipes/transform-law-status.pipe';
import JwtAuthGuard from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Role } from '../interfaces/roles';
import { AddFlatAnswersDto } from './dto/add-flat-answers.dto';
import { FlatsAnswers } from './entities/flats-answers.entity';
import { RequestWithUser } from '../interfaces/auth';
import { FlatGPTListResponse } from '../interfaces/flat-gpt-record';
import { AddGPTAnswersDto } from './dto/add-gpt-answers.dto';
import { FlatsGPT } from './entities/flats-gpt.entity';
import { DeleteResult } from 'typeorm';
import { SkipThrottle } from '@nestjs/throttler';

// long:true means use short!
@SkipThrottle({ short: true })
@Controller('/api/flats')
export class FlatsController {
  constructor(
    @Inject(FlatsService) private flatsService: FlatsService,
    @Inject(FlatsAnswersService)
    private flatsAnswerService: FlatsAnswersService,
    @Inject(FlatsGPTService) private flatsGPTService: FlatsGPTService,
  ) {}

  @Get('/')
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(RoleGuard(Role.Scraper))
  // @UseGuards(JwtAuthGuard)
  getRecords(): Promise<FlatsListResponse> {
    return this.flatsService.getAllRecords();
  }

  @Get('/quick-rate/all')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  getGPTRecords(): Promise<FlatGPTListResponse> {
    return this.flatsGPTService.getAllGPTRecords();
  }

  @Post('/answers')
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  async createOrUpdateAnswerRecord(
    @Body() addFlatAnswersDto: AddFlatAnswersDto,
    @Req() request: RequestWithUser,
  ): Promise<FlatsAnswers> {
    return this.flatsAnswerService.createOrUpdateAnswer(
      request.body.flatID,
      request.user.name,
      addFlatAnswersDto,
    );
  }

  @Post('/quick-rate')
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  async createOrUpdateGPTRecord(
    @Body() addGPTAnswersDto: AddGPTAnswersDto,
    @Req() request: RequestWithUser,
  ): Promise<FlatsGPT> {
    return this.flatsGPTService.createOrUpdateGPTAnswer(
      request.body.flatID,
      request.user.name,
      addGPTAnswersDto,
    );
  }

  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @Get('/:flatNumber')
  async getOneRecordByItsNumber(
    @Param('flatNumber', new DefaultValuePipe(1), ParseIntPipe)
    flatNumber: number,
  ): Promise<OneFlatResponse> {
    const lastNumber = await this.flatsService.getLastNumber();

    if (flatNumber > lastNumber) {
      throw new NotFoundException();
    }
    return this.flatsService.getOneRecordByFlatNumber(flatNumber);
  }

  @Post('/')
  @UseGuards(RoleGuard(Role.Scraper))
  @UseGuards(JwtAuthGuard)
  createRecord(@Body(TransformLawStatusPipe) createFlatDto: CreateFlatDto) {
    return this.flatsService.createNewRecord(createFlatDto);
  }

  @Delete('/')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  removeRecordsByIDs(
    @Body() payload: { ids: string[] },
  ): Promise<DeleteResult> {
    const { ids } = payload;
    return this.flatsService.removeRecordsByIDs(ids);
  }

  @Delete('/all')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  removeAll(): Promise<DeleteResult> {
    return this.flatsService.removeAll();
  }
}
