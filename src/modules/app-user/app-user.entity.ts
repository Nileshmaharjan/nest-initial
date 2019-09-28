import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';
import { isEmpty } from 'rxjs/operators';
import { getRandom } from '../../utils/helperFunction.utils';


@Entity()
export class AppUser extends BaseEntity {

    @PrimaryGeneratedColumn()
    public MembershipId: number;

    @Column()
    public FullName: string;

    @Column({unique: true})
    @Unique('Duplicate Phonenumber', ['PhoneNumber'])
    public PhoneNumber: number;

    @Column()
    public Otp: number;

    @Column({default: new Date()})
    public CreatedAt: Date;

    @Column({default: new Date()})
    public OtpSentAt: Date;

    @Column({default: null})
    public OtpUsedAt: Date;

    @Column({default: false})
    public OtpUsed: boolean;

    @Column({default: false})
    public UserStatus: boolean;

    @Column({default: false})
    public OtpStatus: boolean;
}