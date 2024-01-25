import {Controller, Get, Param, Render, Req, Res, UseFilters, UseGuards} from '@nestjs/common';
import {Response} from 'express';
import {RequestWithUser} from "../interfaces/auth";
import {RoleGuard} from "../guards/role.guard";
import {Role} from "../interfaces/roles";
import JwtAuthGuard from "../guards/jwt-auth.guard";
import * as process from "process";
import {NotLoggedInFilter} from "../filters/not-logged-in.filter";
import {FlatsService} from "../flats/flats.service";
import {getDomainAndPort, getUserInfo} from "./utils/render-options";

@Controller('/')
export class HandlebarsController {
    constructor(private flatsService: FlatsService) {
    }

    @Get()
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @UseFilters(NotLoggedInFilter)
    getHello(
        @Req() request: RequestWithUser,
        @Res() res: Response
    ) {
        return res.render('user-profile.hbs', {
            ...getDomainAndPort(),
            ...getUserInfo(request),
        });
    }

    @Get('/login')
    logIn(
        @Req() request: RequestWithUser,
        @Res() res: Response
    ) {
        return res.render('auth/login.hbs');
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
        return res.render('/users/user-profile.hbs', {
            ...getDomainAndPort(),
            ...getUserInfo(request)
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
            ...getDomainAndPort(),
            ...getUserInfo(request),
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

        // Checks if flat exists
        try {
            await this.flatsService.getOneRecord(number);
        } catch (err) {
            return res.redirect('/flats/');
        }

        return res.render('forms/standard-rate/flat.hbs', {
            ...getDomainAndPort(),
            ...getUserInfo(request),
            flat_data: await this.flatsService.getOneRecord(number),
            lastNumber: await this.flatsService.getLastNumber(),
        });
    }


}
