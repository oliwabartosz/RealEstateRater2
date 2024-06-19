import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestWithUser } from '../interfaces/auth';
import { RoleGuard } from '../guards/role.guard';
import { Role } from '../interfaces/roles';
import JwtAuthGuard from '../guards/jwt-auth.guard';
import { NotLoggedInFilter } from '../filters/not-logged-in.filter';
import {
  FlatsAnswersService,
  FlatsGPTService,
  FlatsService,
} from '../flats/flats.service';
import {
  getDomainAndPort,
  getUserInfo,
  getImagesFromDirectory,
} from './utils/render-options';
import { HandlebarsService } from './handlebars.service';
import { HousesAnswersService, HousesService } from 'src/houses/houses.service';
import { PlotsAnswersService, PlotsService } from 'src/plots/plots.service';
import path from 'path';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('/')
export class HandlebarsController {
  constructor(
    private handlebarsService: HandlebarsService,
    private flatsService: FlatsService,
    private flatsAnswersService: FlatsAnswersService,
    private flatsGPTService: FlatsGPTService,
    private housesService: HousesService,
    private housesAnswersService: HousesAnswersService,
    private plotsService: PlotsService,
    private plotsAnswersService: PlotsAnswersService,
  ) {}

  @Get()
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @UseFilters(NotLoggedInFilter)
  goHome(@Req() request: RequestWithUser, @Res() res: Response) {
    return res.render('index.hbs', {
      ...getDomainAndPort(),
      ...getUserInfo(request),
    });
  }

  @Get('/login')
  logIn(@Res() res: Response) {
    return res.render('auth/login.hbs');
  }

  @Get('/user/profile')
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @UseFilters(NotLoggedInFilter)
  userProfile(@Req() request: RequestWithUser, @Res() res: Response) {
    return res.render('users/user-profile.hbs', {
      ...getDomainAndPort(),
      ...getUserInfo(request),
    });
  }

  @SkipThrottle({ short: true })
  @Get('/flats/')
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @UseFilters(NotLoggedInFilter)
  async flatList(@Req() request: RequestWithUser, @Res() res: Response) {
    return res.render('forms/standard-rate/flats-table.hbs', {
      ...getDomainAndPort(),
      ...getUserInfo(request),
      flatsList: await this.handlebarsService.combineFlatsData(),
    });
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
    });
  }

  @SkipThrottle({ short: true })
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
      await this.flatsService.getOneRecordByFlatNumber(number);
    } catch (err) {
      return res.redirect('/flats/');
    }

    const flatData = await this.flatsService.getOneRecordByFlatNumber(number);
    const flatID = flatData.id;

    const imagesDir = path.join(
      process.cwd(),
      'src/public/images/offers',
      flatData.offerIdExpected,
    );
    const imageFiles = await getImagesFromDirectory(imagesDir);
    console.log(imageFiles, imagesDir);

    return res.render('forms/standard-rate/flat.hbs', {
      ...getDomainAndPort(),
      ...getUserInfo(request),
      flat_data: flatData,
      flat_ans_data: await this.flatsAnswersService.getOneRecordByID(flatID),
      flats_gpt_data: await this.flatsGPTService.getOneRecordByID(flatID),
      lastNumber: await this.flatsService.getLastNumber(),
      images: imageFiles
        ? imageFiles.map((image) => `${flatData.offerIdExpected}/${image}`)
        : [],
    });
  }

  @SkipThrottle({ short: true })
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
      await this.flatsService.getOneRecordByFlatNumber(number);
    } catch (err) {
      return res.redirect('/flats/quick-rate/');
    }

    const flatData = await this.flatsService.getOneRecordByFlatNumber(number);
    const flatID = flatData.id;
    const imagesDir = path.join(
      process.cwd(),
      'src/public/images/offers',
      flatData.offerIdExpected,
    );
    const images = await getImagesFromDirectory(imagesDir);
    const imageUrls = (images || []).map(
      (image) => `${flatData.offerIdExpected}/${image}`,
    );

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
  async houseList(@Req() request: RequestWithUser, @Res() res: Response) {
    return res.render('forms/standard-rate/houses-table.hbs', {
      ...getDomainAndPort(),
      ...getUserInfo(request),
      housesList: await this.handlebarsService.combineHousesData(),
    });
  }

  // @Get('/houses/quick-rate')
  // @UseGuards(RoleGuard(Role.User))
  // @UseGuards(JwtAuthGuard)
  // @UseFilters(NotLoggedInFilter)
  // async houseQuickRateList(
  //     @Req() request: RequestWithUser,
  //     @Res() res: Response,
  // ) {
  //     return res.render('forms/quick-rate/houses-table.hbs', {
  //         ...getDomainAndPort(),
  //         ...getUserInfo(request),
  //         housesList: await this.handlebarsService.combineHousesData(),
  //     })
  // }

  @SkipThrottle({ short: true })
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

    const houseData = await this.housesService.getOneRecord(number);
    const houseID = houseData.id;

    const imagesDir = path.join(
      process.cwd(),
      'src/public/images/offers',
      houseData.offerId,
    );
    const imageFiles = await getImagesFromDirectory(imagesDir);

    return res.render('forms/standard-rate/house.hbs', {
      ...getDomainAndPort(),
      ...getUserInfo(request),
      house_data: houseData,
      house_ans_data: await this.housesAnswersService.getOneRecordByID(houseID),
      lastNumber: await this.housesService.getLastNumber(),
      images: imageFiles
        ? imageFiles.map((image) => `${houseData.offerId}/${image}`)
        : [],
    });
  }

  // @Get('/houses/quick-rate/:number')
  // @UseGuards(RoleGuard(Role.User))
  // @UseGuards(JwtAuthGuard)
  // @UseFilters(NotLoggedInFilter)
  // async housesQuickRateProfile(
  //     @Req() request: RequestWithUser,
  //     @Res() res: Response,
  //     @Param('number') number: number,
  // ) {

  //     try {
  //         await this.housesService.getOneRecord(number);
  //     } catch (err) {
  //         return res.redirect('/houses/quick-rate/');
  //     }

  //     const houseData = await this.housesService.getOneRecord(number)
  //     const houseID = houseData.id
  //     const imagesDir = path.join(process.cwd(), 'src/public/images/offers', houseData.offerId);
  //     const images = await getImagesFromDirectory(imagesDir);
  //     const imageUrls = images.map(image => `${houseData.offerId}/${image}`);

  //     return res.render('forms/quick-rate/house.hbs', {
  //         ...getDomainAndPort(),
  //         ...getUserInfo(request),
  //         house_data: houseData,
  //         house_ans_data: await this.housesAnswersService.getOneRecordByID(houseID),
  //         lastNumber: await this.housesService.getLastNumber(),
  //         images: imageUrls,
  //     });
  // }

  // ------------------------------------------------------------------
  // ------------------------------PLOTS-------------------------------
  // ------------------------------------------------------------------

  @Get('/plots/')
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @UseFilters(NotLoggedInFilter)
  async plotList(@Req() request: RequestWithUser, @Res() res: Response) {
    return res.render('forms/standard-rate/plots-table.hbs', {
      ...getDomainAndPort(),
      ...getUserInfo(request),
      plotsList: await this.handlebarsService.combinePlotsData(),
    });
  }

  // @Get('/plots/quick-rate')
  // @UseGuards(RoleGuard(Role.User))
  // @UseGuards(JwtAuthGuard)
  // @UseFilters(NotLoggedInFilter)
  // async plotQuickRateList(
  //     @Req() request: RequestWithUser,
  //     @Res() res: Response,
  // ) {
  //     return res.render('forms/quick-rate/plots-table.hbs', {
  //         ...getDomainAndPort(),
  //         ...getUserInfo(request),
  //         plotsList: await this.handlebarsService.combinePlotsData(),
  //     })
  // }

  @SkipThrottle({ short: true })
  @Get('/plots/:number')
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @UseFilters(NotLoggedInFilter)
  async plotProfile(
    @Req() request: RequestWithUser,
    @Res() res: Response,
    @Param('number') number: number,
  ) {
    // Checks if plot exists
    try {
      await this.plotsService.getOneRecord(number);
    } catch (err) {
      return res.redirect('/plots/');
    }

    const plotData = await this.plotsService.getOneRecord(number);
    const plotID = plotData.id;

    const imagesDir = path.join(
      process.cwd(),
      'src/public/images/offers',
      plotData.offerId,
    );
    const imageFiles = await getImagesFromDirectory(imagesDir);

    return res.render('forms/standard-rate/plot.hbs', {
      ...getDomainAndPort(),
      ...getUserInfo(request),
      plot_data: plotData,
      plot_ans_data: await this.plotsAnswersService.getOneRecordByID(plotID),
      lastNumber: await this.plotsService.getLastNumber(),
      images: imageFiles
        ? imageFiles.map((image) => `${plotData.offerId}/${image}`)
        : [],
    });
  }

  // @Get('/plots/quick-rate/:number')
  // @UseGuards(RoleGuard(Role.User))
  // @UseGuards(JwtAuthGuard)
  // @UseFilters(NotLoggedInFilter)
  // async plotsQuickRateProfile(
  //     @Req() request: RequestWithUser,
  //     @Res() res: Response,
  //     @Param('number') number: number,
  // ) {

  //     try {
  //         await this.plotsService.getOneRecord(number);
  //     } catch (err) {
  //         return res.redirect('/plots/quick-rate/');
  //     }

  //     const plotData = await this.plotsService.getOneRecord(number)
  //     const plotID = plotData.id
  //     const imagesDir = path.join(process.cwd(), 'src/public/images/offers', plotData.offerId);
  //     const images = await getImagesFromDirectory(imagesDir);
  //     const imageUrls = images.map(image => `${plotData.offerId}/${image}`);

  //     return res.render('forms/quick-rate/plot.hbs', {
  //         ...getDomainAndPort(),
  //         ...getUserInfo(request),
  //         plot_data: plotData,
  //         plot_ans_data: await this.plotsAnswersService.getOneRecordByID(plotID),
  //         lastNumber: await this.plotsService.getLastNumber(),
  //         images: imageUrls,
  //     });
  // }
}
