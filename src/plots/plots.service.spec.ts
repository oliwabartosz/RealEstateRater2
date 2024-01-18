import { Test, TestingModule } from '@nestjs/testing';
import { PlotsService } from './plots.service';

describe('PlotsService', () => {
  let service: PlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlotsService],
    }).compile();

    service = module.get<PlotsService>(PlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
