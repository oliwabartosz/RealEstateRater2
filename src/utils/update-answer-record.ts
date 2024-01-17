import {AddFlatAnswersDto} from "../flats/dto/add-flat-answers.dto";
import {FlatsAnswers} from "../flats/entities/flats-answers.entity";
import {HttpException, HttpStatus} from "@nestjs/common";
import {AddHouseAnswersDto} from "../houses/dto/add-house-answers.dto";
import {Repository} from "typeorm";
import {FlatsGPT} from "../flats/entities/flats-gpt.entity";
import {HousesAnswers} from "../houses/enitities/houses-answers.entity";

export async function updateAnswersRecord(
    repository: Repository<FlatsAnswers | FlatsGPT | HousesAnswers>,
    id: string,
    updatedData: Partial<AddFlatAnswersDto> | Partial<AddHouseAnswersDto>
): Promise<any> {

    let searchID: string = (repository instanceof FlatsAnswers || FlatsGPT) ? "flatID" :
        (repository instanceof HousesAnswers) ? "houseID" : "plotID";

    // Get existing record
    const existingRecord = await repository.findOne({where: {[searchID]: id}})

    if (!existingRecord) {
        throw new HttpException(`Answer record with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    // Update
    const updatedRecord = {...existingRecord, ...updatedData};
    await repository.save(updatedRecord);

    // Return
    return updatedRecord;

}