import { Inject, Injectable } from '@nestjs/common';
import {
  FlatsAnswersService,
  FlatsGPTService,
  FlatsService,
} from '../flats/flats.service';
import { FlatGPTRecord } from '../interfaces/flat-gpt-record';
import { HousesAnswersService, HousesService } from 'src/houses/houses.service';
import { PlotsAnswersService, PlotsService } from 'src/plots/plots.service';

@Injectable()
export class HandlebarsService {
  constructor(
    @Inject(FlatsService) private flatsService: FlatsService,
    @Inject(FlatsAnswersService)
    private flatsAnswerService: FlatsAnswersService,
    @Inject(FlatsGPTService) private flatsGPTService: FlatsGPTService,
    @Inject(HousesService) private housesService: HousesService,
    @Inject(HousesAnswersService)
    private housesAnswerService: HousesAnswersService,
    @Inject(PlotsService) private plotsService: PlotsService,
    @Inject(PlotsAnswersService)
    private plotsAnswerService: PlotsAnswersService,
  ) {}

  async combineFlatsData() {
    const scrapedData = await this.flatsService.getAllRecords();
    const answersData = await this.flatsAnswerService.getAllAnswersRecords();
    const gptData = await this.flatsGPTService.getAllGPTRecords();

    return scrapedData.map((item) => {
      const answersRecord = answersData.find(
        (record) => record.flatID === item.id,
      );
      const gptRecord: FlatGPTRecord = gptData.find(
        (record) => record.flatID === item.id,
      );

      return {
        id: item.id,
        flatNumber: item.flatNumber,
        offerId: item.offerId,
        offerType: item.offerType,
        offerStatus: item.offerStatus,
        rateStatus: answersRecord ? answersRecord.rateStatus : false,
        status: gptRecord ? gptRecord.status : false,
        user: answersRecord ? answersRecord.user : false,
        delete: answersRecord ? answersRecord.deleteAns : false,
      };
    });
  }

  async combineHousesData() {
    const scrapedData = await this.housesService.getAllRecords();
    const answersData = await this.housesAnswerService.getAllAnswersRecords();

    return scrapedData.map((item) => {
      const answersRecord = answersData.find(
        (record) => record.houseID === item.id,
      );

      return {
        id: item.id,
        houseNumber: item.houseNumber,
        offerId: item.offerId,
        offerType: item.offerType,
        offerStatus: item.offerStatus,
        rateStatus: answersRecord ? answersRecord.rateStatus : false,
        user: answersRecord ? answersRecord.user : false,
        delete: answersRecord ? answersRecord.deleteAns : false,
      };
    });
  }

  async combinePlotsData() {
    const scrapedData = await this.plotsService.getAllRecords();
    const answersData = await this.plotsAnswerService.getAllAnswersRecords();

    return scrapedData.map((item) => {
      const answersRecord = answersData.find(
        (record) => record.plotID === item.id,
      );

      return {
        id: item.id,
        plotNumber: item.plotNumber,
        offerId: item.offerId,
        offerType: item.offerType,
        offerStatus: item.offerStatus,
        rateStatus: answersRecord ? answersRecord.rateStatus : false,
        user: answersRecord ? answersRecord.user : false,
        delete: answersRecord ? answersRecord.deleteAns : false,
      };
    });
  }
}
