import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import { AddressEntity } from 'src/database/entities/address.entity';
import { OrderEntity } from './order.entity';

@Entity({name: 'client'})
export class ClientEntity {
  @PrimaryGeneratedColumn()
  client_id: number;

  @Column()
  name: string;

  @Column()
  last_name : string;

  @Column()
  password: string;

  @OneToMany(() => AddressEntity, (address) => address.client)
  addresses: AddressEntity[]; 

  @OneToMany(() => OrderEntity, (order) => order.client)
  @JoinColumn()
  orders : OrderEntity[];
}