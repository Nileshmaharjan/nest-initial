import { ApiModelProperty } from '@nestjs/swagger';


export class CreateInventory {
    @ApiModelProperty()
    public id: number;

    @ApiModelProperty()
    public name: string;

    @ApiModelProperty()
    public cost: string;
    
}