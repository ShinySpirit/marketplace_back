import { Test, TestingModule } from '@nestjs/testing';
import { Catch404Controller } from './catch404.controller';
import { Catch404Service } from './catch404.service';

describe('Catch404Controller', () => {
  let controller: Catch404Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Catch404Controller],
      providers: [Catch404Service],
    }).compile();

    controller = module.get<Catch404Controller>(Catch404Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
