import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderProductEntity } from "src/database/entities/order-products.entity";
import { OrderEntity } from "src/database/entities/order.entity";

import { Repository, UpdateResult } from 'typeorm';
@Injectable()
export class LocalService {
    constructor(
        @InjectRepository(OrderProductEntity)
        private readonly order_productRepository : Repository<OrderProductEntity>,
    ) {}
}