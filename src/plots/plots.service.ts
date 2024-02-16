import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {checkIfIdExists} from "../utils/check-if-id-exists";
import {createNewAnswersRecord} from "../utils/create-new-answer-record";
import {updateAnswersRecord} from "../utils/update-answer-record";
import {PlotsData} from "./entities/plots.entity";
import {PlotRecord, PlotsListResponse} from "../interfaces/plot-record";
import {CreatePlotDto} from "./dto/create-plot.dto";
import {PlotsAnswers} from "./entities/plots-answers.entity";
import {AddPlotAnswersDto} from "./dto/add-plot-answers.dto";
import {FlatsListResponse} from "../interfaces/flat-record";

@Injectable()
export class PlotsService {
    constructor(
        @InjectRepository(PlotsData) private plotsDataRepository: Repository<PlotsData>,
    ) {}

    public async getAllRecords(): Promise<PlotsListResponse> {
        return await this.plotsDataRepository.find({
            select: ["id", "plotNumber", "offerId", "price", "offerType", "offerStatus"],
            order: {plotNumber: 'ASC'}


        });
    }

    // This method is used by functions in utils
    public async getAllRecordsIDs(): Promise<FlatsListResponse> {
        return await this.plotsDataRepository.find({
            select: ["id"]
        });
    }

    public async getOneRecord(plotNumber: number): Promise<PlotRecord> {
        return await this.plotsDataRepository.findOneByOrFail({plotNumber});
    }

    public async getLastNumber(): Promise<number | null> {

        const {plotNumber} = await this.plotsDataRepository.findOne({
            select: ['plotNumber'],
            order: {plotNumber: 'DESC'},
            where: {}
        });

        return plotNumber ? plotNumber : null;

    }

    public async createNewRecord(createRecordPayload: CreatePlotDto): Promise<PlotsData> {
        const newRecord = this.plotsDataRepository.create(createRecordPayload);
        await this.plotsDataRepository.save(newRecord);
        return newRecord;
    }

    public async removeRecordsByIDs(ids: string[]): Promise<DeleteResult> {
        return await this.plotsDataRepository.delete(ids);
    }

    public async removeAll(): Promise<DeleteResult> {
        return await this.plotsDataRepository.delete({});
    }

}

@Injectable()
export class PlotsAnswersService {
    constructor(
        @InjectRepository(PlotsAnswers) private plotsAnswersRepository: Repository<PlotsAnswers>,
        private plotService: PlotsService,
    ) {}

    public async getAllAnswersRecords(): Promise<PlotsAnswers[]> {
        return await this.plotsAnswersRepository.find({
            select: ["plotID", "rateStatus", "user", "deleteAns"]
        });
    }


    public async getOneRecordByID(plotID: string): Promise<PlotsAnswers> {
        return await this.plotsAnswersRepository.findOne({where: {plotID}});
    }


    public async createOrUpdateAnswer(recordID: string, user: string, dto: AddPlotAnswersDto): Promise<PlotsAnswers> {
        await checkIfIdExists(this.plotService, recordID);

        try {
            return await createNewAnswersRecord(this.plotsAnswersRepository as Repository<PlotsAnswers>, dto, user);
        } catch (err) {

            if (err instanceof HttpException && err.getStatus() === HttpStatus.BAD_REQUEST) {
                return await updateAnswersRecord(this.plotsAnswersRepository as Repository<PlotsAnswers>, dto.plotID, dto);

            } else {
                console.error(err);
                throw new HttpException("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
