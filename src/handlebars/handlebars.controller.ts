import {Controller, Get, Param, Req, Res, UseFilters, UseGuards} from '@nestjs/common';
import {Response} from 'express';
import {RequestWithUser} from "../interfaces/auth";
import {RoleGuard} from "../guards/role.guard";
import {Role} from "../interfaces/roles";
import JwtAuthGuard from "../guards/jwt-auth.guard";
import * as process from "process";
import {NotLoggedInFilter} from "../filters/not-logged-in.filter";

@Controller('/')
export class HandlebarsController {
    @Get()
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @UseFilters(NotLoggedInFilter)
    getHello(
        @Req() request: RequestWithUser,
        @Res() res: Response
    ) {
        return res.render('test.hbs', {
            domain: process.env.DOMAIN,
            port: process.env.PORT,
            username: request.user.name,
            id: request.user.id
        });
    }

    @Get('/login')
    logIn(
        @Req() request: RequestWithUser,
        @Res() res: Response
    ) {
        return res.render('login.hbs');
    }


    @Get('/users/:id')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    userProfile(
        @Req() request: RequestWithUser,
        @Res() res: Response,
        @Param('id') id: string
    ) {
        return res.render('test.hbs', {
            domain: process.env.DOMAIN,
            port: process.env.PORT,
            username: request.user.name,
            id: request.user.id
        });
    }

}
