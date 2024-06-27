import { Role } from 'src/auth/enums/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { AddressEntity } from './address.entity';
import { LocalEntity } from './local.entity';
import { OrderEntity } from './order.entity';

@Entity({name: 'user'})
export class UserEntity {

  @PrimaryGeneratedColumn()
  userId: number;

  @Column({type: 'enum', enum: Role})
  role: Role;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity[];

  @OneToMany(() => LocalEntity, (local) => local.user)
  locals: LocalEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];


}
