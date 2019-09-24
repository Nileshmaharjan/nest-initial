import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateBook {
    @IsNumber()
    @ApiModelProperty()
    public id: number;

    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsString()
    @ApiModelProperty()
    public author: string;

}
