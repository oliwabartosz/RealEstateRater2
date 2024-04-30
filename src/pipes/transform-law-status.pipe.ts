import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateFlatDto } from '../flats/dto/create-flat.dto';
import { TransformedLawStatus } from '../interfaces/transformed-law-status';
import { CreateHouseDto } from '../houses/dto/create-house.dto';

@Injectable()
export class TransformLawStatusPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(scrapedPayload: any, metadata: ArgumentMetadata): any {
    if (scrapedPayload instanceof CreateFlatDto || CreateHouseDto) {
      if (
        scrapedPayload.lawStatus !== undefined ||
        scrapedPayload.lawStatusLemma !== undefined
      ) {
        const transformedDto: TransformedLawStatus = {
          ...scrapedPayload,
          legalStatus: scrapedPayload.lawStatus,
          legalStatusLemma: scrapedPayload.lawStatusLemma,
        };

        delete transformedDto.lawStatus;
        delete transformedDto.lawStatusLemma;

        return transformedDto as CreateFlatDto;
      }

      // If neither lawStatus nor lawStatusLemma is present, no transformation is needed
      return scrapedPayload;
    }
    throw new BadRequestException('Invalid request payload');
  }
}
