import { Test, TestingModule } from '@nestjs/testing';
import { HandlebarsController } from './handlebars.controller';

describe('HandlebarsController', () => {
  let controller: HandlebarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HandlebarsController],
    }).compile();

    controller = module.get<HandlebarsController>(HandlebarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
