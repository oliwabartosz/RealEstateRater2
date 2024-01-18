import { Module } from '@nestjs/common';
import { PlotsController } from './plots.controller';
import { PlotsService } from './plots.service';

@Module({
  controllers: [PlotsController],
  providers: [PlotsService]
})
export class PlotsModule {}
