import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { AddressEntity } from 'src/database/entities/address.entity';
import { OrderEntity } from './order.entity';

@Entity({ name: 'client' })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  clientId: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @OneToMany(() => AddressEntity, (address) => address.client)
  addresses: AddressEntity[];

  @OneToMany(() => OrderEntity, (order) => order.client)
  @JoinColumn()
  orders: OrderEntity[];
  
  @Column()
  userId: number;

  constructor(data?: Partial<ClientEntity>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
