import {Body, Controller, Inject, Post, Res} from '@nestjs/common';
import {GptService} from "./gpt.service";
import {AddApiKeyDto} from "./dto/add-api-key.dto";
import { Response } from 'express';

@Controller('gpt')
export class GptController {
    constructor(
        @Inject(GptService) private gptService: GptService,
    ) {}

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

