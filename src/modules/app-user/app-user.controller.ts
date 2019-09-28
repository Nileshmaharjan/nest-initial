import { Controller, Post, Body } from '@nestjs/common';
import {AppUser} from '../app-user/app-user.entity';
import {AppUserService} from '../app-user/app-user.service';
import { UserLogin } from '../../dto/userlogin.dto';

@Controller('app-user')
export class AppUserController {
    constructor(private readonly appUserService: AppUserService) {}

    @Post('/getotp')
    public getOtp(@Body() userlogin: UserLogin): Promise<AppUser> {
        console.log(userlogin);
        return this.appUserService.getOtp(userlogin);
    }

    @Post('/validateotp')
    public validateOtp(@Body() userlogin: UserLogin): Promise<AppUser> {
        return this.appUserService.validateOtp(userlogin);
    }
}
