import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {HousesData} from "./enitities/houses-data.entity";
import {HousesAnswers} from "./enitities/houses-answers.entity";
import {HouseListResponse} from "../interfaces/house-record";
import {CreateHouseDto} from "./dto/create-house.dto";
import {AddHouseAnswersDto} from "./dto/add-house-answers.dto";
import {checkIfIdExists} from "../utils/check-if-id-exists";
import {createNewAnswersRecord} from "../utils/create-new-answer-record";
import {updateAnswersRecord} from "../utils/update-answer-record";


@Injectable()
export class HousesService {

    constructor(
        @InjectRepository(HousesData) private houseDataRepository: Repository<HousesData>,
    ) {
    }

    public async getAllRecords(): Promise<HouseListResponse> {
        return await this.houseDataRepository.find({
            select: ["id", "offerId", "price", "offerType", "offerStatus"]

        });
    }

    public async getAllRecordsIDs(): Promise<HouseListResponse> {
        return await this.houseDataRepository.find({
            select: ["id"]
        });
    }

    public async getOneRecord(houseNumber: number): Promise<HousesData> {
        return await this.houseDataRepository.findOneByOrFail({houseNumber});
    }

    public async getLastNumber(): Promise<number | null> {

        const {houseNumber} = await this.houseDataRepository.findOne({
            select: ['houseNumber'],
            order: {houseNumber: 'DESC'},
            where: {}
        });

        return houseNumber ? houseNumber : null;

    }

    public async createNewRecord(createRecordPayload: CreateHouseDto): Promise<HousesData> {
        const newRecord = this.houseDataRepository.create(createRecordPayload);
        await this.houseDataRepository.save(newRecord);
        return newRecord;
    }

    public async removeRecordsByIDs(ids: string[]): Promise<DeleteResult> {
        return await this.houseDataRepository.delete(ids);
    }

    public async removeAll(): Promise<DeleteResult> {
        return await this.houseDataRepository.delete({});
    }
}

@Injectable()
export class HousesAnswersService {


    constructor(
        @InjectRepository(HousesAnswers) private houseAnswersRepository: Repository<HousesAnswers>,
        private houseService: HousesService,
    ) {
    }

    public async createOrUpdateAnswer(recordID: string, user: string, dto: AddHouseAnswersDto): Promise<HousesAnswers> {
        await checkIfIdExists(this.houseService, recordID);

        try {
            return await createNewAnswersRecord(this.houseAnswersRepository as Repository<HousesAnswers>, dto, user);
        } catch (err) {

            if (err instanceof HttpException && err.getStatus() === HttpStatus.BAD_REQUEST) {
                return await updateAnswersRecord(this.houseAnswersRepository as Repository<HousesAnswers>, dto.houseID, dto);

            } else {
                console.error(err);
                throw new HttpException("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}