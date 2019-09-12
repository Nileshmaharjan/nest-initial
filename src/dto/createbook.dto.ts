import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBook {
    @ApiModelProperty()
    public id: number;

    @ApiModelProperty()
    public name: string;

    @ApiModelProperty()
    public author: string;

}
