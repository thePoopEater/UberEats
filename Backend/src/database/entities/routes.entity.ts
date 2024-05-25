import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name:'routes'})
export class RoutesEntity {
  constructor(private data : Partial<RoutesEntity>){
    Object.assign(this, data);
}
  @PrimaryGeneratedColumn()
  routeId: number;
  
  @Column()
  origen: string;

  @Column()
  destination: string;

  @Column()
  distance: string;

  @Column()
  duration: string;

}