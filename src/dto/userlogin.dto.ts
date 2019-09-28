import { ApiModelProperty } from '@nestjs/swagger';
import {
    IsNotEmpty, IsString, IsNumber, IsDate, IsBoolean,
} from 'class-validator';

export class UserLogin {

    @ApiModelProperty()
    @IsNotEmpty()
    public MembershipId: number;

    @ApiModelProperty()
    @IsNotEmpty()
    public FullName: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    public PhoneNumber: number;

    @ApiModelProperty()
    @IsNotEmpty()
    public Otp: number;

    @ApiModelProperty()
    @IsNotEmpty()
    public CreatedAt: Date;

    @ApiModelProperty()
    @IsNotEmpty()
    public OtpSentAt: Date;

    @ApiModelProperty()
    public OtpUsedAt: Date;

    @ApiModelProperty()
    @IsNotEmpty()
    public OtpUsed: boolean;

    @ApiModelProperty()
    @IsNotEmpty()
    public UserStatus: boolean;

    @ApiModelProperty()
    @IsNotEmpty()
    public OtpStatus: boolean;

}
