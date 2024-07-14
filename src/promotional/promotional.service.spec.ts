import { Test, TestingModule } from '@nestjs/testing';
import { PromotionalService } from './promotional.service';

describe('PromotionalService', () => {
  let service: PromotionalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionalService],
    }).compile();

    service = module.get<PromotionalService>(PromotionalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
