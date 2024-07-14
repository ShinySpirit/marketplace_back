import { Test, TestingModule } from '@nestjs/testing';
import { PromotionalController } from './promotional.controller';
import { PromotionalService } from './promotional.service';

describe('PromotionalController', () => {
  let controller: PromotionalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromotionalController],
      providers: [PromotionalService],
    }).compile();

    controller = module.get<PromotionalController>(PromotionalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
