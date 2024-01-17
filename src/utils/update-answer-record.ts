import {AddFlatAnswersDto} from "../flats/dto/add-flat-answers.dto";
import {FlatsAnswers} from "../flats/entities/flats-answers.entity";
import {HttpException, HttpStatus} from "@nestjs/common";
import {AddHouseAnswersDto} from "../houses/dto/add-house-answers.dto";
import {Repository} from "typeorm";
import {FlatsGPT} from "../flats/entities/flats-gpt.entity";
import {HousesAnswers} from "../houses/enitities/houses-answers.entity";
import {AddGPTAnswersDto} from "../flats/dto/add-gpt-answers.dto";

export async function updateAnswersRecord(
    repository: Repository<any>,
    id: string,
    updatedData: Partial<AddFlatAnswersDto> | Partial<AddHouseAnswersDto> | Partial<AddGPTAnswersDto>
): Promise<any> {

    const repositoryClass = (
        repository
            .target
            .toString()
            .replace("class ", "")
            .replace(" {\n}", ""));

    let searchID: string = (repositoryClass === 'FlatsAnswers' || repositoryClass === 'FlatsGPT')
        ? "flatID"
        : (repositoryClass === 'HousesAnswers')
            ? "houseID"
            : "plotID";


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