import { ApiModelProperty } from '@nestjs/swagger';
import {
    IsNotEmpty, IsString, IsNumber,
} from 'class-validator';

export class UserLogin {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    public password: string;

    @IsNumber()
    @IsNotEmpty()
    public phonenumber: number;
}
