import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { InventoryService } from '../inventory/inventory.service';
import { CreateInventory } from '../../dto/createinventory.dto';
import { getUser } from '../user/getUser.decorator';
import { User } from '../user/user.entity';
import { Inventory } from './inventory.entity';
import { AuthGuard } from '@nestjs/passport'

@Controller('inventory')
@UseGuards(AuthGuard('jwt'))
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    @Post()
    public CreateInventory(
        @Body() createInventory: CreateInventory,
        @getUser() user: User,
    ): Promise<Inventory> {
        return this.inventoryService.createInventory(createInventory, user);
    }

    @Get()
    public getInventory(): Promise<Inventory> {
        return this.inventoryService.getInventory();
    }
}
