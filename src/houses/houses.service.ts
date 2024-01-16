import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {HousesData} from "./enitities/houses-data.entity";
import {HousesAnswers} from "./enitities/houses-answers.entity";
import {HouseListResponse} from "../interfaces/house-record";
import {CreateHouseDto} from "./dto/create-house.dto";
import {AddHouseAnswersDto} from "./dto/add-house-answers.dto";


@Injectable()
export class HousesService {

    constructor(
        @InjectRepository(HousesData) private houseDataRepository: Repository<HousesData>,
        @InjectRepository(HousesAnswers) private houseAnswersRepository: Repository<HousesAnswers>
    ) {
    }
    public async getAllRecords(): Promise<HouseListResponse> {
        return await this.houseDataRepository.find({
            select: ["id", "offerId", "price", "offerType", "offerStatus"]

        });
    }

    public async getAllRecrodsIDs(): Promise<HouseListResponse> {
        return await this.houseDataRepository.find({
            select: ["id"]
        });
    }

    public async getOneRecord(houseNumber: number): Promise<HousesData> {
        return await this.houseDataRepository.findOneByOrFail({ houseNumber });
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
        @InjectRepository(HousesAnswers) private houseAnswersRepository: Repository<HousesAnswers>
    ) {}

    public async createNewAnswersRecord(addAnswersPayload: AddHouseAnswersDto, user: string): Promise<HousesAnswers> {

        const existingRecord = await this.houseAnswersRepository.findOne({
            where:
                {houseID: addAnswersPayload.houseID }
        });

        if (existingRecord) {
            throw new HttpException(`Answer record exists`, HttpStatus.BAD_REQUEST);
        }

        const newAnsRecord = this.houseAnswersRepository.create(addAnswersPayload);
        newAnsRecord.user = user;
        newAnsRecord.rateStatus = "done";
        await this.houseAnswersRepository.save(newAnsRecord);
        return newAnsRecord;
    }

    public async updateAnswersRecord(houseID: string, updatedData: Partial<AddHouseAnswersDto>): Promise<HousesAnswers> {

        // Get existing record
        const existingRecord = await this.houseAnswersRepository.findOne({ where: {houseID} })

        if (!existingRecord) {
            throw new HttpException(`Answer record with ID ${houseID} not found`, HttpStatus.NOT_FOUND );
        }

        // Update
        const updatedRecord = { ...existingRecord, ...updatedData };
        await this.houseAnswersRepository.save(updatedRecord);

        // Return
        return updatedRecord;

    }

}