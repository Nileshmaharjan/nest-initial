import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {AppUser} from '../app-user/app-user.entity';
import {AppUserRepository} from '../app-user/app-user.repository';
import {UserLogin} from '../../dto/userlogin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getRandom } from '../../utils/helperFunction.utils';

@Injectable()
export class AppUserService {
    constructor(
        @InjectRepository(AppUser)
        private readonly appUserRespository: AppUserRepository,
    ) {}

    public async getOtp(userlogin: UserLogin): Promise<any> {

        const { PhoneNumber } = userlogin;
        console.log(userlogin);
        console.log(PhoneNumber);
        let user = await this.appUserRespository.findOne({ where: {PhoneNumber} });
       

        if (user) {

            const response = await this.appUserRespository.createQueryBuilder()
            .update(AppUser)
            .set({
                Otp: await getRandom(),
            })
            .where('PhoneNumber = :PhoneNumber', {PhoneNumber: 9100})
            .execute();

            // const data = await this.appUserRespository.create({
            //     Otp: await getRandom(),
            // });
            // console.log(data.Otp);
            // console.log(user.PhoneNumber)
            // const response = await this.appUserRespository.update( user.PhoneNumber, userlogin);
            // console.log(user.PhoneNumber);
            // console.log('here');
            // const response = await this.appUserRespository.update(user.CreatedAt, userlogin);

            console.log(response);

        } else {
            console.log('Here');
            user = await this.appUserRespository.create({
                FullName: userlogin.FullName,
                PhoneNumber: userlogin.PhoneNumber,
            });
            console.log(user);
        }

        await this.appUserRespository.save(user);

    }
}
