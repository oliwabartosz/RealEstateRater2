import { HttpException, HttpStatus } from '@nestjs/common';
import { FlatsService } from '../flats/flats.service';
import { HousesService } from '../houses/houses.service';
import { PlotsService } from '../plots/plots.service';

export async function checkIfIdExists(
  service: FlatsService | HousesService | PlotsService,
  recordID: string,
): Promise<void> {
  const allowedIDs = await service.getAllRecordsIDs();
  const idArray: string[] = allowedIDs.map((recordData) => recordData.id);

  if (!idArray.includes(recordID)) {
    throw new HttpException(
      'ID in JSON payload is not correct!',
      HttpStatus.BAD_REQUEST,
    );
  }
}
