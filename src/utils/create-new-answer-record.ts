import {AddHouseAnswersDto} from "../houses/dto/add-house-answers.dto";
import {HousesAnswers} from "../houses/enitities/houses-answers.entity";
import {HttpException, HttpStatus} from "@nestjs/common";
import {Repository} from "typeorm";
import {FlatsAnswers} from "../flats/entities/flats-answers.entity";
import {AddFlatAnswersDto} from "../flats/dto/add-flat-answers.dto";
import {FlatsGPT} from "../flats/entities/flats-gpt.entity";

export async function createNewAnswersRecord(
    repository: Repository<FlatsAnswers | FlatsGPT | HousesAnswers>,
    addAnswersPayload: AddFlatAnswersDto | AddHouseAnswersDto,
    user: string,
): Promise<any> {
    let searchID: string = (repository instanceof FlatsAnswers) ? "flatID" :
        (repository instanceof HousesAnswers) ? "houseID" : "plotID";


    const existingRecord = await repository.findOne({
        where:
            {[searchID]: addAnswersPayload[searchID]}
    });

    if (existingRecord) {
        throw new HttpException(`Answer record exists`, HttpStatus.BAD_REQUEST);
    }

    const newAnsRecord = repository.create(addAnswersPayload);


    if (!(newAnsRecord instanceof FlatsGPT)) {
        newAnsRecord.user = user;
        newAnsRecord.rateStatus = "done";
    }


    await repository.save(newAnsRecord);
    return newAnsRecord;
}