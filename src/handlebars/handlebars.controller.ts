import {Controller, Get, Param, Render, Req, Res, UseFilters, UseGuards} from '@nestjs/common';
import {Response} from 'express';
import {RequestWithUser} from "../interfaces/auth";
import {RoleGuard} from "../guards/role.guard";
import {Role} from "../interfaces/roles";
import JwtAuthGuard from "../guards/jwt-auth.guard";
import * as process from "process";
import {NotLoggedInFilter} from "../filters/not-logged-in.filter";
import {FlatsService} from "../flats/flats.service";

@Controller('/')
export class HandlebarsController {
    constructor(private flatsService: FlatsService) {}
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


    //@TODO: users/:id
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

    @Get('/flats/')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)

    async flatList(
        @Req() request: RequestWithUser,
        @Res() res: Response,
    ) {
        return res.render('forms/standard-rate/flats-table.hbs', {
            domain: process.env.DOMAIN,
            port: process.env.PORT,
            username: request.user.name,
            id: request.user.id,
            flatsList: await this.flatsService.getAllRecords()
        })
    }

    @Get('/flats/:number')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)

    async flatProfile(
        @Req() request: RequestWithUser,
        @Res() res: Response,
        @Param('number') number: number,
    ) {
        return res.render('forms/standard-rate/flat.hbs', {
            domain: process.env.DOMAIN,
            port: process.env.PORT,
            username: request.user.name,
            id: request.user.id,
            flat_data: await this.flatsService.getOneRecord(number),
            lastNumber: await this.flatsService.getLastNumber(),

        })
    }


}
