import { Test, TestingModule } from '@nestjs/testing';
import { FlatsService } from './flats.service';

describe('FlatsService', () => {
  let service: FlatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlatsService],
    }).compile();

    service = module.get<FlatsService>(FlatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
