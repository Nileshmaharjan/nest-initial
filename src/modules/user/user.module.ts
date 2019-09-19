import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import config from '../../config/index';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),
            PassportModule,
          JwtModule.register({
            secret: config.secret,
            signOptions: {expiresIn: '10800s'},
          })],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
