import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderCreateDTO } from 'src/controllers/order/dto/order-create.dto';
import { LocalEntity } from 'src/database/entities/local.entity';
import { OrderEntity } from 'src/database/entities/order.entity';
import { Repository, UpdateResult } from 'typeorm';
import { LocalService } from '../local/local.service';
import { UserService } from '../user/user.service';
import { Role } from 'src/auth/enums/role.enum';
import { OrderUpdateDTO } from 'src/controllers/order/dto/order-update.dto';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    private localService: LocalService,
    private userService: UserService,
  ) {}

  public findOrder(id: number): Promise<OrderEntity> {
    return this.orderRepository.findOneBy({ orderId: id });
  }
  //VERIFICAR----
  public async createOrder(order: OrderCreateDTO): Promise<OrderEntity> {
    const local = await this.localService.getLocal(order.localId);

    const user = await this.userService.buscarUserRole(
      order.userId,
      Role.CLIENT,
    );

    if (local && user) {
      const newOrder = new OrderEntity(order);
      newOrder.user = user;
      newOrder.local = local;

      return await this.orderRepository.save(newOrder);
    }

    if (!local) {
      throw new NotFoundException('No existe ese local');
    }
    if (!user) {
      throw new NotFoundException('No existe ese cliente');
    }
  }

  public async findOrdersFromOneLocal(
    local: LocalEntity,
  ): Promise<OrderEntity[]> {
    let orders: OrderEntity[] = await this.orderRepository.findBy({
      local: local,
    });
    return orders;
  }

  //VERIFICAR----
  public async findOrdersFromOneClient(userId: number) {
    const user = await this.userService.findClient(userId);
    if (!user) {
      throw new NotFoundException('No existe ese cliente');
    }
    const orders = await this.orderRepository.find({ where: { user } });
    if (orders.length === 0) {
      throw new NotFoundException('Este cliente no registra pedidos');
    }
    return orders;
  }

  public async findProductsFromOrder(id: number) {
    return await this.orderRepository
      .createQueryBuilder('order')
      .innerJoin('order.orderProducts', 'orderProduct')
      .innerJoin('orderProduct.product', 'product')
      .where('order.orderId = :id', { id })
      .select('product')
      .addSelect('orderProduct.quantity')
      .addSelect('orderProduct.orderProductId')
      .addSelect('orderProduct.specification')
      .execute();
  }

  public async getAllOrders(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

  public async updateOrder(
    orderId: number,
    order: OrderUpdateDTO,
  ): Promise<UpdateResult> {
    const result: UpdateResult = await this.orderRepository.update(
      orderId,
      order,
    );
    if (result.affected == 0) {
      return undefined;
    }
    return result;
  }

  public async deleteOrder(orderId: number): Promise<OrderEntity> {
    const result = await this.orderRepository.findOneBy({ orderId: orderId });
    await this.orderRepository.remove(result);
    return result;
  }
  public async updateOrderStateToAccepted(
    orderId: number,
    orderUpdate: OrderUpdateDTO,
  ) {
    const user = await this.userService.findDelivery(orderUpdate.deliverId);
    if (user) {
      const existingOrder = await this.orderRepository.findOneBy({
        orderId: orderId,
      });

      if (existingOrder) {
        existingOrder.state = orderUpdate.state;
        existingOrder.userDelivery = user;
      }
      const result = await this.orderRepository.save(existingOrder);
      return result;
    }
  }
}
