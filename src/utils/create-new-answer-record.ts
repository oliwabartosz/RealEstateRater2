import {AddHouseAnswersDto} from "../houses/dto/add-house-answers.dto";
import {HousesAnswers} from "../houses/enitities/houses-answers.entity";
import {HttpException, HttpStatus} from "@nestjs/common";
import {Repository} from "typeorm";
import {FlatsAnswers} from "../flats/entities/flats-answers.entity";
import {AddFlatAnswersDto} from "../flats/dto/add-flat-answers.dto";
import {FlatsGPT} from "../flats/entities/flats-gpt.entity";
import {AddGPTAnswersDto} from "../flats/dto/add-gpt-answers.dto";
import {AddPlotAnswersDto} from "../plots/dto/add-plot-answers.dto";

export async function createNewAnswersRecord(
    repository: Repository<any>,
    addAnswersPayload: AddFlatAnswersDto | AddHouseAnswersDto | AddGPTAnswersDto | AddPlotAnswersDto,
    user: string,
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
        newAnsRecord.rateStatus = true;
    }

    await repository.save(newAnsRecord);
    return newAnsRecord;
}