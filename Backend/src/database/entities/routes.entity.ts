import { Entity, Column, PrimaryGeneratedColumn, IntegerType} from 'typeorm';

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

  @Column({ type: 'decimal'})
  distance: number;

  @Column({ type: 'decimal'})
  duration: number;

}