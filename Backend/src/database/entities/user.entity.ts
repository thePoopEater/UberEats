import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'user'})
export class UserEntity {

  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  role: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
