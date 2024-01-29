import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {FlatsAnswersService, FlatsGPTService, FlatsService} from "../flats/flats.service";

import {RealEstateAnswersRecords, RealEstateRecord, RealEstateRecords} from "../interfaces/combined-data";
import {FlatGPTRecord} from "../interfaces/flat-gpt-record";

@Injectable()
export class HandlebarsService {
    constructor(
        @Inject(FlatsService) private flatsService: FlatsService,
        @Inject(FlatsAnswersService) private flatsAnswerService: FlatsAnswersService,
        @Inject(FlatsGPTService) private flatsGPTService: FlatsGPTService,
    ) {
    }

    async combineData(service: any, realEstateType: "flats" | "houses" | "plots") {
        //@TODO: after making GPT services for houses and plots remember to change GPT Interface;

        let idType: string;

        switch (realEstateType) {
            case "flats":
                idType = "flatID";
                break;
            case "houses":
                idType = "houseID";
                break;
            case "plots":
                idType = "plotID"
        }

        const scrapedData: RealEstateRecords = await service.getAllRecords();
        const answersData: RealEstateAnswersRecords = await service.getAllAnswersRecords();


        //@ TODO: change that when GPT houses and plots services available;
        let gptData: any[] = [];

        if (realEstateType === "flats") {
            gptData = await this.flatsGPTService.getAllGPTRecords();
        }

        const combinedDataByID = scrapedData.map((item: RealEstateRecord) => {
            const answersRecord = answersData.find((record) => record[idType] === item.id);
            const gptRecord: FlatGPTRecord = gptData.find((record) => record[idType] === item.id);
            return {
                ...item,
                answersRecord,
                gptRecord
            }
        });
    }

}
