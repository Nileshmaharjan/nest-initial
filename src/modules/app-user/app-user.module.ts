import { Module } from '@nestjs/common';
import { AppUserService } from './app-user.service';
import { AppUserController } from './app-user.controller';
import {AppUserRepository} from './app-user.repository';
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([AppUserRepository])],
  providers: [AppUserService],
  controllers: [AppUserController],
})
export class AppUserModule {}
