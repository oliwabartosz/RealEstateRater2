import { AddHouseAnswersDto } from '../houses/dto/add-house-answers.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AddFlatAnswersDto } from '../flats/dto/add-flat-answers.dto';
import { FlatsGPT } from '../flats/entities/flats-gpt.entity';
import { AddGPTAnswersDto } from '../flats/dto/add-gpt-answers.dto';
import { AddPlotAnswersDto } from '../plots/dto/add-plot-answers.dto';

export async function createNewAnswersRecord(
  repository: Repository<any>,
  addAnswersPayload:
    | AddFlatAnswersDto
    | AddHouseAnswersDto
    | AddGPTAnswersDto
    | AddPlotAnswersDto,
  user: string,
): Promise<any> {
  const repositoryClass = repository.target
    .toString()
    .replace('class ', '')
    .replace(' {\n}', '');

  const searchID: string =
    repositoryClass === 'FlatsAnswers' || repositoryClass === 'FlatsGPT'
      ? 'flatID'
      : repositoryClass === 'HousesAnswers'
        ? 'houseID'
        : 'plotID';

  const existingRecord = await repository.findOne({
    where: { [searchID]: addAnswersPayload[searchID] },
  });

  if (existingRecord) {
    throw new HttpException(`Answer record exists`, HttpStatus.BAD_REQUEST);
  }

  const newAnsRecord = repository.create(addAnswersPayload);
  console.log('newAnsRecord', newAnsRecord);

  if (!(newAnsRecord instanceof FlatsGPT)) {
    newAnsRecord.user = user;

    if (!newAnsRecord.rateStatus) {
      newAnsRecord.rateStatus = 'true';
    } else {
      newAnsRecord.rateStatus = newAnsRecord.rateStatus;
    }
  }

  await repository.save(newAnsRecord);
  return newAnsRecord;
}
