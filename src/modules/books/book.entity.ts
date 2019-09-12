import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,

} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public author: string;

    @ManyToOne(type => User, user => user.books)
    user: User;

    @Column()
    public userid: number;

}
