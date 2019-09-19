import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,

} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Inventory extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public cost: string;

    @ManyToOne(type => User, user => user.inventory, {eager: false})
    user: User;

}
