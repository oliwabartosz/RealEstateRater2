import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FlatsData} from "./entities/flats-data.entity";
import {DeleteResult, Repository} from "typeorm";
import {FlatRecord} from "../interfaces/flat-record";
import {CreateFlatDto} from "./dto/create-flat.dto";
import {FlatsAnswers} from "./entities/flats-answers.entity";
import {AddFlatAnswersDto} from "./dto/add-flat-answers.dto";

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

    public async getAllRecordsIDs(): Promise<FlatRecord[]> {
        return await this.flatsDataRepository.find({
            select: ["id"]
        });
    }

    public async getOneRecord(flatNumber: number): Promise<FlatsData> {
        return await this.flatsDataRepository.findOneByOrFail({ flatNumber });
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
        @InjectRepository(FlatsAnswers) private flatsAnswersRepository: Repository<FlatsAnswers>
    ){}

    public async createNewAnswersRecord(addAnswersPayload: AddFlatAnswersDto, user: string): Promise<FlatsAnswers> {

        const existingRecord = await this.flatsAnswersRepository.findOne({
            where:
                {flatID: addAnswersPayload.flatID }
        });

        if (existingRecord) {
            throw new HttpException(`Answer record exists`, HttpStatus.BAD_REQUEST);
        }

        const newAnsRecord = this.flatsAnswersRepository.create(addAnswersPayload);
        newAnsRecord.user = user;
        newAnsRecord.rateStatus = "done";
        await this.flatsAnswersRepository.save(newAnsRecord);
        return newAnsRecord;
    }

    public async updateAnswersRecord(flatID: string, updatedData: Partial<AddFlatAnswersDto>): Promise<FlatsAnswers> {

        // Get existing record
        const existingRecord = await this.flatsAnswersRepository.findOne({ where: {flatID} })

        if (!existingRecord) {
            throw new HttpException(`Answer record with ID ${flatID} not found`, HttpStatus.NOT_FOUND );
        }

        // Update
        const updatedRecord = { ...existingRecord, ...updatedData };
        await this.flatsAnswersRepository.save(updatedRecord);

        // Return
        return updatedRecord;

    }


}