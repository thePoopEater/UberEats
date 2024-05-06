import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { ClientEntity } from 'src/database/entities/client.entity';

@Entity({name:'address'})
export class AddressEntity {
  @PrimaryGeneratedColumn()
  address_id: number;
  
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => ClientEntity, (client) => client.addresses)
  @JoinColumn({ name: 'client_id' })
  client : ClientEntity; 
}