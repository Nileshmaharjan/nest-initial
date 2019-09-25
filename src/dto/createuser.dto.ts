import { ApiModelProperty } from '@nestjs/swagger';
import {
        IsNotEmpty,
        IsNumber,
        MaxLength,
        MinLength} from 'class-validator';

export class CreateUser {
    @IsNotEmpty()
    @IsNumber()
    @ApiModelProperty()
    public id: number;

    @IsNotEmpty()
    @MaxLength(40)
    @MinLength(2)
    @ApiModelProperty()
    public name: string;

    @IsNotEmpty()
    @MaxLength(20)
    @MinLength(8)
    @ApiModelProperty()
    public password: string;

    @IsNotEmpty()
    @ApiModelProperty()
    public phonenumber: number;
}
