import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import { AddressEntity } from '../../database/entities/address.entity';
import { OrderEntity } from './order.entity';

@Entity({name: 'client'})
export class ClientEntity {
  constructor(private data : Partial<ClientEntity>){
    Object.assign(this, data);
  }
  @PrimaryGeneratedColumn()
  clientId: number;

  @Column()
  name: string;

  @Column()
  lastName : string;

  @Column()
  password: string;

  @OneToMany(() => AddressEntity, (address) => address.client)
  addresses: AddressEntity[]; 

  @OneToMany(() => OrderEntity, (order) => order.client)
  @JoinColumn()
  orders : OrderEntity[];
}