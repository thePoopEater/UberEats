import { Test, TestingModule } from '@nestjs/testing';
import { LocalController } from './local.controller';
import { LocalService } from 'src/providers/local/local.service';

describe('LocalController', () => {
  let controller: LocalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalController],
      imports : [LocalService],
      providers: [LocalService]
    }).compile();

    controller = module.get<LocalController>(LocalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
