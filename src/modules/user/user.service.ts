import { Injectable, NotFoundException, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserRepository} from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUser } from 'src/dto/createuser.dto';
import { UserLogin } from 'src/dto/userlogin.dto';
import { TypeOrmErrorFormatter } from '../../utils/helperFunction.utils';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {getRandom} from '../../utils/helperFunction.utils';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}
    public async createUser(createUser: CreateUser): Promise<any> {
        const user = new User();
        user.id = createUser.id;
        user.name = createUser.name;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(createUser.password, user.salt);
        user.phonenumber = createUser.phonenumber;

        try {
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
           TypeOrmErrorFormatter(error);

        }
    }

    public async getUsers(): Promise<any> {
        const data =  await this.userRepository.find({
            select: ['id', 'name'],
        });
        return data;
    }

    public async getUserById(id: number) {
        const data = await this.userRepository.findOne(id);

        if (!data) {
            console.log('here');
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return data;
    }

    public async validatePassword(
        userLogin: UserLogin,
    ): Promise<{message: string, accesstoken: string}> {
        const user = await this.userRepository.findOne({
            where: { name: userLogin.name },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (await user.validatePassword(userLogin.password)) {
            const payload = { name: userLogin.name };
            const accesstoken = await this.jwtService.sign(payload);
            return { message: 'Successfully signed', accesstoken };
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    public async getOtpCode(
        userLogin: UserLogin,
    ): Promise<{otpcode: number}> {
        const user = await this.userRepository.findOne({
            where: { phonenumber: userLogin.phonenumber},
        });

        if (user) {
            const otpcode = await getRandom();
            return { otpcode };
        }
    }

}
