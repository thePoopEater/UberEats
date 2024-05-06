import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderProductEntity } from "src/database/entities/order-products.entity";
import { OrderEntity } from "src/database/entities/order.entity";
import { Repository, UpdateResult } from 'typeorm';
@Injectable()
export class OrderProductService {

    constructor(
        @InjectRepository(OrderProductEntity)
        private readonly orderProductRepository : Repository<OrderProductEntity>
        ) {}
        
    public async saveOrderProduct(order : OrderProductEntity) : Promise<OrderProductEntity> {
        return await this.orderProductRepository.save(order);
    }

    public async getOrderProduct(order_product_id : number) : Promise<OrderProductEntity>{
        return await this.orderProductRepository.findOneBy({id:order_product_id});
    }

    public async getAllProductsFromOrder(order_id : number) : Promise<OrderProductEntity[]>{
        return this.orderProductRepository.findBy({id:order_id});
    }

    
}