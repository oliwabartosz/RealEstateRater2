import {Body, Controller, Inject, Post, Res, UseGuards} from '@nestjs/common';
import {GptService} from "./gpt.service";
import {AddApiKeyDto} from "./dto/add-api-key.dto";
import { Response } from 'express';
import {RoleGuard} from "../guards/role.guard";
import {Role} from "../interfaces/roles";
import JwtAuthGuard from "../guards/jwt-auth.guard";

@Controller('gpt')
export class GptController {
    constructor(
        @Inject(GptService) private gptService: GptService,
    ) {}

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @Post()
    setApiKeyCookie(
        @Body() AddApiKeyDto: AddApiKeyDto,
        @Res() res: Response
    ) {
        res.cookie('openai-api-key', AddApiKeyDto.apiKey, { maxAge: 24*60*60*1000, httpOnly: true });
        res.json({
            success: true,
        })
    }

}

