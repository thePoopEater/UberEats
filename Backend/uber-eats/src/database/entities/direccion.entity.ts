import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Direccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

}