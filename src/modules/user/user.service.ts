import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserRepository} from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUser } from 'src/dto/createuser.dto';
import { UserLogin } from 'src/dto/userlogin.dto';
import { TypeOrmErrorFormatter } from '../../utils/helperFunction.utils';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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

        try {
            await user.save();
            return user;
        } catch (error) {
           TypeOrmErrorFormatter(error);

        }
    }

    public async getUsers(): Promise<any> {
        return this.userRepository.find({
            select: ['id', 'name'],
        });
    }

    public async getUserById(id: number): Promise<any> {
        return this.userRepository.findOne(id);
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

}
