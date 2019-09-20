import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    Entity,
    Unique,
    OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Book } from '../books/book.entity';
import { Inventory } from '../inventory/inventory.entity';
import {getRandom} from '../../utils/helperFunction.utils';

@Entity()
@Unique(['id'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public password: string;

    @Column()
    public salt: string;

    @Column()
    public phonenumber: number;

    @OneToMany(type => Book, book => book.user, { eager: true })
    books: Book[];

    @OneToMany(type => Inventory, inventory => inventory.user, {eager: true})
    inventory: Inventory[];

    public async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return this.password === hash;
    }

    // public async getOtpCode(phonenumber: number): Promise<any> {
    //     const otpcode = await getRandom();
    //     return otpcode;
    // }
}
