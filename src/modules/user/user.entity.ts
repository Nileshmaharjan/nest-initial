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

    @OneToMany(type => Book, book => book.user, { eager: true })
    books: Book[];

    public async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return this.password === hash;
    }
}
