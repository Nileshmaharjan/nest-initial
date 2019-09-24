import { ApiModelProperty } from '@nestjs/swagger';
import {IsString, IsNumber} from 'class-validator';


export class CreateInventory {
    @IsNumber()
    @ApiModelProperty()
    public id: number;

    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsNumber()
    @ApiModelProperty()
    public cost: string;
    
}