import { Test, TestingModule } from '@nestjs/testing';
import { Catch404Service } from './catch404.service';

describe('Catch404Service', () => {
  let service: Catch404Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Catch404Service],
    }).compile();

    service = module.get<Catch404Service>(Catch404Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
