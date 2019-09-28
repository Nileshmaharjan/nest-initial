import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {AppUser} from '../app-user/app-user.entity';
import {AppUserRepository} from '../app-user/app-user.repository';
import {UserLogin} from '../../dto/userlogin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getRandom, TypeOrmErrorFormatter } from '../../utils/helperFunction.utils';
import { doesNotReject } from 'assert';

@Injectable()
export class AppUserService {
    constructor(
        @InjectRepository(AppUser)
        private readonly appUserRespository: AppUserRepository,
    ) {}

    public async getOtp(userlogin: UserLogin): Promise<any> {

        try {

            const { PhoneNumber } = userlogin;
            let user = await this.appUserRespository.findOne({ where: {PhoneNumber} });


            if (user) {
                await this.appUserRespository.createQueryBuilder()
                .where('PhoneNumber = :PhoneNumber', {PhoneNumber: userlogin.PhoneNumber })
                .update(AppUser)
                .set({
                    Otp: await getRandom(),
                    CreatedAt: new Date(),
                })
                .execute();
                throw new HttpException('The message was succeeded', HttpStatus
                .OK);

            } else {
                user = await this.appUserRespository.create({
                    FullName: userlogin.FullName,
                    PhoneNumber: userlogin.PhoneNumber,
                    Otp: await getRandom(),
                });
                await this.appUserRespository.save(user);
                throw new HttpException('The message was succeeded', HttpStatus.OK);
            }
        } catch (e) {
            throw new HttpException('Error', HttpStatus.BAD_REQUEST);
        }

    }

    public async validateOtp(userlogin: UserLogin): Promise<any> {

        const {PhoneNumber, Otp} = userlogin;

        const user = await this.appUserRespository.findOne({where: {PhoneNumber, Otp}});

        if (user) {

            await this.appUserRespository.createQueryBuilder()
            .where('PhoneNumber = :PhoneNumber', {PhoneNumber: userlogin.PhoneNumber})
            .andWhere('Otp = :Otp', {Otp: userlogin.Otp})
            .update(AppUser)
            .set({
                OtpUsedAt: new Date(),
                OtpUsed: true,
                UserStatus: true,
                OtpStatus: true,

            })
            .execute();
            throw new HttpException('The message was succeeded', HttpStatus.OK);
        } else {
            throw new HttpException('Inccorrect Otp', HttpStatus.BAD_REQUEST);

        }
    }
}
