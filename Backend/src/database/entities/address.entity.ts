import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { ClientEntity } from '../../database/entities/client.entity';

@Entity({name:'address'})
export class AddressEntity {
  @PrimaryGeneratedColumn()
  addressId: number;
  
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => ClientEntity, (client) => client.addresses)
  @JoinColumn({ name: 'clientId' })
  client : ClientEntity; 
}