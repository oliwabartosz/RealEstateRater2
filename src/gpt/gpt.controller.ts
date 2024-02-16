import {Body, Controller, Delete, Get, Inject, Post, Req, Res, UseGuards} from '@nestjs/common';
import {GptService} from "./gpt.service";
import {AddApiKeyDto} from "./dto/add-api-key.dto";
import {Response} from 'express';
import { Request } from 'express';
import {RoleGuard} from "../guards/role.guard";
import {Role} from "../interfaces/roles";
import JwtAuthGuard from "../guards/jwt-auth.guard";

@Controller('gpt')
export class GptController {
    constructor(
        @Inject(GptService) private gptService: GptService,
    ) {
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @Post()
    setApiKeyCookie(
        @Body() AddApiKeyDto: AddApiKeyDto,
        @Res() res: Response
    ) {
        res.cookie('openai-api-key', AddApiKeyDto.apiKey, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
        });
        res.json({
            success: true,
        })
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @Delete('/remove-key')
    removeApiKeyCookie(@Res() res: Response) {
        res.clearCookie('openai-api-key');
        res.json({ success: true });
    }

    //@TODO: Check is this necessary???
    // @UseGuards(RoleGuard(Role.User))
    // @UseGuards(JwtAuthGuard)
    // @Get('/get-key')
    // getApiKeyCookie(@Req() req: Request) {
    //     const apiKey = req.cookies['openai-api-key'];
    //     return { apiKey };
    // }

    @UseGuards(RoleGuard(Role.Admin))
    @UseGuards(JwtAuthGuard)
    @Post('/flats/rate')
    rateFlats(@Req() req: Request) {
        const apiKey: string = req.cookies['openai-api-key'];
        return this.gptService.rateFlats(apiKey);

    }
 
}

