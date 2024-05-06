import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderCreateDTO } from "src/controllers/order/dto/order-create.dto";
import { LocalEntity } from "src/database/entities/local.entity";
import { OrderEntity } from "src/database/entities/order.entity";
import { Repository, UpdateResult } from 'typeorm';
import { LocalService } from "../local/local.service";
import { ClientService } from "../client/client.service";
@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository : Repository<OrderEntity>,

        private localService : LocalService,
        private clientService : ClientService
        ) {}

    public findOrder(id : number) : Promise<OrderEntity> {
        return this.orderRepository.findOneBy({order_id:id});
    }
    public async createOrder(order : OrderCreateDTO) : Promise<OrderEntity>{
        const local = await this.localService.getLocal(order.local_id);
        const client = await this.clientService.findClient(order.client_id);
        if (local && client){
            const new_order = new OrderEntity(order);
            new_order.client = client;
            new_order.local = local;
            return await this.orderRepository.save(new_order);
        }
        if (local == undefined) throw new NotFoundException("No existe ese local");
        if (client == undefined) throw new NotFoundException("No existe ese cliente");
        return undefined;
    }
    public async findOrdersFromOneLocal(local: LocalEntity) : Promise<OrderEntity[]> {
        let orders : OrderEntity[] = await this.orderRepository.findBy({'local': local});
        for (let order of orders){
            console.log(order.order_products);
        } 
        return orders;
    }

    public async findOrdersFromOneClient(client_id : number) {
        const client = await this.clientService.findClient(client_id);
        return this.orderRepository.findBy({client:client});
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