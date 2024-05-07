import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'user'})
export class UserEntity {

  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
