import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Cliente'})
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  contraseña: string;

}