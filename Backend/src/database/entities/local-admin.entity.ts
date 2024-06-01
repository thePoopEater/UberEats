import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { LocalEntity } from './local.entity';

@Entity({name:'local-admin'})
export class LocalAdminEntity {
  @PrimaryGeneratedColumn()
  localAdminId: number;
  
  @Column()
  name: string;

  @Column()
  userId: number


  @OneToMany(() => LocalEntity, (local) => local.localAdmin)
  locals : LocalEntity[]; 

  constructor(data?: Partial<LocalAdminEntity>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}