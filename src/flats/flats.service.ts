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
        @InjectRepository(FlatsAnswers) private flatsAnswersRepository: Repository<FlatsAnswers>
    ) {
    }
    public async getAllFlats(): Promise<FlatRecord[]> {
        return await this.flatsDataRepository.find({
            select: ["id", "offerId", "price", "offerType", "offerStatus"]

        });
    }

    public async getOneFlat(flatNumber: number): Promise<FlatsData> {
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

    public async createNewRecord(createFlatDto: CreateFlatDto): Promise<FlatsData> {
        const newFlatRecord = this.flatsDataRepository.create(createFlatDto);
        await this.flatsDataRepository.save(newFlatRecord);
        return newFlatRecord;
    }

    public async createNewAnswersRecord(addFlatAnswers: AddFlatAnswersDto): Promise<FlatsAnswers> {

        const existingRecord = await this.flatsAnswersRepository.findOne({
            where:
                {flatID: addFlatAnswers.flatId }
        });

        if (!existingRecord) {
            throw new HttpException(`Answer record exists`, HttpStatus.BAD_REQUEST);
        }

        const newFlatAnsRecord = this.flatsAnswersRepository.create(addFlatAnswers);
        await this.flatsAnswersRepository.save(newFlatAnsRecord);
        return newFlatAnsRecord;
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

    public async removeRecordsByIDs(ids: string[]): Promise<DeleteResult> {
        return await this.flatsDataRepository.delete(ids);
    }

    public async removeAll(): Promise<DeleteResult> {
        return await this.flatsDataRepository.delete({});
    }
}

