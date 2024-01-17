import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FlatsData} from "./entities/flats-data.entity";
import {DeleteResult, Repository} from "typeorm";
import {FlatRecord, FlatsListResponse} from "../interfaces/flat-record";
import {CreateFlatDto} from "./dto/create-flat.dto";
import {FlatsAnswers} from "./entities/flats-answers.entity";
import {AddFlatAnswersDto} from "./dto/add-flat-answers.dto";
import {FlatsGPT} from "./entities/flats-gpt.entity";
import {FlatGPTRecord} from "../interfaces/flat-gpt-record";
import {AddGPTAnswersDto} from "./dto/add-gpt-answers.dto";
import {createNewAnswersRecord} from "../utils/create-new-answer-record";
import {updateAnswersRecord} from "../utils/update-answer-record";
import {checkIfIdExists} from "../utils/check-if-id-exists";

@Injectable()
export class FlatsService {
    constructor(
        @InjectRepository(FlatsData) private flatsDataRepository: Repository<FlatsData>,
    ) {
    }

    public async getAllRecords(): Promise<FlatRecord[]> {
        return await this.flatsDataRepository.find({
            select: ["id", "offerId", "price", "offerType", "offerStatus"]
        });
    }

    public async getAllRecordsIDs(): Promise<FlatsListResponse> {
        return await this.flatsDataRepository.find({
            select: ["id"]
        });
    }

    public async getOneRecord(flatNumber: number): Promise<FlatsData> {
        return await this.flatsDataRepository.findOneByOrFail({flatNumber});
    }

    public async getLastNumber(): Promise<number | null> {

        const {flatNumber} = await this.flatsDataRepository.findOne({
            select: ['flatNumber'],
            order: {flatNumber: 'DESC'},
            where: {}
        });

        return flatNumber ? flatNumber : null;

    }

    public async createNewRecord(createRecordPayload: CreateFlatDto): Promise<FlatsData> {
        const newRecord = this.flatsDataRepository.create(createRecordPayload);
        await this.flatsDataRepository.save(newRecord);
        return newRecord;
    }

    public async removeRecordsByIDs(ids: string[]): Promise<DeleteResult> {
        return await this.flatsDataRepository.delete(ids);
    }

    public async removeAll(): Promise<DeleteResult> {
        return await this.flatsDataRepository.delete({});
    }
}


@Injectable()
export class FlatsAnswersService {


    constructor(
        @InjectRepository(FlatsAnswers) private flatsAnswersRepository: Repository<FlatsAnswers>,
        private readonly flatsService: FlatsService,
    ) {
    }

    public async createOrUpdateAnswer(recordID: string, user: string, dto: AddFlatAnswersDto): Promise<FlatsAnswers> {

        await checkIfIdExists(this.flatsService, recordID);

        try {
            return await createNewAnswersRecord(this.flatsAnswersRepository, dto, user, false);
        } catch (err) {

            if (err instanceof HttpException && err.getStatus() === HttpStatus.BAD_REQUEST) {
                return await updateAnswersRecord(this.flatsAnswersRepository, dto.flatID, dto);

            } else {
                console.error(err);
                throw new HttpException("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }


}

@Injectable()
export class FlatsGPTService {
    constructor(
        @InjectRepository(FlatsGPT) private flatsGPTRepository: Repository<FlatsGPT>,
        private flatsService: FlatsService
    ) {
    }

    public async getAllGPTRecords(): Promise<FlatGPTRecord[]> {
        return await this.flatsGPTRepository.find({
            select: ["flatID", "status"]
        });
    }

    public async getAllRecordsIDs(): Promise<FlatGPTRecord[]> {
        return await this.flatsGPTRepository.find({
            select: ["flatID"]
        });
    }

    public async createOrUpdateGPTAnswer(recordID: string, user: string, dto: AddGPTAnswersDto): Promise<FlatsGPT> {
        const allowedIDs = await this.flatsService.getAllRecordsIDs();
        const idArray = allowedIDs.map(recordData => recordData.id);

        if (!idArray.includes(recordID)) {
            throw new HttpException("ID in JSON payload is not correct!", HttpStatus.BAD_REQUEST);
        }

        try {
            // Insert
            return await this.createNewAnswersRecord(dto, user);

        } catch (err) {
            // Update
            if (err instanceof HttpException && err.getStatus() === HttpStatus.BAD_REQUEST) {

                return await this.updateAnswersRecord(
                    dto.flatID,
                    dto
                );

            } else {

                throw new HttpException("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);

            }
        }
    }

    private async createNewAnswersRecord(addAnswersPayload: AddGPTAnswersDto, user: string): Promise<FlatsGPT> {

        const existingRecord = await this.flatsGPTRepository.findOne({
            where:
                {flatID: addAnswersPayload.flatID}
        });

        if (existingRecord) {
            throw new HttpException(`Answer record exists`, HttpStatus.BAD_REQUEST);
        }

        const newAnsRecord = this.flatsGPTRepository.create(addAnswersPayload);
        await this.flatsGPTRepository.save(newAnsRecord);
        return newAnsRecord;
    }

    private async updateAnswersRecord(flatID: string, updatedData: Partial<AddGPTAnswersDto>): Promise<FlatsGPT> {

        // Get existing record
        const existingRecord = await this.flatsGPTRepository.findOne({where: {flatID}})

        if (!existingRecord) {
            throw new HttpException(`Answer record with ID ${flatID} not found`, HttpStatus.NOT_FOUND);
        }

        // Update
        const updatedRecord = {...existingRecord, ...updatedData};
        await this.flatsGPTRepository.save(updatedRecord);

        // Return
        return updatedRecord;

    }

}

