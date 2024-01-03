import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FlatsData} from "./entities/flats-data.entity";
import {Repository} from "typeorm";
import {FlatRecord} from "../interfaces/flat-record";
import {CreateFlatDto} from "./dto/create-flat.dto";
import {FlatsAnswers} from "./entities/flats-answers.entity";

@Injectable()
export class FlatsService {
    constructor(
        @InjectRepository(FlatsData) private flatsDataRepository: Repository<FlatsData>,
        @InjectRepository(FlatsAnswers) private  flatsAnswersRepository: Repository<FlatsAnswers>
    ) {
    }
    async getAllFlats(): Promise<FlatRecord[]> {
        return await this.flatsDataRepository.find({
            select: ["id", "offerId", "price", "offerType", "offerStatus"]
        });
    }

    async getOneFlat(flatNumber: number): Promise<FlatsData> {
        return await this.flatsDataRepository.findOneByOrFail({ flatNumber });
    }

    async getLastNumber(): Promise<number | null> {

        const {flatNumber} = await this.flatsDataRepository.findOne({
            select: ['flatNumber'],
            order: {flatNumber: 'DESC'},
            where: {}
        });

        return flatNumber ? flatNumber : null;

    }

    async createNewRecord(createFlatDto: CreateFlatDto) {
        const newFlatRecord = this.flatsDataRepository.create(createFlatDto);
        await this.flatsDataRepository.save(newFlatRecord);
        return newFlatRecord;
    }

    async removeRecordsByIDs(ids: string[]) {
        return await this.flatsDataRepository.delete(ids);
    }

    async removeAll() {
        return await this.flatsDataRepository.delete({});
    }
}
