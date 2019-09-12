import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import {CreateUser} from '../../dto/createuser.dto';
import { User } from '../user/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    public createUser(@Body() createUser: CreateUser): Promise<User> {
        return this.userService.createUser(createUser);
    }

    @Get()
    public getUsers(): Promise<User> {
        return this.userService.getUsers();
    }

    @Get(':id')
    public getUserbyId(@Param() id) {
        return this.userService.getUserById(id);
    }

    @Post('/login')
    public login(@Body() createUser: CreateUser): Promise<{message: string}> {
        return this.userService.validatePassword(createUser);
    }
}
