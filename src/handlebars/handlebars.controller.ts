import {Controller, Get, Param, Req, Res, UseFilters, UseGuards} from '@nestjs/common';
import {Response} from 'express';
import {RequestWithUser} from "../interfaces/auth";
import {RoleGuard} from "../guards/role.guard";
import {Role} from "../interfaces/roles";
import JwtAuthGuard from "../guards/jwt-auth.guard";
import {NotLoggedInFilter} from "../filters/not-logged-in.filter";
import {FlatsAnswersService, FlatsGPTService, FlatsService} from "../flats/flats.service";
import {getDomainAndPort, getUserInfo, getImagesFromDirectory} from "./utils/render-options";
import {HandlebarsService} from "./handlebars.service";
import { HousesAnswersService, HousesService } from 'src/houses/houses.service';
import path from 'path';


@Controller('/')
export class HandlebarsController {
    constructor(
        private handlebarsService: HandlebarsService,
        private flatsService: FlatsService,
        private flatsAnswersService: FlatsAnswersService,
        private flatsGPTService: FlatsGPTService,
        private housesService: HousesService,
        private housesAnswersService: HousesAnswersService,
    ) {
    }

    @Get()
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @UseFilters(NotLoggedInFilter)
    goHome(
        @Req() request: RequestWithUser,
        @Res() res: Response
    ) {
        return res.render('index.hbs', {
            ...getDomainAndPort(),
            ...getUserInfo(request),
        });
    }

    @Get('/login')
    logIn(
        @Res() res: Response
    ) {
        return res.render('auth/login.hbs');
    }

    @Get('/user/profile')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @UseFilters(NotLoggedInFilter)
    userProfile(
        @Req() request: RequestWithUser,
        @Res() res: Response,
    ) {
        return res.render('users/user-profile.hbs', {
            ...getDomainAndPort(),
            ...getUserInfo(request),
        });
    }

    @Get('/flats/')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @UseFilters(NotLoggedInFilter)
    async flatList(
        @Req() request: RequestWithUser,
        @Res() res: Response,
    ) {
        return res.render('forms/standard-rate/flats-table.hbs', {
            ...getDomainAndPort(),
            ...getUserInfo(request),
            flatsList: await this.handlebarsService.combineFlatsData(),
        })
    }

    @Get('/flats/quick-rate')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @UseFilters(NotLoggedInFilter)
    async flatQuickRateList(
        @Req() request: RequestWithUser,
        @Res() res: Response,
    ) {
        return res.render('forms/quick-rate/flats-table.hbs', {
            ...getDomainAndPort(),
            ...getUserInfo(request),
            flatsList: await this.handlebarsService.combineFlatsData(),
        })
    }


    @Get('/flats/:number')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @UseFilters(NotLoggedInFilter)
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

        const flatData = await this.flatsService.getOneRecord(number)
        const flatID = flatData.id

        const imagesDir = path.join(process.cwd(), 'src/public/images/offers', flatData.offerId);
        const imageFiles = await getImagesFromDirectory(imagesDir);
 
        

        return res.render('forms/standard-rate/flat.hbs', {
            ...getDomainAndPort(),
            ...getUserInfo(request),
            flat_data: flatData,
            flat_ans_data: await this.flatsAnswersService.getOneRecordByID(flatID),
            flats_gpt_data: await this.flatsGPTService.getOneRecordByID(flatID),
            lastNumber: await this.flatsService.getLastNumber(),
            images: imageFiles ? imageFiles.map(image => `${flatData.offerId}/${image}`) : [],
        });
    }

    @Get('/flats/quick-rate/:number')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @UseFilters(NotLoggedInFilter)
    async flatQuickRateProfile(
        @Req() request: RequestWithUser,
        @Res() res: Response,
        @Param('number') number: number,
    ) {

        try {
            await this.flatsService.getOneRecord(number);
        } catch (err) {
            return res.redirect('/flats/quick-rate/');
        }

        const flatData = await this.flatsService.getOneRecord(number)
        const flatID = flatData.id
        const imagesDir = path.join(process.cwd(), 'src/public/images/offers', flatData.offerId);
        const images = await getImagesFromDirectory(imagesDir);
        const imageUrls = images.map(image => `${flatData.offerId}/${image}`);
        

        return res.render('forms/quick-rate/flat.hbs', {
            ...getDomainAndPort(),
            ...getUserInfo(request),
            flat_data: flatData,
            flat_ans_data: await this.flatsAnswersService.getOneRecordByID(flatID),
            flats_gpt_data: await this.flatsGPTService.getOneRecordByID(flatID),
            lastNumber: await this.flatsService.getLastNumber(),
            images: imageUrls,
        });
    }


    // ------------------------------------------------------------------
    // -----------------------------HOUSES-------------------------------
    // ------------------------------------------------------------------
    
    @Get('/houses/')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @UseFilters(NotLoggedInFilter)
    async houseList(
        @Req() request: RequestWithUser,
        @Res() res: Response,
    ) {
        return res.render('forms/standard-rate/houses-table.hbs', {
            ...getDomainAndPort(),
            ...getUserInfo(request),
            housesList: await this.handlebarsService.combineHousesData(),
        })
    }

    @Get('/houses/quick-rate')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @UseFilters(NotLoggedInFilter)
    async houseQuickRateList(
        @Req() request: RequestWithUser,
        @Res() res: Response,
    ) {
        return res.render('forms/quick-rate/houses-table.hbs', {
            ...getDomainAndPort(),
            ...getUserInfo(request),
            housesList: await this.handlebarsService.combineHousesData(),
        })
    }


    @Get('/houses/:number')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @UseFilters(NotLoggedInFilter)
    async houseProfile(
        @Req() request: RequestWithUser,
        @Res() res: Response,
        @Param('number') number: number,
    ) {

        // Checks if house exists
        try {
            await this.housesService.getOneRecord(number);
        } catch (err) {
            return res.redirect('/houses/');
        }

        const houseData = await this.housesService.getOneRecord(number)
        const houseID = houseData.id

        const imagesDir = path.join(process.cwd(), 'src/public/images/offers', houseData.offerId);
        const imageFiles = await getImagesFromDirectory(imagesDir);
      
        return res.render('forms/standard-rate/house.hbs', {
            ...getDomainAndPort(),
            ...getUserInfo(request),
            house_data: houseData,
            house_ans_data: await this.housesAnswersService.getOneRecordByID(houseID),
            lastNumber: await this.housesService.getLastNumber(),
            images: imageFiles ? imageFiles.map(image => `${houseData.offerId}/${image}`) : [],
        });
    }

    @Get('/houses/quick-rate/:number')
    @UseGuards(RoleGuard(Role.User))
    @UseGuards(JwtAuthGuard)
    @UseFilters(NotLoggedInFilter)
    async housesQuickRateProfile(
        @Req() request: RequestWithUser,
        @Res() res: Response,
        @Param('number') number: number,
    ) {

        try {
            await this.housesService.getOneRecord(number);
        } catch (err) {
            return res.redirect('/houses/quick-rate/');
        }

        const houseData = await this.housesService.getOneRecord(number)
        const houseID = houseData.id
        const imagesDir = path.join(process.cwd(), 'src/public/images/offers', houseData.offerId);
        const images = await getImagesFromDirectory(imagesDir);
        const imageUrls = images.map(image => `${houseData.offerId}/${image}`);
        

        return res.render('forms/quick-rate/house.hbs', {
            ...getDomainAndPort(),
            ...getUserInfo(request),
            house_data: houseData,
            house_ans_data: await this.housesAnswersService.getOneRecordByID(houseID),
            lastNumber: await this.housesService.getLastNumber(),
            images: imageUrls,
        });
    }


}
