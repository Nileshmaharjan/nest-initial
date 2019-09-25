import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateInventory } from 'src/dto/createinventory.dto';
import { Inventory } from './inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryRepository } from './inventory.repository';
import { User } from '../user/user.entity';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private readonly inventoryRepository: InventoryRepository,
    ) {}

    public async createInventory(createInventory: CreateInventory, user: User): Promise<any> {
        const inventory = new Inventory();
        inventory.id = createInventory.id;
        inventory.name = createInventory.name;
        inventory.cost = createInventory.cost;
        inventory.user = user;

        await inventory.save();
        return inventory;
    }

    public async getInventory(): Promise<any> {

        const allInventory = await this.inventoryRepository.createQueryBuilder('inventory')
        .leftJoinAndSelect('inventory.user', 'user')
        .select([
            'inventory',
            'user.name',
        ])
        .getMany();
        return allInventory;
    }

    public async getInventoryById(Id) {
        const inventory = await this.inventoryRepository.createQueryBuilder('inventory')
        .leftJoinAndSelect('inventory.user', 'user')
        .where('inventory.id = :id', Id)
        .select([
            'inventory',
            'user.name',
        ])
        .getOne();

        return inventory;
    }
}
