import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({name:'address'})
export class AddressEntity {
  @PrimaryGeneratedColumn()
  addressId: number;
  
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}