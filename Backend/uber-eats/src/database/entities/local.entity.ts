import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Local {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

}
