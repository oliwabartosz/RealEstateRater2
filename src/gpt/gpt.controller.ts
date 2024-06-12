import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GptService } from './gpt.service';
import { AddApiKeyDto } from './dto/add-api-key.dto';
import { Response } from 'express';
import { Request } from 'express';
import { RoleGuard } from '../guards/role.guard';
import { Role } from '../interfaces/roles';
import JwtAuthGuard from '../guards/jwt-auth.guard';
import { FlatsGPTService, FlatsService } from 'src/flats/flats.service';
import { AddGPTAnswersDto } from 'src/flats/dto/add-gpt-answers.dto';
import { FlatsData } from 'src/flats/entities/flats-data.entity';

@Controller('gpt')
export class GptController {
  constructor(
    @Inject(GptService) private gptService: GptService,
    @Inject(FlatsService) private flatsService: FlatsService,
    @Inject(FlatsGPTService) private flatsGPTService: FlatsGPTService,
  ) {}

  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @Post()
  setApiKeyCookie(@Body() addApiKeyDto: AddApiKeyDto, @Res() res: Response) {
    res.cookie('openai-api-key', addApiKeyDto.apiKey, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
    });
    res.json({
      success: true,
    });
  }

  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @Delete('/remove-key')
  removeApiKeyCookie(@Res() res: Response) {
    res.clearCookie('openai-api-key');
    res.json({ success: true });
  }

  // Set openai api-key as cookie
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @Get('/get-key')
  getApiKeyCookie(@Req() req: Request) {
    const apiKey = req.cookies['openai-api-key'];
    return { apiKey };
  }

  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  @Post('/flats/rate')
  async rateFlats(
    @Body() body: { flatsNumbers: number[] },
    @Req() request: Request,
  ) {
    const apiKey: string = request.cookies['openai-api-key'];
    const result = {};

    for (const flatNumber of body.flatsNumbers) {
      const flatID = (
        await this.flatsService.getOneRecordByFlatNumber(flatNumber)
      ).id;

      // await this.gptService.rateFeatures(apiKey, flatNumber);

      // // Save translated description to db
      // await this.flatsGPTService.createTranslatedDescription(apiKey, flatNumber, translatedDescription);

      // result.flatID = flatID;
    }
    return result;
  }
}
