import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "src/database/entities/order.entity";
import { Repository, UpdateResult } from 'typeorm';
@Injectable()
export class LocalService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository : Repository<OrderEntity>,
    ) {}
}