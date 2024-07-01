import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'delivery' })
export class DeliveryEntity {
  constructor(private data: Partial<DeliveryEntity>) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  deliveryId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  activity: boolean;

  @OneToMany(() => OrderEntity, (order) => order.userDelivery)
  @JoinColumn({ name: 'orderId' })
  orders: OrderEntity[];
}
