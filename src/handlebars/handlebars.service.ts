import {Inject, Injectable} from '@nestjs/common';
import {FlatsAnswersService, FlatsGPTService, FlatsService} from "../flats/flats.service";
import {FlatGPTRecord} from "../interfaces/flat-gpt-record";

@Injectable()
export class HandlebarsService {
    constructor(
        @Inject(FlatsService) private flatsService: FlatsService,
        @Inject(FlatsAnswersService) private flatsAnswerService: FlatsAnswersService,
        @Inject(FlatsGPTService) private flatsGPTService: FlatsGPTService,
    ) {
    }

    async combineFlatsData() {

        const scrapedData = await this.flatsService.getAllRecords();
        const answersData = await this.flatsAnswerService.getAllAnswersRecords();
        const gptData = await this.flatsGPTService.getAllGPTRecords();

        return scrapedData.map((item) => {
            const answersRecord = answersData.find((record) => record.flatID === item.id);
            const gptRecord: FlatGPTRecord = gptData.find((record) => record.flatID === item.id);

            return {
                id: item.id,
                flatNumber: item.flatNumber,
                offerId: item.offerId,
                offerType: item.offerType,
                offerStatus: item.offerStatus,
                rateStatus: answersRecord ? answersRecord.rateStatus : false,
                status: gptRecord ? gptRecord.status : false,
                user: answersRecord ? answersRecord.user: false,
                delete: answersRecord ? answersRecord.deleteAns: false,
            }
        });


    }


}
