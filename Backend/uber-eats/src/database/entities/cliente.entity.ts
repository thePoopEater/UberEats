import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {IsNotEmpty, isNotEmpty, isNumber, isString} from "class-validator";

@Entity()
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