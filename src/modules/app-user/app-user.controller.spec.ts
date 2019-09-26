import { Test, TestingModule } from '@nestjs/testing';
import { AppUserController } from './app-user.controller';

describe('AppUser Controller', () => {
  let controller: AppUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppUserController],
    }).compile();

    controller = module.get<AppUserController>(AppUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
