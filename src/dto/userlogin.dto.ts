import { ApiModelProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
} from 'class-validator';

export class UserLogin {
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public password: string;
}
