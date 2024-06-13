import { Role } from 'src/auth/enums/role.enum';
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

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
}
