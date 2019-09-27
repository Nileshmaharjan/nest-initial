import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {AppUser} from '../app-user/app-user.entity';
import {AppUserRepository} from '../app-user/app-user.repository';
import {UserLogin} from '../../dto/userlogin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getRandom } from '../../utils/helperFunction.utils';
import { doesNotReject } from 'assert';

@Injectable()
export class AppUserService {
    constructor(
        @InjectRepository(AppUser)
        private readonly appUserRespository: AppUserRepository,
    ) {}

    public async getOtp(userlogin: UserLogin): Promise<any> {

        const { PhoneNumber, MembershipId } = userlogin;
        let user = await this.appUserRespository.findOne({ where: {MembershipId} });

        if (user) {


            await this.appUserRespository.createQueryBuilder()
            .where('PhoneNumber = :PhoneNumber', {PhoneNumber: userlogin.PhoneNumber })
            .update(user)
            .set({
                Otp: await getRandom(),
                OtpUsedAt: new Date(),
            })
            .execute();



        } else {
            user = await this.appUserRespository.create({
                FullName: userlogin.FullName,
                PhoneNumber: userlogin.PhoneNumber,
            });

            await this.appUserRespository.save(user);
        }

    }
}
