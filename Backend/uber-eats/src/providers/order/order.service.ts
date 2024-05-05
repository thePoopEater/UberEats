import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LocalEntity } from "src/database/entities/local.entity";
import { OrderEntity } from "src/database/entities/order.entity";
import { Repository, UpdateResult } from 'typeorm';
@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository : Repository<OrderEntity>,
    ) {}

    public findOrder(id : number) : Promise<OrderEntity> {
        return this.orderRepository.findOneBy({order_id:id});
    }
    public createOrder(order : OrderEntity) : Promise<OrderEntity>{
        return this.orderRepository.save(order);
    }
    public async findOrdersFromOneLocal(local: LocalEntity) : Promise<OrderEntity[]> {
        let orders : OrderEntity[] = await this.orderRepository.findBy({'local': local});
        for (let order of orders){
            console.log(order.order_products);
        } 
        return orders;
    }
    async findProductsFromOrder(id : number){
    return await this.orderRepository.createQueryBuilder('order')
    .innerJoin('order.order_products','order_product')
    .innerJoin('order_product.product','product')
    .where('order.order_id = :id',{id})
    .select('product')
    .addSelect('order_product.quantity')
    .addSelect('order_product.specification')
    .execute()
    }
}