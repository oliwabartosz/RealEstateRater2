import { Test, TestingModule } from '@nestjs/testing';
import { FlatsController } from './flats.controller';

describe('FlatsController', () => {
  let controller: FlatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlatsController],
    }).compile();

    controller = module.get<FlatsController>(FlatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
